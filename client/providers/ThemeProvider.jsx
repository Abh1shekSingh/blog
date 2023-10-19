
import { useTheme } from "../context/ThemeContext"
const ThemeProvider = ({children}) => {
const { theme} = useTheme()
  return (
    <div className={theme}>{children}</div>
  )
}

export default ThemeProvider