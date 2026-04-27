export type LineKind = 'out' | 'cmd' | 'ok' | 'err' | 'link' | 'prompt' | 'cmd-list';

export type HistoryLine =
  | { kind: 'prompt'; text: string }
  | { kind: 'cmd-list'; text: [string, string][] }
  | { kind: 'link'; text: string; href: string }
  | { kind: Exclude<LineKind, 'prompt' | 'cmd-list' | 'link'>; text: string };

export type CommandResult = HistoryLine[] | 'CLEAR';

export interface InteractiveTerminalProps {
  accent?: string;
  warn?: string;
  isMobile: boolean;
}
