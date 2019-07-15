import React, { Component } from "react"
import data from "./../data"
import styles from "./crossword.module.css"

class Crossword extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  // Check if user has filled in all the required fields
  handleChange(event) {
    const valid = this._form.checkValidity()
    const { value, id } = event.target
    this.props.onChange(valid, { id, value })
  }

  render() {
    return (
      <form className={styles.grid} ref={el => (this._form = el)}>
        {data.map((row, rowIndex) => {
          return (
            <div className={styles.row} key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => {
                if (cell === "empty") {
                  return (
                    <div
                      key={`placeholder-${cellIndex}`}
                      className={styles.placeholder}
                    ></div>
                  )
                }

                let label = cell.includes("*")
                if (label) label = cell.split("*").pop()

                return (
                  <div key={`cell-${cellIndex}`} className={styles.cell}>
                    {label ? (
                      <label className={styles.label}>{label}</label>
                    ) : null}
                    <input
                      ref={el => (this[`${cell}-${rowIndex}`] = el)}
                      onChange={this.handleChange}
                      id={`${cell}-${rowIndex}`}
                      className={styles.input}
                      type="text"
                      minLength="1"
                      required
                      maxLength="1"
                      autoComplete="off"
                      pattern="^[a-öA-Ö]{1}$"
                    ></input>
                  </div>
                )
              })}
            </div>
          )
        })}
      </form>
    )
  }
}

export default Crossword
