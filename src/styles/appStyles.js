export const styles = {
  // App container
  root: { display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: 'var(--bg)' },

  // Top bar and brand
  topbar: {
    height: 64,
    background: 'linear-gradient(180deg, rgba(26,26,30,0.96), rgba(20,20,24,0.96))',
    borderBottom: '1px solid rgba(110,231,183,0.18)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
    position: 'sticky', top: 0, zIndex: 50,
    display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16, flexShrink: 0,
    backdropFilter: 'blur(8px)',
  },
  brand: { display: 'flex', alignItems: 'center', gap: 9, marginRight: 8 },
  brandIcon: {
    width: 30, height: 30, borderRadius: 8,
    background: 'linear-gradient(135deg, #16a34a, #0ea5e9)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    boxShadow: '0 6px 18px rgba(14,165,233,0.25)',
  },
  brandName: { fontSize: 15, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' },
  brandPill: {
    fontSize: 10, fontWeight: 600, background: 'var(--accent-dim)', color: 'var(--accent)',
    padding: '2px 7px', borderRadius: 20, border: '1px solid rgba(110,231,183,0.2)',
  },

  // Step navigation
  steps: { display: 'flex', gap: 4, flex: 1, justifyContent: 'center' },
  stepBtn: {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '6px 16px', borderRadius: 20, border: '1px solid var(--border)',
    background: 'transparent', color: 'var(--text-3)', fontSize: 13, fontWeight: 500,
    cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--font)',
  },
  stepActive: { background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid rgba(110,231,183,0.3)' },
  stepDone:   { color: 'var(--text-2)', border: '1px solid var(--border-mid)' },

  // Top bar actions
  resetBtn: {
    marginLeft: 'auto', fontSize: 12, color: 'var(--text-2)', background: 'var(--bg-3)',
    border: '1px solid var(--border-mid)', borderRadius: 10, padding: '6px 14px', cursor: 'pointer',
    fontFamily: 'var(--font)', transition: 'all 0.15s',
  },

  // Two-column layout
  layout: { display: 'grid', gridTemplateColumns: '420px 1fr', flex: 1, overflow: 'hidden' },

  // Form column
  formCol: { borderRight: '1px solid var(--border)', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  formScroll: { flex: 1, overflowY: 'auto', padding: '0' },

  // Step panels
  stepPanel: { padding: '28px 28px 40px', animation: 'fadeUp 0.25s ease' },
  stepHeader: { marginBottom: 28 },
  stepTitle: { fontSize: 22, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: 5 },
  stepSub: { fontSize: 13, color: 'var(--text-3)', lineHeight: 1.5 },

  // Form field helpers
  rupeePrefix: {
    position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)',
    fontSize: 15, color: 'var(--text-2)', pointerEvents: 'none', zIndex: 1,
  },

  upiPill: {
    display: 'flex', alignItems: 'flex-start', gap: 8,
    background: 'var(--bg-3)', border: '1px solid rgba(110,231,183,0.15)',
    borderRadius: 10, padding: '10px 14px', marginTop: 4,
  },
  upiPillDot: {
    width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)',
    flexShrink: 0, marginTop: 3, animation: 'pulse-ring 2s infinite',
  },

  // Logo upload area
  logoArea: { marginTop: 2 },
  uploadZone: {
    width: '100%', padding: '24px 16px', background: 'var(--bg-3)',
    border: '1.5px dashed var(--border-mid)', borderRadius: 12,
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
    cursor: 'pointer', transition: 'border-color 0.2s', fontFamily: 'var(--font)',
  },
  logoPreviewWrap: { display: 'flex', alignItems: 'center', gap: 14, background: 'var(--bg-3)', borderRadius: 12, padding: '12px 16px' },
  logoImg: { width: 52, height: 52, borderRadius: 10, objectFit: 'contain', background: 'white', padding: 3 },
  logoMeta: { display: 'flex', flexDirection: 'column', gap: 6 },
  removeBtn: {
    fontSize: 11, color: '#f87171', background: 'rgba(239,68,68,0.08)',
    border: '1px solid rgba(239,68,68,0.2)', borderRadius: 6, padding: '3px 10px',
    cursor: 'pointer', fontFamily: 'var(--font)',
  },

  // Color pickers
  presetsGrid: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  presetDot: {
    width: 28, height: 28, borderRadius: '50%', cursor: 'pointer',
    border: '2px solid transparent', transition: 'transform 0.15s, border-color 0.15s',
  },
  presetActive: { border: '2px solid white', transform: 'scale(1.18)' },

  colorRow: { display: 'flex', gap: 8 },
  colorPill: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
    background: 'var(--bg-3)', border: '1px solid var(--border)', borderRadius: 10,
    padding: '8px 10px', cursor: 'pointer', flex: 1,
  },
  colorInput: { width: 30, height: 30, border: 'none', borderRadius: 6, cursor: 'pointer', padding: 0, background: 'transparent' },

  // Frame selector
  framesGrid: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 },
  frameBtn: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
    padding: '12px 6px 10px', background: 'var(--bg-3)',
    border: '1.5px solid var(--border)', borderRadius: 12, cursor: 'pointer',
    transition: 'all 0.15s', fontFamily: 'var(--font)',
  },
  frameBtnActive: { border: '1.5px solid rgba(110,231,183,0.4)', background: 'var(--accent-dim)' },

  // Size selector
  sizeRow: { display: 'flex', gap: 8 },
  sizeBtn: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
    padding: '10px 0', flex: 1, background: 'var(--bg-3)',
    border: '1.5px solid var(--border)', borderRadius: 10, cursor: 'pointer',
    transition: 'all 0.15s', fontFamily: 'var(--font)', color: 'var(--text)',
  },
  sizeBtnActive: { border: '1.5px solid rgba(110,231,183,0.4)', background: 'var(--accent-dim)' },

  // Step navigation buttons
  navBack: {
    height: 40, padding: '0 18px', background: 'var(--bg-3)',
    border: '1px solid var(--border-mid)', borderRadius: 10,
    color: 'var(--text-2)', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font)',
  },
  navNext: {
    height: 40, padding: '0 22px', background: 'var(--accent)',
    border: 'none', borderRadius: 10, color: '#052e16',
    fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font)',
    transition: 'opacity 0.15s',
  },
  navDisabled: { opacity: 0.35, cursor: 'not-allowed' },

  // Preview column
  previewCol: { background: 'var(--bg)', display: 'flex', alignItems: 'stretch', overflow: 'hidden' },
  previewInner: { flex: 1, display: 'flex', flexDirection: 'column', padding: 24, gap: 16, overflow: 'hidden' },

  // Preview header
  previewTopRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  previewLabel: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.06em', textTransform: 'uppercase' },
  liveDot: { width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', animation: 'pulse-ring 2s infinite' },
  expandBtn: {
    fontSize: 12, color: 'var(--text-3)', background: 'var(--bg-3)',
    border: '1px solid var(--border)', borderRadius: 8, padding: '4px 12px',
    cursor: 'pointer', fontFamily: 'var(--font)', transition: 'color 0.15s',
  },

  // Preview canvas
  previewCanvas: {
    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'var(--bg-2)', borderRadius: 16, border: '1px solid var(--border)',
    overflow: 'auto', padding: 24,
    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)',
    backgroundSize: '24px 24px',
  },
  previewCanvasBig: { padding: 40 },

  // Export buttons
  exportRow: {
    display: 'flex', gap: 8,
  },
  expBtn: {
    display: 'flex', alignItems: 'center', gap: 6,
    height: 38, padding: '0 16px',
    background: 'var(--bg-3)', border: '1px solid var(--border-mid)',
    borderRadius: 10, color: 'var(--text-2)', fontSize: 12.5, fontWeight: 500,
    cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'var(--font)', flexShrink: 0,
  },
  expPrimary: {
    background: 'var(--accent)', border: 'none', color: '#052e16', fontWeight: 700,
  },
  // Contrast warning
  contrastWarn: {
    marginTop: -6,
    background: 'rgba(251,191,36,0.08)',
    border: '1px solid rgba(251,191,36,0.25)',
    color: 'var(--text-2)',
    padding: '10px 12px',
    borderRadius: 10,
    fontSize: 12,
    lineHeight: 1.4,
  },
  // Footer disclaimer
  footer: {
    fontSize: 11,
    color: 'var(--text-3)',
    padding: '10px 16px 14px',
    borderTop: '1px solid var(--border)',
    textAlign: 'center',
    lineHeight: 1.5,
  },
}
