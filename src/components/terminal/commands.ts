import { PALETTE } from '../../theme';
import { LINKEDIN, MALT, GITHUB, EMAIL } from '../../constants';
import type { LineKind, CommandResult } from './types';

export const lineColor = (kind: LineKind, accent: string): string => {
  const map: Record<LineKind, string> = {
    cmd: PALETTE.ink,
    out: PALETTE.mute,
    ok: accent,
    err: PALETTE.red,
    link: accent,
    prompt: PALETTE.ink,
    'cmd-list': PALETTE.ink,
  };
  return map[kind];
};

export const COMMANDS: Record<string, () => CommandResult> = {
  help: () => [
    { kind: 'out', text: 'available commands:' },
    {
      kind: 'cmd-list',
      text: [
        ['help', 'show this list'],
        ['whois', 'who is behind YASD'],
        ['hire', 'start a project — opens email'],
        ['linkedin', "open Matthias' linkedin"],
        ['malt', "open Matthias' malt profile"],
        ['github', "open Matthias' github"],
        ['services', 'what is on offer'],
        ['stack', 'tools of the trade'],
        ['work', 'selected git log'],
        ['rates', 'engagement & rates'],
        ['ethos', 'principles, briefly'],
        ['coffee', 'brew a beverage'],
        ['sudo', 'try it'],
        ['clear', 'clear the terminal'],
        ['exit', 'good luck'],
      ],
    },
    { kind: 'out', text: 'tip: ↑ / ↓ to recall history · tab to autocomplete' },
  ],
  whois: () => [
    { kind: 'out', text: 'name      Matthias Rondenet' },
    { kind: 'out', text: 'role      freelance full-stack developer' },
    { kind: 'out', text: 'practice  YASD — Yet Another Software Developer' },
    { kind: 'out', text: 'stack     .NET · C# · React · TypeScript' },
    { kind: 'out', text: 'exp       12+ years · fintech, banking, enterprise' },
    { kind: 'out', text: 'tz        GMT+1 (Europe)' },
    { kind: 'out', text: 'status    accepting projects · Q2 / Q3 2026' },
    { kind: 'link', text: 'linkedin  → ' + LINKEDIN, href: LINKEDIN },
  ],
  hire: () => [
    { kind: 'ok', text: 'opening mail client…' },
    {
      kind: 'link',
      text: '→ ' + EMAIL + ' (subject: project brief)',
      href: 'mailto:' + EMAIL + '?subject=YASD%20%E2%80%94%20project%20brief',
    },
    { kind: 'out', text: 'send one paragraph: the problem, the stack, the timeline.' },
  ],
  linkedin: () => [
    { kind: 'ok', text: 'opening linkedin…' },
    { kind: 'link', text: '→ ' + LINKEDIN, href: LINKEDIN },
  ],
  malt: () => [
    { kind: 'ok', text: 'opening malt…' },
    { kind: 'link', text: '→ ' + MALT, href: MALT },
  ],
  github: () => [
    { kind: 'ok', text: 'opening github…' },
    { kind: 'link', text: '→ ' + GITHUB, href: GITHUB },
  ],
  services: () => [
    {
      kind: 'cmd-list',
      text: [
        ['fullstack/', 'ASP.NET Core + React — soup to nuts'],
        ['backend/', 'C#, EF Core, SQL, queues'],
        ['frontend/', 'React, TypeScript, design systems'],
        ['rescue/', 'legacy codebases, rehabilitated'],
        ['advisory.sh', 'architecture & hiring · second opinions'],
      ],
    },
  ],
  stack: () => [
    { kind: 'out', text: 'backend   .NET · ASP.NET Core · C# · EF Core · Dapper · SignalR' },
    { kind: 'out', text: 'frontend  React · TypeScript · Redux · RxJS · Vite' },
    { kind: 'out', text: 'data      PostgreSQL · SQL Server' },
    { kind: 'out', text: 'cloud     Azure (AKS) · Azure DevOps · Terraform' },
    { kind: 'out', text: 'practice  TDD · BDD · Clean Architecture · DDD · code review' },
    { kind: 'out', text: 'editor    JetBrains Rider · VS Code' },
  ],
  work: () => [
    {
      kind: 'out',
      text: 'a4f9c2d  2022  feat: investment banking platform — trading blotter & research, .NET 8, React, Azure AKS',
    },
    {
      kind: 'out',
      text: 'b7e3a11  2021  feat: ESG investment tools — Clean Architecture + DDD rewrite, React',
    },
    {
      kind: 'out',
      text: 'c9d2f87  2018  build: regulatory risk indicators (PRIIPs/SRI/ESG) — .NET Core, React, PostgreSQL',
    },
    {
      kind: 'out',
      text: '3a1e054  2017  feat: construction management — Xamarin iOS/Android, .NET Core, Azure',
    },
    { kind: 'out', text: '8c2b731  2015  feat: retail ERP — ASP.NET, WCF, WPF, SQL Server' },
  ],
  rates: () => [
    { kind: 'out', text: 'project    fixed-scope, fixed-price after a 30-min scoping call' },
    { kind: 'out', text: 'retainer   monthly, X days/wk, ongoing' },
    { kind: 'out', text: 'advisory   hourly — architecture, hiring, code review' },
    { kind: 'out', text: 'figures    on request' },
  ],
  ethos: () => [
    { kind: 'cmd', text: '# small diffs · boring infra · written trails' },
    { kind: 'cmd', text: '# ship it. explain it. maintain it.' },
    { kind: 'cmd', text: '# everything else is posture.' },
  ],
  coffee: () => [
    { kind: 'out', text: '   ( (' },
    { kind: 'out', text: '    ) )' },
    { kind: 'out', text: '  ........' },
    { kind: 'out', text: '  |      |]' },
    { kind: 'out', text: '  \\      /' },
    { kind: 'out', text: "   `----'" },
    { kind: 'ok', text: '☕ ready. now go ship something.' },
  ],
  sudo: () => [
    { kind: 'err', text: 'matthias is not in the sudoers file. this incident will be reported.' },
  ],
  clear: () => 'CLEAR',
  exit: () => [
    { kind: 'ok', text: 'logout' },
    { kind: 'out', text: 'connection to yasd@home closed.' },
    { kind: 'out', text: '(reload the page to come back)' },
  ],
  ls: () => COMMANDS.services(),
  contact: () => COMMANDS.hire(),
  about: () => COMMANDS.whois(),
  '--help': () => COMMANDS.help(),
};

const ALIASES: Record<string, string> = {
  man: 'help',
  '?': 'help',
  h: 'help',
  who: 'whois',
  whoami: 'whois',
  cv: 'linkedin',
  resume: 'linkedin',
};

export const runCommand = (raw: string): CommandResult => {
  const input = raw.trim().toLowerCase();
  if (!input) return [];
  const head = input.split(/\s+/)[0];
  const resolved = ALIASES[head] ?? head;
  const handler = (COMMANDS as Partial<typeof COMMANDS>)[resolved];
  if (handler) return handler();
  return [
    { kind: 'err', text: `yasd: command not found: ${head}` },
    { kind: 'out', text: 'try `help`.' },
  ];
};

export const HISTORY_LIMIT = 500;

export const QUICK_COMMANDS = ['help', 'whois', 'hire'] as const;
