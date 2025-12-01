// ============================================
// IMPORTS
// ============================================
import { useState, useRef, useEffect, useMemo } from "react"
import { SEARCH } from "@/constants/video/config"

// ============================================
// TYPES
// ============================================
interface SearchSuggestion {
  q: string
  views?: number
}

interface UseSearchWithSuggestionsOptions {
  recentSearches: string[]
  allSuggestions: SearchSuggestion[]
  onSelect?: (query: string) => void
}

// ============================================
// HOOK: useSearchWithSuggestions
// ============================================
/**
 * Custom hook for search with recent searches and suggestions
 * Handles search state, filtering, and dropdown behavior
 * 
 * @example
 * const search = useSearchWithSuggestions({
 *   recentSearches: ['query1', 'query2'],
 *   allSuggestions: [{ q: 'suggestion1', views: 1000 }],
 *   onSelect: (query) => console.log(query)
 * })
 */
export const useSearchWithSuggestions = ({
  recentSearches,
  allSuggestions,
  onSelect,
}: UseSearchWithSuggestionsOptions) => {
  // ============================================
  // STATE & REFS
  // ============================================
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // ============================================
  // COMPUTED VALUES
  // ============================================
  
  /**
   * Filter recent searches based on query
   */
  const recentResults = useMemo(() => {
    if (!query) return recentSearches
    return recentSearches.filter((s) =>
      s.toLowerCase().includes(query.toLowerCase())
    )
  }, [query, recentSearches])

  /**
   * Filter and sort suggestions (exclude items in recent searches)
   */
  const suggestions = useMemo(() => {
    if (!query) return []
    
    const recentSet = new Set(recentSearches.map((s) => s.toLowerCase()))
    
    return allSuggestions
      .filter((item) => {
        const matchesQuery = item.q.toLowerCase().includes(query.toLowerCase())
        const notInRecent = !recentSet.has(item.q.toLowerCase())
        return matchesQuery && notInRecent
      })
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, SEARCH.MAX_SUGGESTIONS)
  }, [query, recentSearches, allSuggestions])

  /**
   * Check if dropdown should be shown
   */
  const showDropdown = isOpen && (recentResults.length > 0 || suggestions.length > 0)

  // ============================================
  // EFFECTS
  // ============================================
  
  /**
   * Close dropdown when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // ============================================
  // HANDLERS
  // ============================================
  
  /**
   * Handle search selection
   */
  const handleSelect = (value: string) => {
    setQuery(value)
    setIsOpen(false)
    onSelect?.(value)
  }

  /**
   * Highlight matching text in search results
   */
  const highlightMatch = (text: string, search: string) => {
    if (!search) return text
    
    const index = text.toLowerCase().indexOf(search.toLowerCase())
    if (index === -1) return text
    
    return {
      before: text.slice(0, index),
      match: text.slice(index, index + search.length),
      after: text.slice(index + search.length),
    }
  }

  // ============================================
  // RETURN
  // ============================================
  return {
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
  }
}
