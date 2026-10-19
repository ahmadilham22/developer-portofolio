'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog } from '@base-ui/react/dialog'
import { ArrowUpRight, Maximize2, X, ZoomIn, ZoomOut } from 'lucide-react'
import styles from './portfolio.module.css'

export function ProjectScreenshot({ src, title }: { src: string; title: string }) {
  const [zoomed, setZoomed] = useState(false)

  return (
    <Dialog.Root onOpenChange={(open) => { if (!open) setZoomed(false) }}>
      <figure className={styles.screenshotFigure}>
        <Dialog.Trigger className={styles.screenshotTrigger} aria-label={`Enlarge ${title} screenshot`}>
          <Image src={src} alt={`${title} screenshot`} fill priority sizes="(max-width: 1088px) 100vw, 1024px" className={styles.caseScreenshot} />
          <span className={styles.enlargeIcon} title="Enlarge screenshot"><Maximize2 size={17} aria-hidden="true" /></span>
        </Dialog.Trigger>
        <figcaption><span>{title}</span><span>Project preview</span></figcaption>
      </figure>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.imageBackdrop} />
        <Dialog.Popup className={styles.imageDialog}>
          <div className={styles.imageToolbar}>
            <Dialog.Title className={styles.imageDialogTitle}>{title}</Dialog.Title>
            <div className={styles.imageTools}>
              <button type="button" onClick={() => setZoomed(!zoomed)} aria-label={zoomed ? 'Fit image to window' : 'Zoom in'} title={zoomed ? 'Fit image to window' : 'Zoom in'} aria-pressed={zoomed}>
                {zoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
              </button>
              <a href={src} target="_blank" rel="noopener noreferrer" aria-label="Open original image in a new tab" title="Open original image"><ArrowUpRight size={18} /></a>
              <Dialog.Close aria-label="Close screenshot" title="Close screenshot"><X size={19} /></Dialog.Close>
            </div>
          </div>
          <Dialog.Description className={styles.srOnly}>Screenshot of {title}.</Dialog.Description>
          <div className={styles.imageViewport}>
            <div className={`${styles.dialogImage} ${zoomed ? styles.dialogImageZoomed : ''}`}>
              <Image src={src} alt={`${title} screenshot enlarged`} fill sizes="100vw" className={styles.caseScreenshot} />
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
