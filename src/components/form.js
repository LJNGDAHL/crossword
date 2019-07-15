import React from "react"
import styles from "./form.module.css"

import Input from "./input"
import Button from "./button"

const SubmitForm = ({ handleSubmit, loading, submitted }) => {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.content}>
        <h2 className={styles.title}>Skicka in ditt svar</h2>
        <Input
          submitted={submitted}
          name="tie"
          label="Svar på utslagsfråga"
          type="text"
        />
        <Input submitted={submitted} name="name" label="Namn" type="text" />
        <Input
          submitted={submitted}
          name="email"
          label="E-postadress"
          type="email"
        />
        <Input
          submitted={submitted}
          name="phone"
          label="Telefonnummer"
          type="tel"
        />
        <Button
          type="submit"
          label={submitted ? "Skickat." : "Skicka"}
          loading={loading}
          disabled={submitted}
        />
        {submitted ? (
          <div className={styles.message}>
            <p>Ditt svar är inskickat. Tack!</p>
          </div>
        ) : null}
      </div>
    </form>
  )
}

export default SubmitForm
