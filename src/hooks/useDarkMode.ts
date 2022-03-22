import React, { useEffect, useState } from 'react'

export default function useDarkMode(): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [theme, setTheme] = useState(localStorage.theme || 'dark')
  const colorTheme = theme === 'dark' ? 'light' : 'dark'

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove(colorTheme)
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme, colorTheme])

  return [colorTheme, setTheme]
}
