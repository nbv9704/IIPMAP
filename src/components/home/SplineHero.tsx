// src/components/home/SplineHero.tsx
'use client';

import Spline from '@splinetool/react-spline';

export default function SplineHero() {
  return (
    <div
      style={{
        position: 'fixed',      // nổi trên màn hình
        bottom: '24px',         // cách đáy 24px
        right: '24px',          // cách phải 24px
        width: '120px',         // kích thước khung chatbot
        height: '120px',
        zIndex: 1000,           // nổi trên các phần tử khác
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'transparent',
      }}
    >
      <Spline scene="https://prod.spline.design/ZTmIEtUx6B3Q1j1q/scene.splinecode" />
    </div>
  );
}
