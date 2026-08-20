import { useEffect, useRef, useState } from 'react';
import { useStore } from '../state/store';
import { councilReplies, _fallbackReply } from '../data/content';

/*
  Keyword routing table, ported from the prototype's askFree(). Order matters:
  the first substring hit wins, so "sleep" resolves to the tea/brew surface
  rather than falling through to the generic reply.
*/
const KEYWORDS: [string, string][] = [
  ['iron', 'iron'], ['ferritin', 'iron'], ['anemi', 'iron'], ['b12', 'iron'],
  ['tired', 'energy'], ['energy', 'energy'], ['fatigue', 'energy'], ['exhaust', 'energy'], ['sluggish', 'energy'],
  ['farm', 'farm'], ['carry', 'farm'], ['lift', 'farm'], ['train', 'farm'], ['workout', 'farm'], ['session', 'farm'],
  ['tea', 'tea'], ['brew', 'tea'], ['herb', 'tea'], ['sleep', 'tea'], ['calm', 'tea'], ['cup', 'tea'],
  ['grow', 'greens'], ['microgreen', 'greens'], ['sprout', 'greens'], ['tray', 'greens'], ['seed', 'greens'],
  ['ferment', 'ferment'], ['pickle', 'ferment'], ['kraut', 'ferment'], ['culture', 'ferment'],
  ['eat', 'state'], ['meal', 'state'], ['plate', 'state'], ['food', 'state'],
  ['dinner', 'state'], ['lunch', 'state'], ['cook', 'state'],
];

const replies = councilReplies as Record<string, any>;

function replyFor(question: string) {
  const k = question.toLowerCase();
  const hit = KEYWORDS.find(([w]) => k.indexOf(w) >= 0);
  return (hit && replies[hit[1]]) || _fallbackReply;
}

/*
  The "why" disclosure. Every Council answer can show which of the user's own
  data informed it, plus a confidence level and an evidence grade. This is not
  decoration — an answer that cannot show its basis is one the app should not
  be making, so the control is always present rather than conditional on mood.
*/
function WhyPanel({ msg }: { msg: any }) {
  const [open, setOpen] = useState(false);
  if (!msg.hasWhy) return null;
  return (
    <div style={{ marginTop: 8 }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          border: 'none', background: 'none', padding: '4px 0', cursor: 'pointer',
          color: 'var(--earth)', fontSize: 'calc(11.5px * var(--scale))', fontWeight: 800,
        }}
      >
        {open ? 'Hide why' : 'Why this?'}
      </button>
      {open && (
        <div style={{
          marginTop: 6, background: 'var(--surface-1)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '10px 12px',
        }}>
          <ul style={{ margin: 0, paddingLeft: 16 }}>
            {(msg.why || []).map((w: string) => (
              <li key={w} style={{
                fontSize: 'calc(11.5px * var(--scale))', lineHeight: 1.5,
                color: 'var(--ink-muted)', marginBottom: 3,
              }}>{w}</li>
            ))}
          </ul>
          <div style={{
            marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap',
            fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800, color: 'var(--ink-meta)',
          }}>
            <span>{msg.confidence}</span>
            <span aria-hidden="true">·</span>
            <span>{msg.evidence}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function CouncilSheet() {
  const { state, set } = useStore();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [state.councilThread, state.councilOpen]);

  if (!state.councilOpen) return null;

  const submit = () => {
    const q = (state.councilDraft || '').trim();
    if (!q) return;
    const rep = replyFor(q);
    set((s) => ({
      councilDraft: '',
      councilThread: [
        ...s.councilThread,
        { you: true, text: q },
        {
          council: true, text: rep.a, hasWhy: true,
          why: rep.why, confidence: rep.confidence, evidence: rep.evidence,
        },
      ],
    }));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="AI Council"
      style={{
        position: 'absolute', inset: 0, zIndex: 62, display: 'flex',
        flexDirection: 'column', justifyContent: 'flex-end',
        background: 'var(--scrim-strong)', animation: 'rs-fade 0.2s ease',
      }}
    >
      <div style={{
        background: 'var(--sand)', borderRadius: '26px 26px 0 0',
        padding: '18px 18px 24px', maxHeight: '78%', display: 'flex', flexDirection: 'column',
        animation: 'rs-sheet var(--dur-sheet) cubic-bezier(.2,.8,.2,1)',
      }}>
        <div aria-hidden="true" style={{
          width: 38, height: 4, borderRadius: 3, background: 'var(--border-2)', margin: '0 auto 14px',
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div>
            <div style={{
              fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800, letterSpacing: 1.8,
              textTransform: 'uppercase', color: 'var(--earth)',
            }}>Ask the council</div>
            <div style={{
              fontFamily: 'var(--font-serif)', fontSize: 'calc(20px * var(--scale))',
              fontWeight: 600, color: 'var(--ink)', marginTop: 2,
            }}>AI Council</div>
          </div>
          <button
            type="button"
            aria-label="Close the AI Council"
            onClick={() => set({ councilOpen: false })}
            style={{
              border: 'none', background: 'var(--surface-3)', color: 'var(--ink-muted)',
              width: 34, height: 34, borderRadius: '50%', fontSize: 13, cursor: 'pointer',
            }}
            className="rs-hit"
          >
            <span aria-hidden="true">&#10005;</span>
          </button>
        </div>

        <div ref={scrollRef} className="rs-scroll" style={{ flex: 1, minWidth: 0, minHeight: 0, paddingRight: 2 }}>
          {state.councilThread.map((m: any, i: number) => (
            <div key={i} style={{ marginBottom: 12, display: 'flex', justifyContent: m.you ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '86%',
                background: m.you ? 'var(--forest)' : 'var(--card)',
                color: m.you ? 'var(--on-dark)' : 'var(--ink-body)',
                border: m.you ? 'none' : '1px solid var(--border)',
                borderRadius: 16, padding: '11px 13px',
              }}>
                <div className="rs-prose" style={{
                  fontSize: 'calc(12.5px * var(--scale))', lineHeight: 1.55,
                }}>{m.text}</div>
                {!m.you && <WhyPanel msg={m} />}
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); submit(); }}
          style={{ display: 'flex', gap: 8, marginTop: 10 }}
        >
          <label className="rs-sr" htmlFor="rs-council-input">Ask the AI Council a question</label>
          <input
            id="rs-council-input"
            value={state.councilDraft}
            onChange={(e) => set({ councilDraft: e.target.value })}
            placeholder="Ask about food, training, herbs or the land…"
            style={{
              flex: 1, minWidth: 0, minHeight: 44, border: '1px solid var(--border-2)', background: 'var(--card)',
              borderRadius: 14, padding: '12px 13px', fontSize: 'calc(13px * var(--scale))',
              color: 'var(--ink-body)',
            }}
          />
          <button type="submit" style={{
            flex: 'none', border: 'none', cursor: 'pointer', minHeight: 44, padding: '0 16px',
            background: 'var(--forest)', color: 'var(--on-dark)', borderRadius: 14,
            fontSize: 'calc(13px * var(--scale))', fontWeight: 800,
          }}>Ask</button>
        </form>
      </div>
    </div>
  );
}
