import React from "react"

import styles from "./input.module.css"

const Input = ({ name, type, label }) => (
  <div className={styles.container}>
    <input
      className={styles.input}
      type={type}
      id={name}
      name={name}
      required
    />
    <label className={styles.label} htmlFor={name}>
      {label}
    </label>
  </div>
)

export default Input
