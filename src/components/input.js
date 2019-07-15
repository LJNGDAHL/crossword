import React from "react"

import styles from "./input.module.css"

const Input = ({ name, type, label, submitted }) => (
  <div className={styles.container}>
    <input
      disabled={submitted}
      className={`${styles.input} ${submitted && styles.submitted}`}
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
