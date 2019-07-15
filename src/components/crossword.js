import React, { Component } from "react"
import data from "./../data"
import styles from "./crossword.module.css"

class Crossword extends Component {
  constructor() {
    super()

    this.state = {
      pressed: null,
    }

    // this.handleKeyDown = this.handleKeyDown.bind(this)
    // this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  // componentDidMount() {
  //   // Center first cell on mount
  //   if (this._form && this._cell) {
  //     let parent = this._cell
  //     let offset = 0

  //     while (parent) {
  //       offset += parent.offsetLeft
  //       parent = parent.parentElement
  //     }

  //     this._form.scrollTo(offset / 2 - this._cell.offsetWidth, 0)
  //   }
  // }

  // Check if user has filled in all the required fields
  handleChange() {
    const valid = this._form.checkValidity()
    console.log(this._form)
    this.props.onChange(valid)
  }

  // handleKeyDown(event) {
  //   /* Stored pressed key to avoid buggy behaviour
  //    * whenever user hits multiple keys at the same time
  //    */
  //   this.setState({ pressed: event.key })

  //   // Prevent 'space' character
  //   if (event.key === " ") {
  //     event.preventDefault()
  //   }
  // }

  // handleKeyUp(event) {
  //   // Exit early if previous key is not yet handled
  //   if (event.key !== this.state.pressed) {
  //     return
  //   }

  //   // Focus on previous input element (if row has any previous one)
  //   if (event.key === "Backspace" && event.target.value.length === 0) {
  //     if (!event.target.id.endsWith("0")) {
  //       const previous = this.getSibling(event.target.id, "backward")
  //       this[previous].focus()
  //     }
  //   } else {
  //     if (event.key.length === 1) {
  //       const next = this.getSibling(event.target.id, "forward")
  //       if (this[next]) this[next].focus()
  //     }
  //   }
  // }

  // getSibling(id, direction) {
  //   const lastChar = parseInt(id[id.length - 1], 10)
  //   if (direction === "forward") {
  //     return id.replace(/.$/, `${lastChar + 1}`)
  //   } else if (direction === "backward") {
  //     return id.replace(/.$/, `${lastChar - 1}`)
  //   }
  // }

  render() {
    return (
      <form className={styles.grid} ref={el => (this._form = el)}>
        {data.map((row, rowIndex) => {
          return (
            <div className={styles.row} key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => {
                // Only add bottom and right border on those cells that do
                // not have an item to the right or below
                const next = data[rowIndex][cellIndex + 1]
                const prev = data[rowIndex][cellIndex - 1]
                let below
                let above
                if (data[rowIndex - 1]) above = data[rowIndex - 1][cellIndex]
                if (data[rowIndex + 1]) below = data[rowIndex + 1][cellIndex]

                if (cell === "empty") {
                  return (
                    <div
                      key={`placeholder-${cellIndex}`}
                      className={`
                      ${styles.placeholder}
                      ${(prev === "empty" || !prev) &&
                        styles.placeholderLeftBorder}
                      ${(above === "empty" || !above) &&
                        styles.placeholderTopBorder}
                        ${!next && styles.rightBorder}
                        ${!below && styles.bottomBorder}
                      `}
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
                      ref={el => (this[`input_${cell[0]}_${cell[1]}`] = el)}
                      onChange={this.handleChange}
                      id={`input_${cell[0]}_${cell[1]}`}
                      className={`
                        ${styles.input}
                        ${(!next || next === "empty") && styles.rightBorder}
                        ${(!below || below === "empty") && styles.bottomBorder}
                      `}
                      type="text"
                      minLength="1"
                      required={cell.includes("_")}
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
