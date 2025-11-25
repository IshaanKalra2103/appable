import React from 'react';
import type { UINode } from '@/shared/uiSchema';

interface UINodeRendererProps {
  node: UINode;
  theme: {
    primary: string;
    background: string;
  };
}

/**
 * Recursively renders a UINode tree into HTML/React elements.
 *
 * Each node type is rendered according to its semantic meaning:
 * - screen/column: vertical flex container
 * - row: horizontal flex container
 * - card: bordered container with background
 * - text: styled text element
 * - button: interactive button element
 */
export function UINodeRenderer({ node, theme }: UINodeRendererProps): JSX.Element {
  const { type, props = {}, children = [] } = node;

  // Common styles
  const padding = props.padding !== undefined ? `${props.padding}px` : undefined;
  const spacing = props.spacing !== undefined ? `${props.spacing}px` : undefined;

  switch (type) {
    case 'screen':
    case 'column': {
      const alignItems = props.align === 'center' ? 'center' : props.align === 'end' ? 'flex-end' : 'flex-start';

      return (
        <div
          className="flex flex-col"
          style={{
            padding,
            gap: spacing,
            backgroundColor: props.backgroundColor,
            alignItems,
            width: '100%',
          }}
        >
          {children.map((child) => (
            <UINodeRenderer key={child.id} node={child} theme={theme} />
          ))}
        </div>
      );
    }

    case 'row': {
      let justifyContent = 'flex-start';
      if (props.align === 'center') justifyContent = 'center';
      else if (props.align === 'end') justifyContent = 'flex-end';
      else if (props.align === 'space-between') justifyContent = 'space-between';

      return (
        <div
          className="flex flex-row items-center"
          style={{
            padding,
            gap: spacing,
            backgroundColor: props.backgroundColor,
            justifyContent,
            width: '100%',
          }}
        >
          {children.map((child) => (
            <UINodeRenderer key={child.id} node={child} theme={theme} />
          ))}
        </div>
      );
    }

    case 'card': {
      return (
        <div
          className="rounded-lg border border-slate-700"
          style={{
            padding: padding || '12px',
            backgroundColor: props.backgroundColor || '#1e293b',
          }}
        >
          {children.map((child) => (
            <UINodeRenderer key={child.id} node={child} theme={theme} />
          ))}
        </div>
      );
    }

    case 'text': {
      let fontSize = '14px';
      let fontWeight = '400';
      let color = '#e2e8f0';

      if (props.variant === 'title') {
        fontSize = '24px';
        fontWeight = '700';
        color = '#f1f5f9';
      } else if (props.variant === 'subtitle') {
        fontSize = '16px';
        fontWeight = '600';
        color = '#cbd5e1';
      }

      return (
        <div
          style={{
            fontSize,
            fontWeight,
            color,
          }}
        >
          {props.text || ''}
        </div>
      );
    }

    case 'button': {
      return (
        <button
          className="px-4 py-2 rounded-md font-medium transition-colors hover:opacity-80"
          style={{
            backgroundColor: theme.primary,
            color: '#ffffff',
          }}
        >
          {props.text || 'Button'}
        </button>
      );
    }

    default:
      return <div>Unknown node type: {type}</div>;
  }
}
