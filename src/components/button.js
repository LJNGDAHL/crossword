import React from "react"

import styles from "./button.module.css"
import Spinner from "./spinner"

const Button = ({ type, label, loading, disabled }) => (
  <button className={styles.button} type={type} disabled={disabled}>
    {loading ? <Spinner /> : label}
  </button>
)

export default Button
