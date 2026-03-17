import React from 'react'
import { styles as s } from '../styles/appStyles'

export default function ContrastWarning({ show }) {
  if (!show) return null
  return (
    <div style={s.contrastWarn}>
      <strong style={{ color: '#fbbf24' }}>Low contrast:</strong>{' '}
      QR color is too close to white, so the code may be hard to scan. Try a darker QR color.
    </div>
  )
}
