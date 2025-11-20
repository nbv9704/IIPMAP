"use client"
import HeaderIIP from "@/layouts-iip/headers/HeaderIIP"
import FooterIIP from "@/layouts-iip/footers/FooterIIP"
import "@/styles-iip/index.scss"

export default function TestIIPPage() {
  return (
    <div className="test-iip-page" style={{ background: '#484848' }}>
      <HeaderIIP />
      
      <main style={{ 
        minHeight: 'calc(100vh - 260px)', 
        paddingTop: '80px',
        padding: '80px 20px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#484848'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ 
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '60px',
            fontWeight: 800,
            color: '#0051CB',
            margin: 0
          }}>
            Xin chào :))
          </h1>
        </div>
      </main>

      <FooterIIP />
    </div>
  )
}
