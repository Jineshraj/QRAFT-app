import React from 'react'
import { styles as s } from '../styles/appStyles'

export default function Footer() {
  return (
    <footer style={s.footer}>
      Qraft is a label generation tool. We do not process, store or handle any payment transactions.
      All payments are processed by your UPI-enabled banking app.
    </footer>
  )
}
