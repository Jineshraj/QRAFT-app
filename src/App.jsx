import React, { useState, useRef, useEffect } from 'react'
import { useGeneratorState } from './hooks/useGeneratorState'
import { buildUPIString, encodeShareParams, formatINR } from './utils/upi'
import { downloadPNG, downloadJPG, printLabel } from './utils/export'
import { contrastRatio } from './utils/contrast'
import QRLabel from './components/QRLabel'
import TopBar from './components/TopBar'
import Footer from './components/Footer'
import ContrastWarning from './components/ContrastWarning'
import { Field, Input, NavButtons, FrameIcon, Spinner, DownIcon, PrintIcon, ShareIcon } from './components/AppControls'
import { PRESETS, FRAMES, SIZES, STEPS } from './constants/appConfig'
import { styles as s } from './styles/appStyles'

export default function App() {
  const { state, update, updateMany, reset } = useGeneratorState()
  const [step, setStep] = useState(0)
  const [exporting, setExporting] = useState(false)
  const [shareMsg, setShareMsg] = useState('')
  const [previewBig, setPreviewBig] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isNarrow, setIsNarrow] = useState(false)
  const logoRef = useRef()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(max-width: 980px)')
    const mqN = window.matchMedia('(max-width: 640px)')
    const updateMq = () => {
      setIsMobile(mq.matches)
      setIsNarrow(mqN.matches)
    }
    updateMq()
    if (mq.addEventListener) {
      mq.addEventListener('change', updateMq)
      mqN.addEventListener('change', updateMq)
      return () => {
        mq.removeEventListener('change', updateMq)
        mqN.removeEventListener('change', updateMq)
      }
    }
    mq.addListener(updateMq)
    mqN.addListener(updateMq)
    return () => {
      mq.removeListener(updateMq)
      mqN.removeListener(updateMq)
    }
  }, [])

  function handleLogo(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => update('logoDataUrl', ev.target.result)
    reader.readAsDataURL(file)
  }

  async function handleExport(fn) {
    setExporting(true)
    try { await fn() } finally { setExporting(false) }
  }

  function handleShare() {
    const params = encodeShareParams(state)
    const url = `${window.location.origin}${window.location.pathname}?${params}`
    navigator.clipboard.writeText(url)
      .then(() => { setShareMsg('Copied!'); setTimeout(() => setShareMsg(''), 2200) })
      .catch(() => { setShareMsg('Failed'); setTimeout(() => setShareMsg(''), 2000) })
  }

  const upiStr = buildUPIString(state)
  const isUPIValid = state.upiId.includes('@') && state.payee.length > 0
  const qrContrast = contrastRatio(state.qrColor, '#ffffff')
  const isQrContrastLow = qrContrast < 3
  const rootStyle = isMobile ? { ...s.root, height: 'auto', minHeight: '100dvh', overflow: 'auto' } : s.root
  const topbarStyle = isMobile
    ? { ...s.topbar, height: 'auto', padding: '12px 14px', flexDirection: 'column', alignItems: 'stretch', rowGap: 10 }
    : s.topbar
  const brandStyle = isMobile ? { ...s.brand, order: 1, width: '100%', justifyContent: 'space-between' } : s.brand
  const stepsStyle = isMobile
    ? { ...s.steps, order: 2, width: '100%', justifyContent: 'flex-start', overflowX: 'auto', paddingBottom: 4, flex: 'none' }
    : s.steps
  const resetStyle = isMobile ? { ...s.resetBtn, alignSelf: 'center' } : s.resetBtn
  const layoutStyle = isMobile ? { ...s.layout, gridTemplateColumns: '1fr', gridTemplateRows: 'auto auto', overflow: 'visible' } : s.layout
  const formColStyle = isMobile ? { ...s.formCol, borderRight: 'none', borderBottom: '1px solid var(--border)' } : s.formCol
  const formScrollStyle = isMobile ? { ...s.formScroll, overflowY: 'visible' } : s.formScroll
  const stepPanelStyle = isNarrow ? { ...s.stepPanel, padding: '20px 16px 32px' } : s.stepPanel
  const stepTitleStyle = isNarrow ? { ...s.stepTitle, fontSize: 20 } : s.stepTitle
  const previewInnerStyle = isNarrow ? { ...s.previewInner, padding: 16 } : s.previewInner
  const previewCanvasStyle = {
    ...s.previewCanvas,
    ...(previewBig ? s.previewCanvasBig : {}),
    ...(isMobile ? { padding: previewBig ? 22 : 16 } : {}),
  }
  const exportRowStyle = isNarrow ? { ...s.exportRow, flexWrap: 'wrap' } : s.exportRow
  const expBtnStyle = isNarrow ? { ...s.expBtn, flex: '1 1 calc(50% - 8px)', justifyContent: 'center' } : s.expBtn
  const expPrimaryStyle = isNarrow ? { ...s.expPrimary, flex: '1 1 calc(50% - 8px)', justifyContent: 'center' } : s.expPrimary
  const stepBtnStyle = isNarrow ? { ...s.stepBtn, padding: '6px 12px', fontSize: 12, minWidth: 88 } : s.stepBtn

  return (
    <div style={rootStyle}>
      <TopBar
        step={step}
        setStep={setStep}
        reset={reset}
        steps={STEPS}
        stepBtnStyle={stepBtnStyle}
        stepsStyle={stepsStyle}
        brandStyle={brandStyle}
        resetStyle={resetStyle}
        topbarStyle={topbarStyle}
      />

      <div style={layoutStyle}>
        <div style={formColStyle}>
          <div style={formScrollStyle}>
            {step === 0 && (
              <div style={stepPanelStyle}>
                <div style={s.stepHeader}>
                  <h2 style={stepTitleStyle}>Payment Details</h2>
                  <p style={s.stepSub}>Your UPI info that gets encoded into the QR</p>
                </div>

                <Field label="UPI ID" hint="e.g. name@okicici" required>
                  <Input
                    value={state.upiId}
                    onChange={v => update('upiId', v)}
                    placeholder="yourname@upi"
                    mono
                    valid={state.upiId.includes('@')}
                  />
                </Field>

                <Field label="Payee Name" required>
                  <Input value={state.payee} onChange={v => update('payee', v)} placeholder="Your name or business"/>
                </Field>

                <Field label="Fixed Amount" hint="Leave blank to let payer enter amount">
                  <div style={{ position: 'relative' }}>
                    <span style={s.rupeePrefix}>?</span>
                    <Input value={state.amount} onChange={v => update('amount', v)} placeholder="0.00" type="number" style={{ paddingLeft: 32 }}/>
                  </div>
                </Field>

                <Field label="Payment Note" hint="Shown to payer on UPI app">
                  <Input value={state.note} onChange={v => update('note', v)} placeholder="e.g. Thanks for your order!"/>
                </Field>

                {isUPIValid && (
                  <div style={s.upiPill}>
                    <span style={s.upiPillDot}/>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', wordBreak: 'break-all' }}>
                      {upiStr.slice(0, 72)}{upiStr.length > 72 ? '...' : ''}
                    </span>
                  </div>
                )}

                <NavButtons step={step} setStep={setStep} canNext={isUPIValid}/>
              </div>
            )}

            {step === 1 && (
              <div style={stepPanelStyle}>
                <div style={s.stepHeader}>
                  <h2 style={stepTitleStyle}>Branding</h2>
                  <p style={s.stepSub}>Add your business identity to the label</p>
                </div>

                <Field label="Business Name">
                  <Input value={state.bizName} onChange={v => update('bizName', v)} placeholder="Your shop or brand"/>
                </Field>

                <Field label="Tagline" hint="Short - punchy - optional">
                  <Input value={state.tagline} onChange={v => update('tagline', v)} placeholder="Fresh - Local - Trusted"/>
                </Field>

                <Field label="Logo">
                  <div style={s.logoArea}>
                    {state.logoDataUrl
                      ? (
                        <div style={s.logoPreviewWrap}>
                          <img src={state.logoDataUrl} style={s.logoImg} alt="logo"/>
                          <div style={s.logoMeta}>
                            <span style={{ color: 'var(--text)', fontSize: 13 }}>Logo uploaded</span>
                            <button style={s.removeBtn} onClick={() => update('logoDataUrl', null)}>Remove</button>
                          </div>
                        </div>
                      ) : (
                        <button style={s.uploadZone} onClick={() => logoRef.current.click()}>
                          <span style={{ fontSize: 28, opacity: 0.4 }}>+</span>
                          <span style={{ fontSize: 13, color: 'var(--text-2)' }}>Click to upload PNG / JPG</span>
                          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>Best: square, transparent bg</span>
                        </button>
                      )
                    }
                    <input ref={logoRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleLogo}/>
                  </div>
                </Field>

                <NavButtons step={step} setStep={setStep} canNext={true}/>
              </div>
            )}

            {step === 2 && (
              <div style={stepPanelStyle}>
                <div style={s.stepHeader}>
                  <h2 style={stepTitleStyle}>Design</h2>
                  <p style={s.stepSub}>Colours, frame style and label size</p>
                </div>

                <Field label="Colour Theme">
                  <div style={s.presetsGrid}>
                    {PRESETS.map(p => (
                      <button
                        key={p.name}
                        style={{ ...s.presetDot, background: p.primary, ...(state.primaryColor === p.primary ? s.presetActive : {}) }}
                        onClick={() => updateMany({ primaryColor: p.primary, bgColor: p.bg, textColor: p.text, qrColor: p.qr })}
                        title={p.name}
                      />
                    ))}
                  </div>
                </Field>

                <Field label="Custom Colours">
                  <div style={s.colorRow}>
                    {[
                      { key: 'primaryColor', label: 'Accent' },
                      { key: 'bgColor',      label: 'Background' },
                      { key: 'textColor',    label: 'Text' },
                      { key: 'qrColor',      label: 'QR' },
                    ].map(({ key, label }) => (
                      <label key={key} style={s.colorPill} title={label}>
                        <input type="color" value={state[key]} onChange={e => update(key, e.target.value)} style={s.colorInput}/>
                        <span style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{label}</span>
                      </label>
                    ))}
                  </div>
                </Field>

                <ContrastWarning show={isQrContrastLow} />

                <Field label="Frame Style">
                  <div style={s.framesGrid}>
                    {FRAMES.map(f => (
                      <button
                        key={f.id}
                        style={{ ...s.frameBtn, ...(state.frame === f.id ? s.frameBtnActive : {}) }}
                        onClick={() => update('frame', f.id)}
                      >
                        <FrameIcon id={f.id} color={state.frame === f.id ? 'var(--accent)' : 'var(--text-3)'}/>
                        <span style={{ fontSize: 12, fontWeight: 500, color: state.frame === f.id ? 'var(--accent)' : 'var(--text)' }}>{f.label}</span>
                        <span style={{ fontSize: 10, color: 'var(--text-3)' }}>{f.desc}</span>
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Label Size">
                  <div style={s.sizeRow}>
                    {SIZES.map(sz => (
                      <button
                        key={sz.id}
                        style={{ ...s.sizeBtn, ...(state.size === sz.id ? s.sizeBtnActive : {}) }}
                        onClick={() => update('size', sz.id)}
                      >
                        <span style={{ fontSize: 16, fontWeight: 700 }}>{sz.label}</span>
                        <span style={{ fontSize: 9, color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>{sz.w}px</span>
                      </button>
                    ))}
                  </div>
                </Field>

                <NavButtons step={step} setStep={setStep} canNext={true} last/>
              </div>
            )}
          </div>
        </div>

        <div style={s.previewCol}>
          <div style={previewInnerStyle}>
            <div style={s.previewTopRow}>
              <span style={s.previewLabel}>
                <span style={s.liveDot}/>
                Live preview
              </span>
              <button style={s.expandBtn} onClick={() => setPreviewBig(b => !b)}>
                {previewBig ? 'Fit' : 'Expand'}
              </button>
            </div>

            <div style={previewCanvasStyle}>
              <QRLabel state={state}/>
            </div>

            <div style={exportRowStyle}>
              <button style={{ ...expBtnStyle, ...expPrimaryStyle }} onClick={() => handleExport(downloadPNG)} disabled={exporting}>
                {exporting ? <Spinner/> : <DownIcon/>}
                PNG
              </button>
              <button style={expBtnStyle} onClick={() => handleExport(downloadJPG)} disabled={exporting}>
                <DownIcon/> JPG
              </button>
              <button style={expBtnStyle} onClick={printLabel}>
                <PrintIcon/> Print
              </button>
              <button style={expBtnStyle} onClick={handleShare}>
                <ShareIcon/>
                {shareMsg || 'Share'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
