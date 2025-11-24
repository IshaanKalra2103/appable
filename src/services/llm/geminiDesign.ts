import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AppDesignSpec } from '@/shared/uiSchema';

/**
 * Gemini Design Service
 *
 * Uses Google Gemini API to generate mobile app design specifications
 * from natural language prompts.
 */

// Initialize Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// System prompt that teaches the LLM about our UI schema
const SYSTEM_PROMPT = `You are a mobile app UI/UX designer. Your task is to generate mobile app design specifications in JSON format based on user prompts.

**UI Schema:**

You must generate a JSON object that follows this exact TypeScript schema:

\`\`\`typescript
type NodeType = "screen" | "column" | "row" | "card" | "text" | "button";

interface UINode {
  id: string;              // Unique identifier (e.g., "home_title", "btn_submit")
  type: NodeType;
  props?: {
    text?: string;         // For text and button nodes
    variant?: "title" | "subtitle" | "body";  // For text nodes
    padding?: number;      // Padding in pixels
    spacing?: number;      // Gap between children in pixels
    align?: "start" | "center" | "end" | "space-between";
    backgroundColor?: string;  // Hex color (e.g., "#1e293b")
  };
  children?: UINode[];     // Nested nodes
}

interface Screen {
  id: string;              // Unique screen ID (e.g., "screen_home")
  name: string;            // Display name (e.g., "Home")
  route: string;           // Route path (e.g., "home")
  root: UINode;            // Root node with type "screen"
}

interface AppDesignSpec {
  appName: string;         // Name of the app
  theme: {
    primary: string;       // Primary color in hex (e.g., "#22c55e")
    background: string;    // Background color in hex (e.g., "#020617")
  };
  screens: Screen[];       // Array of screens
}
\`\`\`

**Node Types:**
- **screen**: Root container for a screen (use as root.type for each Screen)
- **column**: Vertical layout (flex-direction: column)
- **row**: Horizontal layout (flex-direction: row)
- **card**: Bordered container with background
- **text**: Text element (use variant prop for styling)
- **button**: Interactive button element

**Design Guidelines:**
1. Create 2-4 screens that make sense for the app concept
2. Use dark theme by default (background: "#020617", cards: "#1e293b")
3. Use green as primary color unless the prompt specifies otherwise
4. Keep layouts simple and mobile-friendly
5. Use descriptive, unique IDs for all nodes
6. Every screen's root node must have type "screen"
7. Use proper spacing and padding (typically 12-20px)
8. Use align="space-between" for rows with items on opposite ends

**IMPORTANT:**
- Return ONLY valid JSON, no markdown, no explanation
- Ensure all IDs are unique across the entire design
- Make the design specific to the user's prompt, not generic

**Example Output:**
\`\`\`json
{
  "appName": "Task Manager",
  "theme": {
    "primary": "#3b82f6",
    "background": "#020617"
  },
  "screens": [
    {
      "id": "screen_tasks",
      "name": "Tasks",
      "route": "tasks",
      "root": {
        "id": "root_tasks",
        "type": "screen",
        "props": {
          "backgroundColor": "#020617",
          "padding": 20
        },
        "children": [
          {
            "id": "title_tasks",
            "type": "text",
            "props": {
              "text": "My Tasks",
              "variant": "title"
            }
          },
          {
            "id": "task_list",
            "type": "column",
            "props": {
              "spacing": 12
            },
            "children": [
              {
                "id": "task_card_1",
                "type": "card",
                "props": {
                  "padding": 16,
                  "backgroundColor": "#1e293b"
                },
                "children": [
                  {
                    "id": "task_1_content",
                    "type": "row",
                    "props": {
                      "align": "space-between"
                    },
                    "children": [
                      {
                        "id": "task_1_text",
                        "type": "text",
                        "props": {
                          "text": "Complete project proposal",
                          "variant": "body"
                        }
                      },
                      {
                        "id": "task_1_btn",
                        "type": "button",
                        "props": {
                          "text": "Done"
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  ]
}
\`\`\`

Now, generate a mobile app design based on the user's prompt.`;

/**
 * Generate a mobile app design specification from a text prompt using Gemini API.
 *
 * @param prompt - Natural language description of the app to build
 * @returns Promise resolving to an AppDesignSpec
 * @throws Error if API key is missing or generation fails
 */
export async function generateDesignSpec(prompt: string): Promise<AppDesignSpec> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error(
      'GEMINI_API_KEY is not set. Please add it to your .env.local file. ' +
      'Get your API key from: https://aistudio.google.com/app/apikey'
    );
  }

  console.log(`[LLM] Generating design for prompt: "${prompt.substring(0, 100)}..."`);

  try {
    // Use Gemini 1.5 Flash for fast, cost-effective generation
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
      },
    });

    // Combine system prompt with user prompt
    const fullPrompt = `${SYSTEM_PROMPT}\n\n**User Prompt:**\n${prompt}\n\n**Generate the JSON design spec now:**`;

    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const text = response.text();

    console.log('[LLM] Received response from Gemini');

    // Extract JSON from response (handle markdown code blocks if present)
    let jsonText = text.trim();

    // Remove markdown code blocks if present
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.substring(7);
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.substring(3);
    }

    if (jsonText.endsWith('```')) {
      jsonText = jsonText.substring(0, jsonText.length - 3);
    }

    jsonText = jsonText.trim();

    // Parse and validate JSON
    const designSpec = JSON.parse(jsonText) as AppDesignSpec;

    // Basic validation
    if (!designSpec.appName || !designSpec.theme || !designSpec.screens) {
      throw new Error('Invalid design spec structure');
    }

    if (designSpec.screens.length === 0) {
      throw new Error('Design spec must have at least one screen');
    }

    console.log(`[LLM] Successfully generated design: "${designSpec.appName}" with ${designSpec.screens.length} screens`);

    return designSpec;
  } catch (error) {
    console.error('[LLM] Error generating design:', error);

    if (error instanceof Error) {
      // Provide helpful error messages
      if (error.message.includes('API key')) {
        throw error; // Re-throw API key errors as-is
      } else if (error.message.includes('JSON')) {
        throw new Error('Failed to parse LLM response as valid JSON. The model may have returned invalid format.');
      } else {
        throw new Error(`Design generation failed: ${error.message}`);
      }
    }

    throw new Error('Unknown error occurred during design generation');
  }
}
