"use client"
import { useState } from "react"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"
import { HiOutlinePaperClip, HiSparkles, HiMicrophone } from "react-icons/hi2"

function AISearchSection() {
  const { currentLang } = useLanguage()
  const [searchValue, setSearchValue] = useState("")

  const aiPrompts = [
    getTranslation(currentLang, 'home.aiPrompts.recent'),
    getTranslation(currentLang, 'home.aiPrompts.components'),
    getTranslation(currentLang, 'home.aiPrompts.price'),
  ]

  return (
    <section className="ai-search-section">
      <h2>IIPMap.AI</h2>
      <div className="ai-search-bar">
        <button className="ai-attach-btn" aria-label="Attach files"><HiOutlinePaperClip /></button>
        <div className="ai-search-input">
          <input 
            placeholder={getTranslation(currentLang, 'home.search.placeholder')} 
            value={searchValue} 
            onChange={(e) => setSearchValue(e.target.value)} 
          />
          <button className="ai-voice-btn" aria-label="Voice input"><HiMicrophone /></button>
        </div>
        <button className="ai-search-btn"><HiSparkles /> Angel AI</button>
      </div>
      <div className="search-prompts">
        {aiPrompts.map((prompt) => (
          <button 
            type="button" 
            key={prompt} 
            className="prompt-card" 
            onClick={() => setSearchValue(prompt)}
          >
            {prompt}
          </button>
        ))}
      </div>
    </section>
  )
}

export default AISearchSection
