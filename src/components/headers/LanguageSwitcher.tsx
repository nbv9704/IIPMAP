// ============================================
// CLIENT COMPONENT: Language Switcher
// ============================================
"use client"

import { useEffect, useState } from "react"
import { useLanguage, type LanguageCode } from "@/hooks/useLanguage"

// ============================================
// TYPES
// ============================================
interface Language {
  code: LanguageCode
  name: string
  flagCode: string
}

// ============================================
// COMPONENT
// ============================================
export default function LanguageSwitcher() {
  const { currentLang, setCurrentLang } = useLanguage()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const languages: Language[] = [
    { code: "vi", name: "Tiếng Việt", flagCode: "vn" },
    { code: "en", name: "English", flagCode: "us" },
    { code: "ja", name: "日本語", flagCode: "jp" },
    { code: "ko", name: "한국어", flagCode: "kr" },
    { code: "zh", name: "中文", flagCode: "cn" },
  ]

  if (!isClient) {
    return (
      <div className="language-switcher">
        <button className="lang-btn active" type="button">
          <span 
            className="flag-icon"
            style={{
              backgroundImage: `url(https://flagcdn.com/w40/vn.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '24px',
              height: '24px',
              display: 'block',
              borderRadius: '50%'
            }}
          />
        </button>
      </div>
    )
  }

  return (
    <div className="language-switcher">
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`lang-btn ${currentLang === lang.code ? 'active' : ''}`}
          onClick={() => setCurrentLang(lang.code)}
          title={lang.name}
          type="button"
        >
          <span 
            className="flag-icon"
            style={{
              backgroundImage: `url(https://flagcdn.com/w40/${lang.flagCode}.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '24px',
              height: '24px',
              display: 'block',
              borderRadius: '50%'
            }}
          />
        </button>
      ))}
    </div>
  )
}
