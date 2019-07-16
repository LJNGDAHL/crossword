import React from "react"

import styles from "./message.module.css"

const Message = ({ title, body }) => (
  <div className={styles.container}>
    <h1 className={styles.title}>{title}</h1>
    <p className={styles.text}>{body}</p>
  </div>
)

export default Message
