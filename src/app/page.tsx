'use client';

import React, { useState } from 'react';
import type { AppDesignSpec } from '@/shared/uiSchema';
import { ScreenPreview } from '@/components/ScreenPreview';

export default function HomePage() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [designSpec, setDesignSpec] = useState<AppDesignSpec | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError(null);
    setDesignSpec(null);

    try {
      const response = await fetch('/api/design', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate design');
      }

      const spec: AppDesignSpec = await response.json();
      setDesignSpec(spec);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">
            Appable
          </h1>
          <p className="text-slate-400 text-lg">
            Generate mobile app UI designs from natural language
          </p>
        </div>

        {/* Input Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
            <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-2">
              Describe your app idea
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., A habit tracker app with a home screen showing today's habits, a screen to add new habits, and a stats screen..."
              className="w-full h-32 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              disabled={loading}
            />

            {error && (
              <div className="mt-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              {loading ? 'Generating...' : 'Generate UI'}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-slate-600 border-t-green-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-400">Generating your app design...</p>
          </div>
        )}

        {/* Results Section */}
        {designSpec && !loading && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                {designSpec.appName}
              </h2>
              <p className="text-slate-400">
                {designSpec.screens.length} screen{designSpec.screens.length !== 1 ? 's' : ''} generated
              </p>
            </div>

            {/* Screen Previews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {designSpec.screens.map((screen) => (
                <ScreenPreview
                  key={screen.id}
                  screen={screen}
                  theme={designSpec.theme}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!designSpec && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📱</div>
            <p className="text-slate-500">
              Enter a prompt above to generate your mobile app UI
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
