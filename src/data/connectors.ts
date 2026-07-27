export interface Connector {
  name: string;
  slug: string;
  /** The export key in simple-icons (e.g. 'siGithub'). null = custom SVG path provided. */
  simpleIconKey: string | null;
  /** Custom SVG path data for connectors not in simple-icons */
  customSvgPath?: string;
  status: 'live' | 'coming-soon';
}

/**
 * Slack, Microsoft Outlook, and Microsoft Teams were removed from simple-icons
 * in recent versions due to trademark restrictions.
 * We provide accurate SVG paths for these three icons directly.
 */

// Slack hash mark
const SLACK_PATH =
  'M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.124 2.521a2.528 2.528 0 0 1 2.52-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.52V8.834zm-1.271 0a2.528 2.528 0 0 1-2.521 2.521 2.528 2.528 0 0 1-2.521-2.521V2.522A2.528 2.528 0 0 1 15.166 0a2.528 2.528 0 0 1 2.521 2.522v6.312zm-2.521 10.124a2.528 2.528 0 0 1 2.521 2.52A2.528 2.528 0 0 1 15.166 24a2.528 2.528 0 0 1-2.521-2.522v-2.52h2.521zm0-1.271a2.528 2.528 0 0 1-2.521-2.521 2.528 2.528 0 0 1 2.521-2.521h6.312A2.528 2.528 0 0 1 24 15.166a2.528 2.528 0 0 1-2.522 2.521h-6.312z';

// Microsoft Outlook envelope
const OUTLOOK_PATH =
  'M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.59-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.33.75.1.43.1.9zm-3.15.02q0 .37.08.68.08.31.24.53.16.21.39.32.24.12.57.12.33 0 .56-.12.24-.13.39-.34.16-.22.24-.53.08-.31.08-.67 0-.36-.09-.67-.08-.3-.25-.52-.16-.21-.4-.32-.22-.12-.55-.12-.34 0-.57.13-.24.13-.39.35-.16.22-.24.52-.08.31-.08.67zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.6V14.1l-2.53 1.73-5.07-3.27V21.6q0 .17.12.3.11.13.3.13H24V12zm0-2.32V7.25L7.6 7.26v5.56l2.43-1.67 2.64 1.7L24 9.68zM7.6 6.26h15.27q.47 0 .8.33.33.34.33.8v.6L12.98 11.4 7.6 7.8V6.26zm-3.2-.6v1.38l-2.53 1.82-1.87-1.2v-2q0-.35.25-.6.24-.24.6-.24h3.55z';

// Microsoft Teams
const TEAMS_PATH =
  'M20.625 8.5h-6.25a.625.625 0 0 0-.625.625v6.25c0 .345.28.625.625.625h6.25c.345 0 .625-.28.625-.625v-6.25a.625.625 0 0 0-.625-.625zm-2.5 5.938a.312.312 0 0 1-.313.312h-2.5a.312.312 0 0 1-.312-.313V13.5h1.25v-.625H15v-1.25h1.25v-.625H15V10h2.813c.172 0 .312.14.312.313v4.125zm1.563-.313a.312.312 0 0 1-.313.313h-.625v-3.75h.625c.173 0 .313.14.313.312v3.125zM17.5 7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 1a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zm1.25 1.25h-2.117c.24.357.367.78.367 1.25v5c0 .397-.098.77-.27 1.1.056.003.112.004.17.004a2.65 2.65 0 0 0 2.65-2.654V10.5a.75.75 0 0 0-.75-.75h-.05zM14.5 7.5A2 2 0 1 0 14.5 3.5a2 2 0 0 0 0 4zm1.75 1.75h-3.79a1.21 1.21 0 0 0-1.21 1.21V16a3.145 3.145 0 0 0 6.25-.5v-5a1.5 1.5 0 0 0-1.25-1.25z';

export const connectors: Connector[] = [
  {
    name: 'Slack',
    slug: 'slack',
    simpleIconKey: null,
    customSvgPath: SLACK_PATH,
    status: 'live',
  },
  {
    name: 'Notion',
    slug: 'notion',
    simpleIconKey: 'siNotion',
    status: 'live',
  },
  {
    name: 'Google Docs',
    slug: 'google-docs',
    simpleIconKey: 'siGoogledocs',
    status: 'live',
  },
  {
    name: 'Dropbox',
    slug: 'dropbox',
    simpleIconKey: 'siDropbox',
    status: 'live',
  },
  {
    name: 'GitHub',
    slug: 'github',
    simpleIconKey: 'siGithub',
    status: 'live',
  },
  {
    name: 'Google Drive',
    slug: 'google-drive',
    simpleIconKey: 'siGoogledrive',
    status: 'live',
  },
  {
    name: 'Google Sheets',
    slug: 'google-sheets',
    simpleIconKey: 'siGooglesheets',
    status: 'live',
  },
  {
    name: 'Discord',
    slug: 'discord',
    simpleIconKey: 'siDiscord',
    status: 'live',
  },
  {
    name: 'Linear',
    slug: 'linear',
    simpleIconKey: 'siLinear',
    status: 'live',
  },
  {
    name: 'Microsoft Outlook',
    slug: 'microsoft-outlook',
    simpleIconKey: null,
    customSvgPath: OUTLOOK_PATH,
    status: 'live',
  },
  {
    name: 'Microsoft Teams',
    slug: 'microsoft-teams',
    simpleIconKey: null,
    customSvgPath: TEAMS_PATH,
    status: 'live',
  },
];
