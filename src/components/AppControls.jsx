import React from 'react'
import { styles as s } from '../styles/appStyles'

export function Field({ label, hint, required, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 7 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {label}
        </label>
        {required && <span style={{ fontSize: 10, color: 'var(--accent)', opacity: 0.7 }}>required</span>}
        {hint && <span style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 'auto' }}>{hint}</span>}
      </div>
      {children}
    </div>
  )
}

export function Input({ value, onChange, placeholder, mono, valid, type = 'text', style: extra = {} }) {
  return (
    <div style={{ position: 'relative' }}>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          height: 42,
          background: 'var(--bg-3)',
          border: `1px solid ${valid === true ? 'rgba(110,231,183,0.35)' : valid === false ? 'rgba(239,68,68,0.35)' : 'var(--border-mid)'}`,
          borderRadius: 10,
          color: 'var(--text)',
          fontSize: 14,
          padding: '0 42px 0 14px',
          outline: 'none',
          fontFamily: mono ? 'var(--mono)' : 'var(--font)',
          transition: 'border-color 0.2s',
          ...extra,
        }}
        onFocus={e => e.target.style.borderColor = 'var(--border-hi)'}
        onBlur={e => e.target.style.borderColor = valid === true ? 'rgba(110,231,183,0.35)' : 'var(--border-mid)'}
      />
      {valid === true && (
        <span style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--accent)', fontSize: 14 }}>?</span>
      )}
    </div>
  )
}

export function NavButtons({ step, setStep, canNext, last }) {
  return (
    <div style={{ display: 'flex', gap: 10, marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
      {step > 0 && (
        <button style={s.navBack} onClick={() => setStep(s => s - 1)}>{'<-'} Back</button>
      )}
      {!last && (
        <button
          style={{ ...s.navNext, ...(canNext ? {} : s.navDisabled) }}
          onClick={() => canNext && setStep(s => s + 1)}
          disabled={!canNext}
        >
          Continue {'->'}
        </button>
      )}
      {last && (
        <div style={{ fontSize: 12, color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: 'var(--accent)' }}>?</span> All set -- export from the preview panel
        </div>
      )}
    </div>
  )
}

export function FrameIcon({ id, color }) {
  const c = color || 'currentColor'
  if (id === 'minimal') return <svg width="28" height="22" viewBox="0 0 28 22"><rect x="1" y="1" width="26" height="20" rx="4" fill="none" stroke={c} strokeWidth="1.5"/></svg>
  if (id === 'bordered') return <svg width="28" height="22" viewBox="0 0 28 22"><rect x="1" y="1" width="26" height="20" rx="4" fill="none" stroke={c} strokeWidth="3.5"/></svg>
  if (id === 'badge') return <svg width="28" height="22" viewBox="0 0 28 22"><rect x="1" y="1" width="26" height="20" rx="4" fill="none" stroke={c} strokeWidth="1.5"/><rect x="1" y="1" width="26" height="8" rx="4" fill={c} opacity="0.3"/></svg>
  if (id === 'receipt') return <svg width="28" height="22" viewBox="0 0 28 22"><rect x="1" y="1" width="26" height="20" rx="3" fill="none" stroke={c} strokeWidth="1.5" strokeDasharray="4 2.5"/></svg>
  return null
}

export function Spinner() {
  return <div style={{ width: 13, height: 13, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }}/>
}

export function DownIcon()  { return <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 16l-5-5h3V4h4v7h3l-5 5zm-7 4v-2h14v2H5z"/></svg> }
export function PrintIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg> }
export function ShareIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg> }
