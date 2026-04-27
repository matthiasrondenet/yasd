import React, { useState, useEffect, useRef, Fragment } from 'react';
import { PALETTE, MONO } from '../../theme';
import type { InteractiveTerminalProps } from './types';
import { lineColor, COMMANDS, runCommand, HISTORY_LIMIT, QUICK_COMMANDS } from './commands';
import type { HistoryLine } from './types';

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  accent = PALETTE.accent,
  warn = PALETTE.warn,
  isMobile,
}) => {
  const [history, setHistory] = useState<HistoryLine[]>([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const focus = () => inputRef.current?.focus();

  const runAndAppend = (cmd: string) => {
    const result = runCommand(cmd);
    if (result === 'CLEAR') {
      setHistory([]);
      return;
    }
    setHistory(prev => {
      const next = [...prev, { kind: 'prompt' as const, text: cmd }, ...result];
      return next.length > HISTORY_LIMIT ? next.slice(-HISTORY_LIMIT) : next;
    });
  };

  const submit = () => {
    const trimmed = input.trim();
    runAndAppend(input);
    if (trimmed) setCommandHistory(prev => [trimmed, ...prev].slice(0, 50));
    setHistoryIndex(-1);
    setInput('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(nextIndex);
      setInput(nextIndex === -1 ? '' : commandHistory[nextIndex]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const trimmed = input.trim().toLowerCase();
      if (!trimmed) return;
      const matches = Object.keys(COMMANDS).filter(cmd => cmd.startsWith(trimmed));
      if (matches.length === 1) setInput(matches[0]);
    } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setHistory([]);
    }
  };

  return (
    <div
      onClick={focus}
      style={{
        border: `1px solid ${PALETTE.ruleStrong}`,
        background: 'rgba(0,0,0,.35)',
        cursor: 'text',
        fontFamily: MONO,
        fontSize: isMobile ? 12 : 14,
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '8px 14px',
        borderBottom: `1px solid ${PALETTE.rule}`,
        background: 'rgba(255,255,255,.02)',
      }}>
        <span style={{ display: 'flex', gap: 6 }}>
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
        </span>
        <span style={{ flex: 1, textAlign: 'center', color: PALETTE.mute, fontSize: 11 }}>matthias@yasd ~ — zsh</span>
        <span style={{ color: PALETTE.dim, fontSize: 11 }}>80×24</span>
      </div>

      <div
        ref={scrollRef}
        style={{
          padding: isMobile ? '14px 14px 10px' : '18px 22px 14px',
          maxHeight: isMobile ? 360 : 460,
          overflowY: 'auto',
          lineHeight: 1.2,
          color: PALETTE.ink,
        }}
      >
        {history.map((line, i) => {
          if (line.kind === 'prompt') {
            return (
              <div key={i} style={{ display: 'flex', gap: 10 }}>
                <span style={{ color: accent }}>matthias@yasd</span>
                <span style={{ color: PALETTE.mute }}>~$</span>
                <span>{line.text}</span>
              </div>
            );
          }
          if (line.kind === 'cmd-list') {
            return (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '110px 1fr' : '140px 1fr',
                gap: isMobile ? 8 : 10,
                padding: '2px 0',
              }}>
                {line.text.map(([command, description], j) => (
                  <Fragment key={j}>
                    <span style={{ color: command.endsWith('/') ? accent : warn }}>{command}</span>
                    <span style={{ color: PALETTE.mute }}>{description}</span>
                  </Fragment>
                ))}
              </div>
            );
          }
          if (line.kind === 'link') {
            return (
              <div key={i}>
                <a href={line.href} target="_blank" rel="noreferrer"
                  style={{ color: accent, textDecoration: 'underline' }}>
                  {line.text}
                </a>
              </div>
            );
          }
          return (
            <div key={i} style={{ color: lineColor(line.kind, accent), whiteSpace: 'pre-wrap' }}>
              {line.text}
            </div>
          );
        })}

        <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', marginTop: 4 }}>
          <span style={{ color: accent, flexShrink: 0 }}>matthias@yasd</span>
          <span style={{ color: PALETTE.mute, flexShrink: 0 }}>~$</span>
          <input
            id="terminal-input"
            title='type a command and press enter to run · up/down to navigate history · tab to autocomplete'
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoCapitalize="none"
            autoCorrect="off"
            style={{
              flex: 1,
              background: 'transparent', border: 'none', outline: 'none',
              color: PALETTE.ink, fontFamily: 'inherit', fontSize: 'inherit',
              padding: 0, caretColor: accent,
            }}
          />
        </div>
      </div>

      <div style={{
        borderTop: `1px solid ${PALETTE.rule}`,
        padding: '8px 14px',
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8,
        fontSize: isMobile ? 10 : 11, color: PALETTE.dim,
        background: 'rgba(255,255,255,.015)',
      }}>
        <span>
          type <span style={{ color: accent }}>help</span> to begin ·{' '}
          <span style={{ color: accent }}>↑</span> recall ·{' '}
          <span style={{ color: accent }}>tab</span> complete
        </span>
        <span style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {QUICK_COMMANDS.map(cmd => (
            <button key={cmd}
              onClick={e => { e.stopPropagation(); setInput(''); runAndAppend(cmd); focus(); }}
              style={{
                background: 'transparent', border: `1px solid ${PALETTE.rule}`,
                color: PALETTE.mute, padding: '2px 8px',
                fontFamily: 'inherit', fontSize: 'inherit', cursor: 'pointer',
              }}
            >
              {cmd}
            </button>
          ))}
        </span>
      </div>
    </div>
  );
};
