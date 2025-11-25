import { NextRequest, NextResponse } from 'next/server';
import { generateDesignSpec } from '@/services/llm/geminiDesign';
import type { AppDesignSpec } from '@/shared/uiSchema';

/**
 * POST /api/design
 *
 * Accepts a text prompt and returns a mobile app design specification.
 *
 * Request body: { "prompt": string }
 * Response body: AppDesignSpec (JSON)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    console.log(`[API] Generating design for prompt: "${prompt.substring(0, 50)}..."`);

    // Call the LLM service (currently returns hardcoded spec)
    const designSpec: AppDesignSpec = await generateDesignSpec(prompt);

    console.log(`[API] Design generated successfully: ${designSpec.appName}`);

    return NextResponse.json(designSpec);
  } catch (error) {
    console.error('[API] Error generating design:', error);
    return NextResponse.json(
      { error: 'Failed to generate design' },
      { status: 500 }
    );
  }
}
