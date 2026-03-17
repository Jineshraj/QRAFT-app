import React from 'react'
import { styles as s } from '../styles/appStyles'

export default function TopBar({ step, setStep, reset, steps, stepBtnStyle, stepsStyle, brandStyle, resetStyle, topbarStyle }) {
  return (
    <header style={topbarStyle}>
      <div style={brandStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={s.brandIcon}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="9" height="9" rx="2" fill="white" opacity="0.9"/>
              <rect x="13" y="2" width="9" height="9" rx="2" fill="white" opacity="0.6"/>
              <rect x="2" y="13" width="9" height="9" rx="2" fill="white" opacity="0.6"/>
              <rect x="15" y="15" width="5" height="5" rx="1.5" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <span style={s.brandName}>QRAFT</span>
          <span style={s.brandPill}>v2</span>
        </div>
        <button style={resetStyle} onClick={reset}>Reset</button>
      </div>

      <div style={stepsStyle}>
        {steps.map((st, i) => {
          const isActive = i === step
          const isVisited = i < step
          const statusStyle = isActive ? s.stepActive : isVisited ? s.stepDone : {}
          return (
            <button
              key={st.id}
              style={{ ...stepBtnStyle, ...statusStyle }}
              onClick={() => setStep(i)}
            >
              <span style={{ fontSize: 11 }}>{st.icon}</span>
              {st.label}
            </button>
          )
        })}
      </div>
    </header>
  )
}
