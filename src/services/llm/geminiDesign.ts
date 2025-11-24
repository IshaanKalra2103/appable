import type { AppDesignSpec } from '@/shared/uiSchema';

/**
 * Gemini Design Service
 *
 * This service will eventually call Google Gemini 3.0 API to generate
 * mobile app design specifications from natural language prompts.
 *
 * Current implementation: Returns hardcoded design spec for testing.
 * TODO: Replace with actual Gemini 3.0 API integration.
 */

/**
 * Generate a mobile app design specification from a text prompt.
 *
 * @param prompt - Natural language description of the app to build
 * @returns Promise resolving to an AppDesignSpec
 *
 * TODO: Implement actual Gemini 3.0 API call here:
 * 1. Set up Gemini API client with API key
 * 2. Construct system prompt that explains the UI schema
 * 3. Send user prompt + schema instructions to Gemini
 * 4. Parse and validate the returned JSON
 * 5. Return typed AppDesignSpec
 */
export async function generateDesignSpec(prompt: string): Promise<AppDesignSpec> {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log(`[LLM] Received prompt: "${prompt}"`);
  console.log('[LLM] Returning hardcoded design spec (stub implementation)');

  // STUB: Hardcoded habit tracker app design
  // This will be replaced with actual LLM-generated designs
  const hardcodedSpec: AppDesignSpec = {
    appName: "Habit Tracker",
    theme: {
      primary: "#22c55e",
      background: "#020617",
    },
    screens: [
      {
        id: "screen_home",
        name: "Home",
        route: "home",
        root: {
          id: "root_home",
          type: "screen",
          props: {
            backgroundColor: "#020617",
            padding: 20,
          },
          children: [
            {
              id: "header_col",
              type: "column",
              props: {
                spacing: 12,
                padding: 0,
              },
              children: [
                {
                  id: "title",
                  type: "text",
                  props: {
                    text: "Today's Habits",
                    variant: "title",
                  },
                },
                {
                  id: "subtitle",
                  type: "text",
                  props: {
                    text: "Keep up the momentum!",
                    variant: "subtitle",
                  },
                },
              ],
            },
            {
              id: "habits_col",
              type: "column",
              props: {
                spacing: 12,
                padding: 0,
              },
              children: [
                {
                  id: "habit_card_1",
                  type: "card",
                  props: {
                    padding: 16,
                    backgroundColor: "#1e293b",
                  },
                  children: [
                    {
                      id: "habit_1_row",
                      type: "row",
                      props: {
                        align: "space-between",
                      },
                      children: [
                        {
                          id: "habit_1_text",
                          type: "text",
                          props: {
                            text: "Morning Meditation",
                            variant: "body",
                          },
                        },
                        {
                          id: "habit_1_btn",
                          type: "button",
                          props: {
                            text: "✓",
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "habit_card_2",
                  type: "card",
                  props: {
                    padding: 16,
                    backgroundColor: "#1e293b",
                  },
                  children: [
                    {
                      id: "habit_2_row",
                      type: "row",
                      props: {
                        align: "space-between",
                      },
                      children: [
                        {
                          id: "habit_2_text",
                          type: "text",
                          props: {
                            text: "Drink Water (8 glasses)",
                            variant: "body",
                          },
                        },
                        {
                          id: "habit_2_btn",
                          type: "button",
                          props: {
                            text: "✓",
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "habit_card_3",
                  type: "card",
                  props: {
                    padding: 16,
                    backgroundColor: "#1e293b",
                  },
                  children: [
                    {
                      id: "habit_3_row",
                      type: "row",
                      props: {
                        align: "space-between",
                      },
                      children: [
                        {
                          id: "habit_3_text",
                          type: "text",
                          props: {
                            text: "Evening Reading",
                            variant: "body",
                          },
                        },
                        {
                          id: "habit_3_btn",
                          type: "button",
                          props: {
                            text: "✓",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        id: "screen_add",
        name: "Add Habit",
        route: "add_habit",
        root: {
          id: "root_add",
          type: "screen",
          props: {
            backgroundColor: "#020617",
            padding: 20,
          },
          children: [
            {
              id: "add_title",
              type: "text",
              props: {
                text: "Create New Habit",
                variant: "title",
              },
            },
            {
              id: "form_card",
              type: "card",
              props: {
                padding: 20,
                backgroundColor: "#1e293b",
              },
              children: [
                {
                  id: "form_col",
                  type: "column",
                  props: {
                    spacing: 16,
                  },
                  children: [
                    {
                      id: "label_name",
                      type: "text",
                      props: {
                        text: "Habit Name",
                        variant: "subtitle",
                      },
                    },
                    {
                      id: "label_frequency",
                      type: "text",
                      props: {
                        text: "Frequency",
                        variant: "subtitle",
                      },
                    },
                    {
                      id: "btn_save",
                      type: "button",
                      props: {
                        text: "Save Habit",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        id: "screen_stats",
        name: "Stats",
        route: "stats",
        root: {
          id: "root_stats",
          type: "screen",
          props: {
            backgroundColor: "#020617",
            padding: 20,
          },
          children: [
            {
              id: "stats_title",
              type: "text",
              props: {
                text: "Your Progress",
                variant: "title",
              },
            },
            {
              id: "stats_col",
              type: "column",
              props: {
                spacing: 16,
              },
              children: [
                {
                  id: "stat_card_1",
                  type: "card",
                  props: {
                    padding: 20,
                    backgroundColor: "#1e293b",
                  },
                  children: [
                    {
                      id: "stat_1_col",
                      type: "column",
                      props: {
                        spacing: 8,
                        align: "center",
                      },
                      children: [
                        {
                          id: "stat_1_value",
                          type: "text",
                          props: {
                            text: "7",
                            variant: "title",
                          },
                        },
                        {
                          id: "stat_1_label",
                          type: "text",
                          props: {
                            text: "Day Streak",
                            variant: "body",
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "stat_card_2",
                  type: "card",
                  props: {
                    padding: 20,
                    backgroundColor: "#1e293b",
                  },
                  children: [
                    {
                      id: "stat_2_col",
                      type: "column",
                      props: {
                        spacing: 8,
                        align: "center",
                      },
                      children: [
                        {
                          id: "stat_2_value",
                          type: "text",
                          props: {
                            text: "85%",
                            variant: "title",
                          },
                        },
                        {
                          id: "stat_2_label",
                          type: "text",
                          props: {
                            text: "Completion Rate",
                            variant: "body",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    ],
  };

  return hardcodedSpec;
}
