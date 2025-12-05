"use client"

// ============================================
// IMPORTS
// ============================================
import { useSearchWithSuggestions } from "@/hooks/video/useSearchWithSuggestions"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"

// ============================================
// CONSTANTS
// ============================================
const EXPLORE_RECENT = ["siuuu", "ronaldo", "messi", "@abc"]
const EXPLORE_ALL = [
  { q: "việt nam", views: 50000 },
  { q: "video hot", views: 35000 },
  { q: "vua", views: 15000 },
  { q: "văn hóa", views: 12000 },
  { q: "vui vẻ", views: 8000 },
  { q: "@abc", views: 20000 },
  { q: "@vietnam", views: 18000 },
  { q: "@abcd", views: 5000 },
  { q: "@abce", views: 3000 },
]

// ============================================
// COMPONENT
// ============================================
const ExploreSearchBar = () => {
  const { currentLang } = useLanguage()
  const {
    query,
    setQuery,
    isOpen,
    setIsOpen,
    containerRef,
    recentResults,
    suggestions,
    showDropdown,
    handleSelect,
    highlightMatch,
  } = useSearchWithSuggestions({
    recentSearches: EXPLORE_RECENT,
    allSuggestions: EXPLORE_ALL.map((item) => ({ q: item.q, views: item.views })),
  })

  return (
    <div className="vex-search" ref={containerRef}>
      <div className={`vex-search__container ${showDropdown ? "open" : ""}`}>
        <div className="vex-search__input-wrapper">
          <input
            type="text"
            className="vex-search__input"
            placeholder={getTranslation(currentLang, "video.searchPlaceholder")}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
          />
          <button type="button" className="vex-search__btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
              <line
                x1="13.5"
                y1="13.5"
                x2="18"
                y2="18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {showDropdown && (
          <>
            <div className="vex-search__divider-line" />
            <div className="vex-search__dropdown">
              {recentResults.length > 0 && (
                <div className="vex-search__section">
                  <div className="vex-search__label">{getTranslation(currentLang, "video.recentSearches")}</div>
                  {recentResults.map((q, i) => {
                    const highlighted = highlightMatch(q, query)
                    return (
                      <button
                        key={i}
                        className="vex-search__item"
                        onClick={() => handleSelect(q)}
                      >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <circle
                            cx="9"
                            cy="9"
                            r="7"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M9 5V9L12 11"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span>
                          {typeof highlighted === "string" ? (
                            highlighted
                          ) : (
                            <>
                              {highlighted.before}
                              <strong>{highlighted.match}</strong>
                              {highlighted.after}
                            </>
                          )}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}

              {suggestions.length > 0 && (
                <div className="vex-search__section">
                  {recentResults.length > 0 && <div className="vex-search__divider" />}
                  <div className="vex-search__label">{getTranslation(currentLang, "video.suggestions")}</div>
                  {suggestions.map((item, i) => {
                    const highlighted = highlightMatch(item.q, query)
                    return (
                      <button
                        key={i}
                        className="vex-search__item"
                        onClick={() => handleSelect(item.q)}
                      >
                        {item.q.startsWith("@") ? (
                          <div className="vex-search__avatar">
                            {item.q.charAt(1).toUpperCase()}
                          </div>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <circle
                              cx="9"
                              cy="9"
                              r="6"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                            <line
                              x1="13"
                              y1="13"
                              x2="17"
                              y2="17"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                        <span>
                          {typeof highlighted === "string" ? (
                            highlighted
                          ) : (
                            <>
                              {highlighted.before}
                              <strong>{highlighted.match}</strong>
                              {highlighted.after}
                            </>
                          )}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ExploreSearchBar
