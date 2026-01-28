'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import styles from './editor.module.css';

// Importar o editor sem SSR
const EditorComponent = dynamic(() => import('./EditorComponent'), {
  ssr: false,
  loading: () => (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
      <p>Carregando editor...</p>
    </div>
  )
});

export default function EditorPage() {
  return (
    <Suspense fallback={
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Carregando editor...</p>
      </div>
    }>
      <EditorComponent />
    </Suspense>
  );
}
