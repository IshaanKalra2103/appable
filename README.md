# Appable - Mobile App Design Generator

A tool for generating mobile app UI designs from natural language prompts. Similar in spirit to Lovable, but focused on mobile apps.

## Current Features (v0.1)

- ✅ Natural language prompt input
- ✅ **AI-powered design generation using Google Gemini 1.5 Flash**
- ✅ Phone-like preview frames rendering in browser
- ✅ Multi-screen app support
- ✅ Clean, extensible architecture
- ✅ Real-time design generation based on user prompts

## Tech Stack

- **Frontend:** React 18 + Next.js 14 (App Router)
- **Backend:** Next.js API Routes
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **LLM:** Google Gemini 1.5 Flash API

## Project Structure

```
appable/
├── src/
│   ├── shared/
│   │   └── uiSchema.ts          # Shared type definitions
│   ├── services/
│   │   └── llm/
│   │       └── geminiDesign.ts  # Gemini API integration
│   ├── components/
│   │   ├── UINodeRenderer.tsx   # Renders UI nodes
│   │   └── ScreenPreview.tsx    # Phone frame component
│   └── app/
│       ├── page.tsx             # Main UI
│       ├── layout.tsx           # Root layout
│       └── api/
│           └── design/
│               └── route.ts     # API endpoint
├── .env.local                   # Environment variables (API key)
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn
- **Google Gemini API key** (get one free at [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey))

### Installation

1. **Install dependencies:**

```bash
npm install
# or
pnpm install
```

2. **Set up your Gemini API key:**

Create a `.env.local` file in the root directory and add your API key:

```env
GEMINI_API_KEY=your_api_key_here
```

**Important:** Never commit your `.env.local` file to version control. It's already in `.gitignore`.

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

- [x] ~~Integrate Google Gemini API for real LLM-based design generation~~ ✅ **Done!**
- [ ] Generate React Native code from design specs
- [ ] Remote Android emulator integration
- [ ] Stream running app into browser
- [ ] Export generated code
- [ ] Design iteration and refinement
- [ ] Component library support
- [ ] Support for more UI components (images, inputs, lists, etc.)
- [ ] Custom theming and color schemes
- [ ] Multi-step design refinement conversations

## How It Works

1. **User Input:** You describe your app idea in natural language
2. **AI Processing:** Gemini 1.5 Flash analyzes your prompt and generates a structured JSON design specification
3. **Rendering:** The UI renderer walks the design tree and creates visual phone frames
4. **Preview:** See your app's screens rendered in mobile-like containers

The system prompt teaches Gemini about the UI schema, design principles, and output format, ensuring consistent, valid designs every time.

## License

MIT