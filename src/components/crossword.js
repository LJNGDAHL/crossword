import React, { Component } from "react"
import data from "./../data"
import styles from "./crossword.module.css"

class Crossword extends Component {
  constructor() {
    super()
    this.state = {
      resource: {},
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  // Ignore spaces since this is not a valid value
  handleKeyDown(event) {
    if (event.key === " ") {
      event.preventDefault()
    }
  }

  // Check validity on mount, since it can be prepopulated from local storage
  componentDidMount() {
    const valid = this._form.checkValidity()
    if (valid) this.props.onValid()

    if (window.localStorage) {
      this.setState({ resource: { ...window.localStorage } })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.resource !== this.state.resource) {
      if (this._form) {
        const valid = this._form.checkValidity()
        if (valid) this.props.onValid()
      }
    }
  }

  handleChange(event) {
    /* Since some android browsers ignores if event has been prevented by
     * `handleKeyDown`, exit early as an extra safety measure. Also, remove any
     * extra characters since some browsers handles maxlength in a weird way
     * (more information: https://caniuse.com/#search=maxlength)
     */
    let { value } = event.target
    if (value === " ") return
    if (value.length > 1) value = value.charAt(0)

    // Check if user has filled in all the required fields
    const valid = this._form.checkValidity()
    if (valid) this.props.onValid()

    const clone = { ...this.state.resource }
    const { id, name } = event.target

    if (value === "") {
      delete clone[name]
    } else {
      clone[name] = value
    }

    this.setState({ resource: clone })
    this.props.onChange(id, value, name)
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

                const placement = `${cellIndex}-${rowIndex}`
                const name = cell.includes("_")
                  ? `mainInput_${placement}`
                  : `input_${placement}`

                return (
                  <div key={`cell-${cellIndex}`} className={styles.cell}>
                    {label ? (
                      <label className={styles.label}>{label}</label>
                    ) : null}
                    <input
                      onKeyDown={this.handleKeyDown}
                      onChange={this.handleChange}
                      id={name}
                      name={name}
                      className={styles.input}
                      type="text"
                      minLength="1"
                      required
                      value={this.state.resource[name] || ""}
                      maxLength="1"
                      autoComplete="off"
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
