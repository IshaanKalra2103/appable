import React from 'react';
import type { Screen } from '@/shared/uiSchema';
import { UINodeRenderer } from './UINodeRenderer';

interface ScreenPreviewProps {
  screen: Screen;
  theme: {
    primary: string;
    background: string;
  };
}

/**
 * Renders a single screen inside a phone-like frame.
 *
 * Displays the screen name at the top and renders the screen's
 * UI tree inside a bordered container that resembles a mobile device.
 */
export function ScreenPreview({ screen, theme }: ScreenPreviewProps): JSX.Element {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* Screen name label */}
      <div className="text-slate-300 font-medium text-sm">
        {screen.name}
      </div>

      {/* Phone frame */}
      <div
        className="relative border-4 border-slate-700 rounded-3xl overflow-hidden shadow-2xl"
        style={{
          width: '320px',
          height: '600px',
          backgroundColor: theme.background,
        }}
      >
        {/* Status bar (decorative) */}
        <div
          className="absolute top-0 left-0 right-0 h-8 flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        >
          <div className="w-24 h-1 bg-slate-600 rounded-full" />
        </div>

        {/* Scrollable content area */}
        <div className="h-full pt-8 overflow-y-auto">
          <UINodeRenderer node={screen.root} theme={theme} />
        </div>
      </div>
    </div>
  );
}
