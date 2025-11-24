# Appable - Mobile App Design Generator

A tool for generating mobile app UI designs from natural language prompts. Similar in spirit to Lovable, but focused on mobile apps.

## Current Features (v0.1)

- ✅ Natural language prompt input
- ✅ Structured UI specification generation (currently stubbed)
- ✅ Phone-like preview frames rendering in browser
- ✅ Multi-screen app support
- ✅ Clean, extensible architecture

## Tech Stack

- **Frontend:** React 18 + Next.js 14 (App Router)
- **Backend:** Next.js API Routes
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **LLM:** Placeholder for Google Gemini 3.0 (currently using stub)

## Project Structure

```
appable/
├── src/
│   ├── shared/
│   │   └── uiSchema.ts          # Shared type definitions
│   ├── services/
│   │   └── llm/
│   │       └── geminiDesign.ts  # LLM integration point (stub)
│   ├── components/
│   │   ├── UINodeRenderer.tsx   # Renders UI nodes
│   │   └── ScreenPreview.tsx    # Phone frame component
│   └── app/
│       ├── page.tsx             # Main UI
│       ├── layout.tsx           # Root layout
│       └── api/
│           └── design/
│               └── route.ts     # API endpoint
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn

### Installation

```bash
# Install dependencies
npm install
# or
pnpm install
```

### Running Locally

```bash
# Start development server
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Usage

1. Enter a description of your app idea in the textarea
2. Click "Generate UI"
3. View the generated mobile app screens in phone-like frames

## UI Schema

The app uses a structured JSON schema to represent mobile UI:

```typescript
type NodeType = "screen" | "column" | "row" | "card" | "text" | "button";

interface UINode {
  id: string;
  type: NodeType;
  props?: {
    text?: string;
    variant?: "title" | "subtitle" | "body";
    padding?: number;
    spacing?: number;
    align?: "start" | "center" | "end" | "space-between";
    backgroundColor?: string;
  };
  children?: UINode[];
}

interface AppDesignSpec {
  appName: string;
  theme: { primary: string; background: string };
  screens: Screen[];
}
```

## Future Roadmap

- [ ] Integrate Google Gemini 3.0 API for real LLM-based design generation
- [ ] Generate React Native code from design specs
- [ ] Remote Android emulator integration
- [ ] Stream running app into browser
- [ ] Export generated code
- [ ] Design iteration and refinement
- [ ] Component library support

## Integrating Gemini 3.0

To replace the stub with real LLM generation:

1. Get a Gemini API key from Google AI Studio
2. Install the Gemini SDK: `npm install @google/generative-ai`
3. Update `src/services/llm/geminiDesign.ts`:

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateDesignSpec(prompt: string): Promise<AppDesignSpec> {
  const model = genAI.getGenerativeModel({ model: 'gemini-3.0-flash' });

  const systemPrompt = `You are a mobile app design assistant. Generate a JSON design spec following this schema: ${JSON.stringify(/* schema here */)}`;

  const result = await model.generateContent([systemPrompt, prompt]);
  const json = JSON.parse(result.response.text());

  return json as AppDesignSpec;
}
```

4. Add environment variable: `GEMINI_API_KEY=your_key_here` to `.env.local`

## License

MIT