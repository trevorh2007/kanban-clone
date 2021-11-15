import React, { useContext } from "react"
import { ThemeContext } from "../../utilities/ThemeContext"
import "./theme-button.scss"
import { BsSun, BsMoon } from 'react-icons/bs'

export default function ThemeButton() {
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode

    const onClick = () => {
        if (darkMode) {
            theme.dispatch({ type: "LIGHTMODE" })
        } else {
            theme.dispatch({ type: "DARKMODE" })
        }
    }

    return (
        <button className={`btn ${darkMode ? "btn-dark" : "btn-light"}`} onClick={onClick}>
            {darkMode ? <BsSun /> : <BsMoon />}
        </button>
    )
}