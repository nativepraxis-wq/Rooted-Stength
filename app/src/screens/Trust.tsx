import { useEffect, useRef } from 'react';
import { sovImage, ILLUSTRATION_NOTE } from '../data/media';
import { conditionDepth, labDepth } from '../data/healthDepth';
import {
  consentDepth, neverDepth, vaultPermDepth, biasTestDepth,
} from '../data/trustDepth';
import { useStore } from '../state/store';
import {
  sourceLibrary, consentList, egressLog, dsNeverList,
  vaultLabs, vaultDocs, vaultPerms, tiers, sovStats, sovSystemDefs,
  adminStats, reviewQueue, corrections, biasTests,
} from '../data/content';

import { DarkHeader } from '../components/Headers';
import { TierBadge } from '../components/TierBadge';
import { Screen, Gutter, Band, Chip, ToggleRow } from '../components/ui';

/*
  The four standing privacy promises. These lived in the prototype's render
  layer rather than its data block, so they come across here verbatim.
*/
const PRIVACY_PROMISES = [
  { t: 'Encrypted at rest & in transit', s: 'Health records are sealed end-to-end.' },
  { t: 'Data minimization', s: 'We collect only what personalizes your plan.' },
  { t: 'Never sold', s: 'Your health data is never sold or brokered.' },
  { t: 'No medical ad targeting', s: 'Nothing you upload is used for advertising.' },
];

/* ===================== sources ===================== */

export function SourcesScreen() {
  const { state, set, goBack } = useStore();

  /*
    Five links across MoveDetail and Restaurant read "Source: <title>" and all
    five arrived here on the same undifferentiated 66-entry list, with nothing
    recording which of the 66 had been asked for. Same shape as the
    farm-movement bug in DISCREPANCIES 38: the label named a specific thing and
    the destination could not tell which one.

    The library is NOT filtered down to the named entry. The other 65 are the
    point of a library, and hiding them would answer a question nobody asked.
    The entry is marked and scrolled to instead, and the mark can be cleared.
  */
  const focus = state.sourceFocus || '';
  const focusRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (focus && focusRef.current) focusRef.current.scrollIntoView({ block: 'center' });
  }, [focus]);

  return (
    <Screen>
      <DarkHeader eyebrow="Council Library" title="Sources &amp; evidence" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Every recommendation is traceable. We label how each claim is grounded and never present
          cultural knowledge as clinical fact — or the reverse.
        </p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        {/* The eight tiers, rendered by the same component that grades every claim. */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {['well', 'emerging', 'historical', 'contested', 'trad', 'oral', 'spiritual', 'contemporary'].map((k) => (
            <TierBadge key={k} kind="ev" tierKey={k}
              style={{ fontSize: 'calc(11px * var(--scale))', fontWeight: 700, padding: '5px 11px', borderRadius: 16 }} />
          ))}
        </div>
        <p className="rs-prose" style={{
          fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
          lineHeight: 1.55, margin: '10px 0 0',
        }}>
          Eight tiers, borrowed from the Codex methodology. A claim carried by oral history is not
          weaker than one carried by a trial — it is a different kind of knowing, and we say which
          one you are reading.
        </p>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 4px',
        }}>The library</h2>
        <div style={{
          fontSize: 'calc(11px * var(--scale))', fontWeight: 800, letterSpacing: 0.8,
          textTransform: 'uppercase', color: 'var(--ink-meta)', marginBottom: 10,
        }}>{(sourceLibrary as any[]).length} sources</div>

        {focus && (
          <div style={{
            display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10,
            background: 'var(--surface-cream)', border: '1px solid var(--border-cream)',
            borderRadius: 'var(--r-band)', padding: '11px 13px',
          }}>
            <span style={{
              flex: 1, minWidth: 0, fontSize: 'calc(12.5px * var(--scale))',
              color: 'var(--ink)', lineHeight: 1.5,
            }}>
              Showing you <strong>{focus}</strong>, the source that link named. The rest of the
              library is below it.
            </span>
            <button
              type="button"
              onClick={() => set({ sourceFocus: '' })}
              style={{
                border: 'none', background: 'none', cursor: 'pointer', padding: 0, flex: 'none',
                fontSize: 'calc(12px * var(--scale))', fontWeight: 800, color: 'var(--earth)',
              }}
            >Clear</button>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {(sourceLibrary as any[]).map((s, i) => (
            <div
              key={s.title + i}
              ref={s.title === focus ? focusRef : undefined}
              style={{
                background: 'var(--card)',
                border: s.title === focus
                  ? '2px solid var(--earth)'
                  : '1px solid var(--border)',
                borderRadius: 'var(--r-tile)',
                padding: s.title === focus ? '12px 13px' : '13px 14px',
              }}
            >
              <div style={{
                display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start',
              }}>
                <span style={{
                  flex: 1, minWidth: 0, fontSize: 'calc(13.5px * var(--scale))',
                  fontWeight: 700, color: 'var(--ink)', lineHeight: 1.35,
                }}>
                  {s.title}
                  {/*
                    The mark is announced as text, not carried by the border
                    alone - the same rule the tier badges follow.
                  */}
                  {s.title === focus && (
                    <span style={{
                      display: 'block', fontSize: 'calc(10.5px * var(--scale))',
                      fontWeight: 800, letterSpacing: 0.8, textTransform: 'uppercase',
                      color: 'var(--earth)', marginTop: 3,
                    }}>The source you followed</span>
                  )}
                </span>
                <TierBadge kind="ev" evLabel={s.ev} />
              </div>
              <div style={{
                fontSize: 'calc(11.5px * var(--scale))', color: 'var(--earth)',
                fontWeight: 700, marginTop: 4,
              }}>{s.org}</div>
              <p className="rs-prose" style={{
                fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-muted)',
                lineHeight: 1.5, margin: '5px 0 0',
              }}>{s.topic}</p>
            </div>
          ))}
        </div>

        <Band tone="safety" title="Where knowledge stops and care begins" style={{ marginTop: 16 }}>
          Spiritual and ancestral traditions are honored as knowledge, never offered as a substitute
          for appropriate healthcare. The Council recommends a clinician when warning signs appear.
        </Band>
      </Gutter>
    </Screen>
  );
}

/* ===================== privacy ===================== */

/* Small uppercase run-in label for the trust depth blocks. */
function TLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 'calc(10px * var(--scale))', fontWeight: 800,
      letterSpacing: 1, textTransform: 'uppercase',
      color: 'var(--ink-meta)', marginBottom: 3,
    }}>{children}</div>
  );
}

/* Small uppercase run-in label for the health depth blocks. */
function HLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 'calc(10px * var(--scale))', fontWeight: 800,
      letterSpacing: 1, textTransform: 'uppercase',
      color: 'var(--ink-meta)', marginBottom: 3,
    }}>{children}</div>
  );
}

export function PrivacyScreen() {
  const { state, set, go, goBack } = useStore();

  return (
    <Screen>
      <DarkHeader eyebrow="Settings" title="Privacy &amp; data" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Your data, your land. Everything here is granular and reversible.
        </p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <div style={{
          background: 'var(--surface-cream)', border: '1px solid var(--border-cream)',
          borderRadius: 'var(--r-band)', padding: '14px 15px',
        }}>
          {PRIVACY_PROMISES.map((p) => (
            <div key={p.t} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span aria-hidden="true" style={{
                width: 8, height: 8, borderRadius: '50%', flex: 'none',
                background: 'var(--leaf-mid)', marginTop: 5,
              }} />
              <span>
                <span style={{
                  display: 'block', fontSize: 'calc(12.5px * var(--scale))',
                  fontWeight: 700, color: 'var(--ink)',
                }}>{p.t}</span>
                <span style={{
                  display: 'block', fontSize: 'calc(11.5px * var(--scale))',
                  color: 'var(--ink-muted)', marginTop: 2,
                }}>{p.s}</span>
              </span>
            </div>
          ))}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 10px',
        }}>Permissions &amp; AI access</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(consentList as any[]).map((c) => (
            <div key={c.id}>
              <ToggleRow
                label={c.label}
                sub={c.sub}
                on={!!state.consent[c.id]}
                onToggle={() => set((s) => ({ consent: { ...s.consent, [c.id]: !s.consent[c.id] } }))}
              />
              {/*
                Depth, from data/trustDepth.ts. A consent toggle the user cannot
                evaluate is not really consent, so each one says what it covers,
                what it does not, and what would make it checkable.
              */}
              {consentDepth[c.label] && (
                <div style={{
                  marginTop: 9, paddingTop: 9, borderTop: '1px solid var(--border)',
                }}>
                  <TLabel>What it means</TLabel>
                  <p className="rs-prose" style={{
                    fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink)',
                    lineHeight: 1.55, margin: 0,
                  }}>{consentDepth[c.label].means}</p>
                  <div style={{ marginTop: 9 }}>
                    <TLabel>What it does not cover</TLabel>
                    <p className="rs-prose" style={{
                      fontSize: 'calc(12px * var(--scale))', color: 'var(--clay)',
                      lineHeight: 1.5, margin: 0, fontWeight: 600,
                    }}>{consentDepth[c.label].limit}</p>
                  </div>
                  <div style={{ marginTop: 9 }}>
                    <TLabel>What would make it checkable</TLabel>
                    <p className="rs-prose" style={{
                      fontSize: 'calc(12px * var(--scale))', color: 'var(--earth)',
                      lineHeight: 1.5, margin: 0, fontWeight: 600,
                    }}>{consentDepth[c.label].check}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 10px',
        }}>Your records</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {[
            { t: 'Manage the Health Vault', s: 'See exactly what the Council can read', to: 'vault' },
            { t: 'Where my data actually lives', s: 'Residency map · 7-day transfer ledger', to: 'dataSov' },
          ].map((r) => (
            <button
              key={r.to}
              type="button"
              onClick={() => go(r.to as any)}
              style={{
                display: 'flex', width: '100%', gap: 12, alignItems: 'center', textAlign: 'left',
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-card)', padding: '14px 15px', cursor: 'pointer', minHeight: 44,
              }}
            >
              <span style={{ flex: 1 }}>
                <span style={{
                  display: 'block', fontSize: 'calc(14px * var(--scale))',
                  fontWeight: 700, color: 'var(--ink)',
                }}>{r.t}</span>
                <span style={{
                  display: 'block', fontSize: 'calc(11.5px * var(--scale))',
                  color: 'var(--ink-meta)', marginTop: 2,
                }}>{r.s}</span>
              </span>
              <span aria-hidden="true" style={{ fontSize: 17, color: 'var(--ink-meta)' }}>&#8250;</span>
            </button>
          ))}
        </div>

        {/*
          The compliance line the handoff is explicit about: design for
          healthcare-grade privacy, but do not claim a certification that has
          not been audited.
        */}
        <Band tone="safety" title="What we do not claim" style={{ marginTop: 16 }}>
          We design for healthcare-grade privacy but don&rsquo;t claim legal compliance
          (HIPAA/GDPR) until independent audits and legal review are complete.
        </Band>
      </Gutter>
    </Screen>
  );
}

/* ===================== dataSov ===================== */

const REGIONS = [
  { id: 'device', label: 'This phone', note: 'The vault stays on the device. Nothing is hosted anywhere — and nothing is recoverable if you lose the phone.' },
  { id: 'coop', label: 'US co-op', note: 'Hosted on member-owned servers in Atlanta, governed by the Rooted Strength co-op board. No third-party cloud, no subpoena-friendly middleman.' },
  { id: 'eu', label: 'EU co-op', note: 'Hosted in Amsterdam under GDPR terms. Choose this if you want European data-protection law to be the floor.' },
];

export function DataSovScreen() {
  const { state, set, go, goBack } = useStore();
  const only = !!state.dsDeviceOnly;
  const purged = !!state.dsPurged;
  const log = purged ? [] : (egressLog as any[]);
  const vaultOn = Object.values(state.vaultPerm || {}).filter(Boolean).length;
  const region = REGIONS.find((r) => r.id === state.dsRegion) || REGIONS[1];

  const places = [
    {
      name: 'This phone', glyph: '1', where: 'Local encrypted store',
      state: 'Always on', barW: only ? '100%' : '92%',
      what: 'Every log, plate, session, note and photo you capture. Deleting the app deletes all of it.',
      retention: 'until you delete it', crypto: 'Sealed by your passcode', c: '#2F4A31',
    },
    {
      name: 'Rooted vault', glyph: '2',
      where: only ? 'Sync paused' : 'Member co-op · ' + region.label,
      state: only ? 'Paused' : 'On', barW: only ? '0%' : '8%',
      what: 'Only what you put in the Health Vault — lab PDFs, clinician notes. Encrypted before it leaves the phone: we hold the box, you hold the key.',
      retention: 'until you revoke', crypto: 'End-to-end encrypted', c: '#7E5124',
    },
    {
      name: 'Council inference', glyph: '3',
      where: only ? 'On-device model only' : 'Transient · held in memory',
      state: only ? 'On-device' : 'Cloud + device', barW: '0%',
      what: 'Your question plus the Vault fields you allowed. Held for the length of one answer, then dropped — never written to disk, never used for training.',
      retention: 'seconds', crypto: 'Never stored', c: '#2E6B7A',
    },
  ];

  return (
    <Screen>
      <DarkHeader eyebrow="Settings · sovereignty" title="Where your data lives" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Privacy settings say what we promise. This screen says what is actually true right now —
          every place your records sit, and everything that has left this phone.
        </p>
        <div style={{ display: 'flex', gap: 9, marginTop: 14 }}>
          {[
            { n: String(log.length), l: 'transfers off this device · last 7 days' },
            { n: only ? '100%' : '92%', l: 'of your records never leave the phone' },
          ].map((s) => (
            <div key={s.l} style={{
              flex: 1, minWidth: 0, background: 'rgba(244,237,223,0.13)', borderRadius: 14, padding: '11px 12px',
            }}>
              <div style={{
                fontFamily: 'var(--font-serif)', fontSize: 'calc(20px * var(--scale))',
                fontWeight: 600, color: 'var(--ochre-light)',
              }}>{s.n}</div>
              <div style={{ fontSize: 'calc(10px * var(--scale))', lineHeight: 1.3, marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        {only && (
          <Band tone="cream" style={{ marginBottom: 14 }}>
            <b style={{ color: 'var(--ink)' }}>Device-only mode is on.</b> Every sync destination
            below is switched off. The Council answers from the model on your phone.
          </Band>
        )}

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '0 0 10px',
        }}>Where it lives</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {places.map((p) => (
            <div key={p.name} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-card)', padding: '14px 15px',
            }}>
              <div style={{ display: 'flex', gap: 11, alignItems: 'center' }}>
                <span aria-hidden="true" style={{
                  width: 26, height: 26, flex: 'none', borderRadius: 9, background: p.c,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#F4EDDF', fontSize: 12, fontWeight: 800,
                }}>{p.glyph}</span>
                <span style={{ flex: 1 }}>
                  <span style={{
                    display: 'block', fontSize: 'calc(14px * var(--scale))',
                    fontWeight: 700, color: 'var(--ink)',
                  }}>{p.name}</span>
                  <span style={{
                    display: 'block', fontSize: 'calc(11px * var(--scale))',
                    color: 'var(--ink-meta)', marginTop: 1,
                  }}>{p.where}</span>
                </span>
                <span style={{
                  fontSize: 'calc(10px * var(--scale))', fontWeight: 800,
                  padding: '3px 8px', borderRadius: 12,
                  background: 'var(--surface-2)', color: 'var(--ink-meta)',
                }}>{p.state}</span>
              </div>
              <div aria-hidden="true" style={{
                height: 6, borderRadius: 4, background: 'var(--surface-2)',
                overflow: 'hidden', margin: '10px 0 8px',
              }}>
                <div style={{ height: '100%', width: p.barW, background: p.c, borderRadius: 4 }} />
              </div>
              <p className="rs-prose" style={{
                fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-muted)',
                lineHeight: 1.5, margin: 0,
              }}>{p.what}</p>
              <div style={{
                display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 7,
                fontSize: 'calc(10.5px * var(--scale))', fontWeight: 700, color: 'var(--ink-meta)',
              }}>
                <span>Kept: {p.retention}</span><span>{p.crypto}</span>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 10px',
        }}>What left this device</h2>
        {log.length === 0 ? (
          <Band tone="cream">
            {purged
              ? 'You cleared the ledger. Anything sent from now on will show up here.'
              : 'No record, question or file has been transmitted in the last seven days.'}
          </Band>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {log.map((e, i) => (
              <div key={i} style={{
                display: 'flex', gap: 11, alignItems: 'flex-start',
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-tile)', padding: '12px 13px',
              }}>
                <span aria-hidden="true" style={{
                  width: 9, height: 9, borderRadius: '50%', flex: 'none',
                  background: e.c, marginTop: 5,
                }} />
                <span style={{ flex: 1 }}>
                  <span style={{
                    display: 'flex', justifyContent: 'space-between', gap: 8,
                  }}>
                    <span style={{
                      fontSize: 'calc(13px * var(--scale))', fontWeight: 700, color: 'var(--ink)',
                    }}>{e.dest}</span>
                    <span style={{
                      fontSize: 'calc(10.5px * var(--scale))',
                      color: 'var(--ink-meta)', fontWeight: 700,
                    }}>{e.when}</span>
                  </span>
                  <span className="rs-prose" style={{
                    display: 'block', fontSize: 'calc(11.5px * var(--scale))',
                    color: 'var(--ink-muted)', marginTop: 3, lineHeight: 1.45,
                  }}>{e.payload}</span>
                  <span style={{
                    display: 'block', fontSize: 'calc(11px * var(--scale))',
                    color: 'var(--earth)', fontWeight: 700, marginTop: 3,
                  }}>because you {e.why}</span>
                </span>
              </div>
            ))}
          </div>
        )}

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 10px',
        }}>Never sent, to anyone</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {(dsNeverList as any[]).map((n) => (
            <span key={n.label} style={{
              fontSize: 'calc(11.5px * var(--scale))', fontWeight: 700,
              background: 'var(--surface-2)', color: 'var(--ink-meta)',
              padding: '6px 12px', borderRadius: 16,
            }}>{n.label}</span>
          ))}
        </div>

        {/*
          The chips are a list of names; this is what each promise actually
          covers. See data/trustDepth.ts - none of it describes an
          implementation, because this repository does not contain one.
        */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 12 }}>
          {(dsNeverList as any[]).map((n) => neverDepth[n.label] && (
            <div key={n.label} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '13px 14px',
            }}>
              <div style={{
                fontSize: 'calc(13.5px * var(--scale))', fontWeight: 700, color: 'var(--ink)',
              }}>{n.label}</div>
              {neverDepth[n.label] && (
                <div style={{
                  marginTop: 9, paddingTop: 9, borderTop: '1px solid var(--border)',
                }}>
                  <TLabel>What it means</TLabel>
                  <p className="rs-prose" style={{
                    fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink)',
                    lineHeight: 1.55, margin: 0,
                  }}>{neverDepth[n.label].means}</p>
                  <div style={{ marginTop: 9 }}>
                    <TLabel>What it does not cover</TLabel>
                    <p className="rs-prose" style={{
                      fontSize: 'calc(12px * var(--scale))', color: 'var(--clay)',
                      lineHeight: 1.5, margin: 0, fontWeight: 600,
                    }}>{neverDepth[n.label].limit}</p>
                  </div>
                  <div style={{ marginTop: 9 }}>
                    <TLabel>What would make it checkable</TLabel>
                    <p className="rs-prose" style={{
                      fontSize: 'calc(12px * var(--scale))', color: 'var(--earth)',
                      lineHeight: 1.5, margin: 0, fontWeight: 600,
                    }}>{neverDepth[n.label].check}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 10px',
        }}>Sovereignty controls</h2>
        <ToggleRow
          label="Device-only mode"
          sub="No sync, no cloud inference. Some Council answers get slower."
          on={only}
          onToggle={() => set((s) => ({ dsDeviceOnly: !s.dsDeviceOnly }))}
        />

        <div style={{
          fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700,
          color: 'var(--ink-muted)', margin: '16px 0 9px',
        }}>Where the vault is hosted</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {REGIONS.map((r) => (
            <Chip
              key={r.id}
              selected={r.id === (state.dsRegion || 'coop')}
              color="var(--earth)"
              onClick={() => set({ dsRegion: r.id })}
            >{r.label}</Chip>
          ))}
        </div>
        <p className="rs-prose" style={{
          fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-muted)',
          lineHeight: 1.5, margin: '10px 0 0',
        }}>{(REGIONS.find((r) => r.id === (state.dsRegion || 'coop')) || REGIONS[1]).note}</p>

        <button
          type="button"
          onClick={() => set((s) => ({ dsPurged: !s.dsPurged }))}
          style={{
            width: '100%', marginTop: 16, cursor: 'pointer', minHeight: 44,
            border: '1px solid var(--border-rose)', background: 'var(--safety-bg)',
            color: 'var(--clay)', borderRadius: 14, padding: 14,
            fontSize: 'calc(13px * var(--scale))', fontWeight: 800,
          }}
        >{purged ? 'Ledger cleared — tap to restore the record' : 'Clear the transfer ledger'}</button>

        {/*
          The disclosure the handoff insists on keeping. If real infrastructure
          exists at build time, replace this with the truth — do not delete it
          and leave the claims above standing bare.
        */}
        <Band tone="labour" title="This is a design prototype" style={{ marginTop: 16 }}>
          This ledger is generated on your phone from the app&rsquo;s own network layer. It is a
          design prototype — an independent audit hasn&rsquo;t verified it yet, and we won&rsquo;t
          claim it has. The co-op hosting described above is the intended architecture, not a
          service you are currently using.
        </Band>
      </Gutter>
    </Screen>
  );
}

/* ===================== vault ===================== */

export function VaultScreen() {
  const { state, set, go, goBack } = useStore();
  const perms = state.vaultPerm || {};
  const onCount = Object.values(perms).filter(Boolean).length;

  return (
    <Screen>
      <DarkHeader eyebrow="Journey · your records" title="Medical &amp; Health Vault" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Encrypted before it leaves the phone. The Council reads only the fields you switch on —
          and says so when an answer is limited by that.
        </p>
        <div style={{
          marginTop: 12, fontSize: 'calc(11px * var(--scale))', fontWeight: 800,
          letterSpacing: 1, textTransform: 'uppercase', color: 'var(--ochre-light)',
        }}>Council can read {onCount} of {(vaultPerms as any[]).length} fields</div>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '0 0 10px',
        }}>Latest labs</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(vaultLabs as any[]).map((l) => (
            <div key={l.name} style={{
              background: l.flag === 'watch' ? 'var(--surface-3)' : 'var(--card)',
              border: '1px solid ' + (l.flag === 'watch' ? 'var(--border-2)' : 'var(--border)'),
              borderRadius: 'var(--r-tile)', padding: '12px 13px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                <span style={{
                  flex: 1, minWidth: 0, fontSize: 'calc(13px * var(--scale))',
                  fontWeight: 700, color: 'var(--ink)',
                }}>{l.name}</span>
                <span style={{
                  fontSize: 'calc(13px * var(--scale))',
                  fontWeight: 800, color: 'var(--ink)',
                }}>{l.value}</span>
              </div>
              <div style={{
                display: 'flex', justifyContent: 'space-between', gap: 10, marginTop: 4,
                fontSize: 'calc(11px * var(--scale))', color: 'var(--ink-meta)', fontWeight: 600,
              }}>
                <span>{l.status}</span><span>ref {l.range}</span>
              </div>

              {/*
                Depth, from data/healthDepth.ts. These explain the MARKER and
                deliberately do not interpret the value beside them - reading a
                result back at someone is diagnosis, and this screen already
                routes that to a clinician.
              */}
              {labDepth[l.name] && (
                <div style={{
                  marginTop: 9, paddingTop: 9, borderTop: '1px solid var(--border)',
                }}>
                  <HLabel>What it measures</HLabel>
                  <p className="rs-prose" style={{
                    fontSize: 'calc(12px * var(--scale))', color: 'var(--ink)',
                    lineHeight: 1.5, margin: 0,
                  }}>{labDepth[l.name].measures}</p>
                  <div style={{ marginTop: 8 }}>
                    <HLabel>Why the range sits there</HLabel>
                    <p className="rs-prose" style={{
                      fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-muted)',
                      lineHeight: 1.5, margin: 0,
                    }}>{labDepth[l.name].range}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 10px',
        }}>Documents</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(vaultDocs as any[]).map((d) => (
            <div key={d.name} style={{
              display: 'flex', gap: 11, alignItems: 'center',
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '12px 13px',
            }}>
              <span aria-hidden="true" style={{
                width: 10, height: 10, borderRadius: '50%', flex: 'none', background: d.c,
              }} />
              <span style={{ flex: 1 }}>
                <span style={{
                  display: 'block', fontSize: 'calc(13px * var(--scale))',
                  fontWeight: 700, color: 'var(--ink)',
                }}>{d.name}</span>
                <span style={{
                  display: 'block', fontSize: 'calc(11px * var(--scale))',
                  color: 'var(--ink-meta)', marginTop: 2,
                }}>{d.kind} · {d.date}</span>
              </span>
            </div>
          ))}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 10px',
        }}>What the Council may read</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(vaultPerms as any[]).map((p) => (
            <div key={p.key}>
              <ToggleRow
                label={p.label}
                sub={p.sub}
                on={!!perms[p.key]}
                onToggle={() => set((s) => ({ vaultPerm: { ...s.vaultPerm, [p.key]: !s.vaultPerm[p.key] } }))}
              />
              {vaultPermDepth[p.label] && (
                <div style={{
                  marginTop: 9, paddingTop: 9, borderTop: '1px solid var(--border)',
                }}>
                  <TLabel>What it means</TLabel>
                  <p className="rs-prose" style={{
                    fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink)',
                    lineHeight: 1.55, margin: 0,
                  }}>{vaultPermDepth[p.label].means}</p>
                  <div style={{ marginTop: 9 }}>
                    <TLabel>What it does not cover</TLabel>
                    <p className="rs-prose" style={{
                      fontSize: 'calc(12px * var(--scale))', color: 'var(--clay)',
                      lineHeight: 1.5, margin: 0, fontWeight: 600,
                    }}>{vaultPermDepth[p.label].limit}</p>
                  </div>
                  <div style={{ marginTop: 9 }}>
                    <TLabel>What would make it checkable</TLabel>
                    <p className="rs-prose" style={{
                      fontSize: 'calc(12px * var(--scale))', color: 'var(--earth)',
                      lineHeight: 1.5, margin: 0, fontWeight: 600,
                    }}>{vaultPermDepth[p.label].check}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <Band tone="safety" title="A vault is not a diagnosis" style={{ marginTop: 16 }}>
          Values here are what your clinician recorded. The Council can use them to soften a food
          or training suggestion; it cannot interpret a lab result, and it will point you back to a
          clinician when something needs reading properly.
        </Band>
      </Gutter>
    </Screen>
  );
}

/* ===================== membership ===================== */

export function MembershipScreen() {
  const { state, set, goBack } = useStore();

  return (
    <Screen>
      <DarkHeader eyebrow="Journey · membership" title="What is free, and what is not" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          The knowledge stays open. What you pay for is depth and the co-op that maintains it.
        </p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {['monthly', 'annual'].map((b) => (
            <Chip
              key={b}
              selected={state.billing === b}
              color="var(--forest)"
              onClick={() => set({ billing: b })}
            >{b === 'annual' ? 'Annual · save' : 'Monthly'}</Chip>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(tiers as any[]).map((t) => {
            const price = state.billing === 'annual' ? t.yr : t.mo;
            const current = state.plan === t.id;
            return (
              <div key={t.id} style={{
                background: 'var(--card)',
                border: '1px solid ' + (current ? t.accent : 'var(--border)'),
                borderRadius: 'var(--r-card)', padding: 0, overflow: 'hidden',
                boxShadow: current ? 'var(--shadow-card)' : 'none',
              }}>
                <div aria-hidden="true" style={{ height: 5, background: t.accent }} />
                <div style={{ padding: '15px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                    <span>
                      <span style={{
                        display: 'block', fontFamily: 'var(--font-serif)',
                        fontSize: 'calc(19px * var(--scale))', fontWeight: 600, color: 'var(--ink)',
                      }}>{t.name}</span>
                      {/*
                        `popular` was set on exactly one tier and never read.
                        A pricing table that knows which plan it recommends and
                        does not say so is withholding the one thing the field
                        was added to convey.
                      */}
                      {t.popular && (
                        <span style={{
                          display: 'inline-block', marginLeft: 8,
                          fontSize: 'calc(10px * var(--scale))', fontWeight: 800,
                          letterSpacing: 0.6, textTransform: 'uppercase',
                          background: t.accent, color: '#F4EDDF',
                          padding: '2px 8px', borderRadius: 10,
                        }}>Most chosen</span>
                      )}
                      <span style={{
                        display: 'block', fontSize: 'calc(11.5px * var(--scale))',
                        color: 'var(--ink-meta)', marginTop: 2,
                      }}>{t.tagline}</span>
                    </span>
                    <span style={{
                      flex: 'none', textAlign: 'right',
                      fontFamily: 'var(--font-serif)', fontSize: 'calc(20px * var(--scale))',
                      fontWeight: 600, color: t.accent,
                    }}>
                      {price === 0 ? 'Free' : '$' + price}
                      {price !== 0 && (
                        <span style={{
                          display: 'block', fontSize: 'calc(10px * var(--scale))',
                          color: 'var(--ink-meta)', fontWeight: 700,
                        }}>{state.billing === 'annual' ? 'per year' : 'per month'}</span>
                      )}
                    </span>
                  </div>

                  <ul style={{ margin: '12px 0 0', paddingLeft: 16 }}>
                    {t.features.map((f: string) => (
                      <li key={f} style={{
                        fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
                        lineHeight: 1.55, marginBottom: 4,
                      }}>{f}</li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => set({ plan: t.id })}
                    aria-pressed={current}
                    style={{
                      width: '100%', marginTop: 14, minHeight: 44, cursor: 'pointer',
                      border: '1px solid ' + (current ? 'var(--leaf-mid)' : t.accent),
                      background: current ? '#E4EDDD' : t.accent,
                      color: current ? 'var(--leaf)' : 'var(--on-dark)',
                      borderRadius: 14, padding: 13,
                      fontSize: 'calc(13.5px * var(--scale))', fontWeight: 800,
                    }}
                  >{current ? 'Your current plan ✓' : 'Choose ' + t.name}</button>
                </div>
              </div>
            );
          })}
        </div>

        <Band tone="cream" title="What a paywall never covers here" style={{ marginTop: 16 }}>
          Safety warnings, allergen filtering, evidence grading, the accessibility settings and the
          source library stay available on every plan. Charging for a safety warning would make the
          warning a product, and it is not one.
        </Band>
      </Gutter>
    </Screen>
  );
}

/* ===================== sovereignty ===================== */

export function SovereigntyScreen() {
  const { state, set, goBack } = useStore();
  const defs = sovSystemDefs as any[];
  const sel = defs.find((d) => d.id === state.sovSystem) ?? defs[0];

  return (
    <Screen>
      <DarkHeader eyebrow="Journey · food sovereignty" title="What the food system did" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          These gaps were built — by redlining, by supermarket flight, by which crops got research
          money. Naming the cause matters as much as naming the fix.
        </p>
        <div style={{ display: 'flex', gap: 9, marginTop: 14 }}>
          {(sovStats as any[]).map((s) => (
            <div key={s.label} style={{
              flex: 1, minWidth: 0, background: 'rgba(244,237,223,0.13)', borderRadius: 14, padding: '11px 12px',
            }}>
              <div style={{
                fontFamily: 'var(--font-serif)', fontSize: 'calc(18px * var(--scale))',
                fontWeight: 600, color: 'var(--ochre-light)',
              }}>{s.n}</div>
              <div style={{ fontSize: 'calc(9.5px * var(--scale))', lineHeight: 1.3, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <div className="rs-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {defs.map((d) => (
            <Chip
              key={d.id}
              selected={d.id === sel.id}
              color={d.c}
              onClick={() => set({ sovSystem: d.id })}
            >{d.name}</Chip>
          ))}
        </div>

        {/* One per system, keyed to the open chip. */}
        <img
          key={sel.id}
          src={sovImage(sel.id)}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          style={{
            display: 'block', width: '100%', height: 150, marginTop: 14,
            objectFit: 'cover', borderRadius: 'var(--r-band)',
            background: 'var(--surface-2)',
          }}
        />
        <div style={{
          fontSize: 'calc(10.5px * var(--scale))', color: 'var(--ink-meta)',
          fontWeight: 700, marginTop: 6,
        }}>{ILLUSTRATION_NOTE}</div>

        <div style={{
          marginTop: 14, background: sel.tintBg, borderRadius: 'var(--r-band)', padding: '15px 16px',
        }}>
          <p className="rs-prose" style={{
            fontSize: 'calc(12.5px * var(--scale))', color: '#4C463A',
            fontWeight: 600, lineHeight: 1.5, margin: 0,
          }}>{sel.headline}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 12 }}>
          {sel.conditions.map((c: any) => (
            <div key={c.name} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '13px 14px',
            }}>
              <div style={{
                fontSize: 'calc(14px * var(--scale))', fontWeight: 700, color: 'var(--ink)',
              }}>{c.name}</div>
              <p className="rs-prose" style={{
                fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
                lineHeight: 1.5, margin: '5px 0 0',
              }}>{c.fix}</p>

              {/*
                `stat` was already in content.ts on all eight conditions and was
                never rendered - the quantified half of every claim on this
                screen was sitting in the data, invisible. On a screen about what
                the evidence carries, that was the wrong thing to hide.
              */}
              {c.stat && (
                <div style={{
                  fontSize: 'calc(11.5px * var(--scale))', fontWeight: 800,
                  color: sel.c, marginTop: 7,
                }}>{c.stat}</div>
              )}

              {/* Depth, from data/healthDepth.ts. */}
              {conditionDepth[c.name] && (() => {
                const cd = conditionDepth[c.name];
                return (
                  <div style={{
                    marginTop: 10, paddingTop: 10,
                    borderTop: '1px solid var(--border)',
                  }}>
                    <HLabel>Why it works</HLabel>
                    <p className="rs-prose" style={{
                      fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink)',
                      lineHeight: 1.55, margin: 0,
                    }}>{cd.mechanism}</p>

                    <div style={{ marginTop: 9 }}>
                      <HLabel>What that number covers</HLabel>
                      <p className="rs-prose" style={{
                        fontSize: 'calc(12px * var(--scale))', color: 'var(--earth)',
                        lineHeight: 1.5, margin: 0, fontWeight: 600,
                      }}>{cd.limit}</p>
                    </div>

                    {cd.clinician && (
                      <div style={{ marginTop: 9 }}>
                        <HLabel>Theirs, not ours</HLabel>
                        <p className="rs-prose" style={{
                          fontSize: 'calc(12px * var(--scale))', color: 'var(--clay)',
                          lineHeight: 1.5, margin: 0, fontWeight: 600,
                        }}>{cd.clinician}</p>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          ))}
        </div>

        <Band tone="labour" title="Food is not the whole answer" style={{ marginTop: 16 }}>
          A better plate does not undo an environment built to make health expensive. Diet advice
          offered without naming that is advice that blames the person for the system.
        </Band>
      </Gutter>
    </Screen>
  );
}

/* ===================== admin ===================== */

export function AdminScreen() {
  const { state, set, goBack } = useStore();
  const approved = state.approved || {};

  return (
    <Screen>
      <DarkHeader eyebrow="Journey · editorial" title="Review queue" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          The editorial back-office: what is waiting on a human, what got corrected, and what the
          bias checks caught.
        </p>
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          {(adminStats as any[]).map((s) => (
            <div key={s.label} style={{
              flex: 1, minWidth: 0, background: 'rgba(244,237,223,0.13)', borderRadius: 14, padding: '10px 10px',
            }}>
              <div style={{
                fontFamily: 'var(--font-serif)', fontSize: 'calc(18px * var(--scale))',
                fontWeight: 600, color: s.c,
              }}>{s.n}</div>
              <div style={{ fontSize: 'calc(9.5px * var(--scale))', lineHeight: 1.3, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '0 0 10px',
        }}>Waiting on a human</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {(reviewQueue as any[]).map((q) => {
            const ok = !!approved[q.id];
            return (
              <div key={q.id} style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-tile)', padding: '13px 14px',
              }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start',
                }}>
                  <span style={{
                    flex: 1, minWidth: 0, fontSize: 'calc(13.5px * var(--scale))',
                    fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3,
                  }}>{q.title}</span>
                  <TierBadge kind="ev" evLabel={q.ev} />
                </div>
                <div style={{
                  fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-meta)', marginTop: 4,
                }}>{q.type}</div>
                {/*
                  Model confidence is shown, never used as an approval. A human
                  still has to press the button — that is the point of the queue.
                */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
                  <span style={{
                    fontSize: 'calc(11px * var(--scale))', fontWeight: 700, color: 'var(--ink-meta)',
                  }}>model confidence {q.conf}%</span>
                  <span style={{ flex: 1 }} />
                  <button
                    type="button"
                    aria-pressed={ok}
                    onClick={() => set((s) => ({ approved: { ...s.approved, [q.id]: !ok } }))}
                    style={{
                      border: '1px solid ' + (ok ? 'var(--leaf-mid)' : 'var(--border-2)'),
                      background: ok ? '#E4EDDD' : 'var(--card)',
                      color: ok ? 'var(--leaf)' : 'var(--ink-muted)',
                      borderRadius: 999, padding: '9px 15px', minHeight: 44, cursor: 'pointer',
                      fontSize: 'calc(12px * var(--scale))', fontWeight: 800,
                    }}
                  >{ok ? 'Approved ✓' : 'Approve'}</button>
                </div>
              </div>
            );
          })}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 10px',
        }}>Community corrections</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(corrections as any[]).map((c) => (
            <div key={c.text} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '12px 13px',
            }}>
              <p className="rs-prose" style={{
                fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink)',
                lineHeight: 1.5, margin: 0,
              }}>{c.text}</p>
              <div style={{
                display: 'flex', justifyContent: 'space-between', gap: 10, marginTop: 6,
                fontSize: 'calc(11px * var(--scale))', color: 'var(--ink-meta)', fontWeight: 700,
              }}>
                <span>on {c.on}</span><span style={{ color: 'var(--earth)' }}>{c.status}</span>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 10px',
        }}>Bias checks</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(biasTests as any[]).map((b) => (
            <div key={b.name} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '12px 13px',
            }}>
              <div style={{ display: 'flex', gap: 11, alignItems: 'center' }}>
                <span style={{
                  flex: 1, minWidth: 0, fontSize: 'calc(12.5px * var(--scale))',
                  color: 'var(--ink)', lineHeight: 1.45,
                }}>{b.name}</span>
                <span style={{
                  fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800,
                  padding: '3px 9px', borderRadius: 12,
                  background: b.status === 'pass' ? '#E4EDDD' : 'var(--safety-bg)',
                  color: b.status === 'pass' ? 'var(--leaf)' : 'var(--clay)',
                }}>{b.status === 'pass' ? 'pass' : b.status}</span>
              </div>

              {/*
                Depth, from data/trustDepth.ts. A pass/warn chip states a verdict
                without saying what was tested - and on a self-audit, that is the
                part a reader has no way to supply.
              */}
              {biasTestDepth[b.name] && (
                <div style={{
                  marginTop: 9, paddingTop: 9, borderTop: '1px solid var(--border)',
                }}>
                  <TLabel>What is checked</TLabel>
                  <p className="rs-prose" style={{
                    fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink)',
                    lineHeight: 1.55, margin: 0,
                  }}>{biasTestDepth[b.name].checks}</p>
                  <div style={{ marginTop: 9 }}>
                    <TLabel>Why it matters here</TLabel>
                    <p className="rs-prose" style={{
                      fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-muted)',
                      lineHeight: 1.5, margin: 0,
                    }}>{biasTestDepth[b.name].why}</p>
                  </div>
                  {/* Only the one that does not pass carries this. */}
                  {biasTestDepth[b.name].gap && (
                    <div style={{ marginTop: 9 }}>
                      <TLabel>Why this one is flagged</TLabel>
                      <p className="rs-prose" style={{
                        fontSize: 'calc(12px * var(--scale))', color: 'var(--clay)',
                        lineHeight: 1.5, margin: 0, fontWeight: 600,
                      }}>{biasTestDepth[b.name].gap}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </Gutter>
    </Screen>
  );
}
