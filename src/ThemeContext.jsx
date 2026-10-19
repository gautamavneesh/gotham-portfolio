import { createContext, useContext, useState, useCallback } from 'react'

const Ctx = createContext({ theme: 'modern', enterBatman: () => {}, exitBatman: () => {} })
export const useTheme = () => useContext(Ctx)

export function ThemeProvider({ children }) {
  const [theme, setTheme]           = useState('modern')
  const [booting, setBooting]       = useState(false)

  const enterBatman = useCallback(() => setBooting(true), [])

  const onBootComplete = useCallback(() => {
    setTheme('batman')
    setBooting(false)
  }, [])

  const exitBatman = useCallback(() => {
    setTheme('modern')
  }, [])

  return (
    <Ctx.Provider value={{ theme, booting, enterBatman, onBootComplete, exitBatman }}>
      {children}
    </Ctx.Provider>
  )
}
