import React from "react"
import styles from "./form.module.css"

import Input from "./input"
import Button from "./button"

const SubmitForm = ({ handleSubmit, loading, submitted }) => {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={`${styles.content} ${submitted && styles.hidden}`}>
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
        <p className={styles.details}>
          Ditt inskickade svar används enbart för att rätta tävlingen och
          kontaktuppgifterna används enbart för att vi ska kunna kontakta
          vinnaren som utses. Uppgifterna hanteras av Malmö Pride och raderas
          permanent efter 30 dagar. Informationen delas inte till extern part.
        </p>
      </div>
      {submitted ? (
        <div className={styles.message}>
          <p className={styles.text}>Ditt svar är inskickat. Tack!</p>
        </div>
      ) : null}
    </form>
  )
}

export default SubmitForm
