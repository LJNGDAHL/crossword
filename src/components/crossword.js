import React, { Component } from "react"
import data from "./../data"
import styles from "./crossword.module.css"

class Crossword extends Component {
  constructor() {
    super()

    this.state = {
      pressed: null,
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  componentDidMount() {
    // Center first cell on mount
    if (this._grid && this._cell) {
      let parent = this._cell
      let offset = 0

      while (parent) {
        offset += parent.offsetLeft
        parent = parent.parentElement
      }

      this._grid.scrollTo(offset / 2 - this._cell.offsetWidth, 0)
    }
  }

  handleKeyDown(event) {
    /* Stored pressed key to avoid buggy behaviour
     * whenever user hits multiple keys at the same time
     */
    this.setState({ pressed: event.key })

    // Prevent 'space' character
    if (event.key === " ") {
      event.preventDefault()
    }
  }

  handleKeyUp(event) {
    // Exit early if previous key is not yet handled
    if (event.key !== this.state.pressed) {
      return
    }

    // Focus on previous input element (if row has any previous one)
    if (event.key === "Backspace" && event.target.value.length === 0) {
      if (!event.target.id.endsWith("0")) {
        const previous = this.getSibling(event.target.id, "backward")
        this[previous].focus()
      }
    } else {
      if (event.key.length === 1) {
        const next = this.getSibling(event.target.id, "forward")
        if (this[next]) this[next].focus()
      }
    }
  }

  getSibling(id, direction) {
    const lastChar = parseInt(id[id.length - 1], 10)
    if (direction === "forward") {
      return id.replace(/.$/, `${lastChar + 1}`)
    } else if (direction === "backward") {
      return id.replace(/.$/, `${lastChar - 1}`)
    }
  }

  render() {
    const height = data.length

    let left = 0
    let right = 0

    const grid = []

    for (let i = 0; i < height; i++) {
      grid[i] = []
      const index = data[i].findIndex(item => item.includes("_"))
      const after = data[i].length - index

      if (left < index) left = index
      if (right < after) right = after
    }

    const width = left + right

    grid.forEach((row, rowIndex) => {
      const index = data[rowIndex].findIndex(item => item.includes("_"))
      const wordLength = data[rowIndex].length

      let leftStart
      let diff

      for (let i = 0; i < width; i++) {
        if (i < left - index || i > left - index + wordLength - 1) {
          row[i] = null
        } else {
          /* Store difference between left and first letter's index */
          if (i - left < 0 && !leftStart) {
            leftStart = true
            diff = left - i
          }

          if (leftStart) row[i] = [rowIndex, i - left + diff]
          else row[i] = [rowIndex, i - left]
        }
      }
    })

    let labelIndex
    let currentRow

    return (
      <div className={styles.grid} ref={el => (this._grid = el)}>
        {grid.map((row, rowIndex) => {
          return (
            <div className={styles.row} key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => {
                if (!cell)
                  return (
                    <div
                      key={`placeholder-${cellIndex}`}
                      className={styles.placeholder}
                    ></div>
                  )

                const value = data[cell[0]][cell[1]]
                const vertical = value.includes("_")

                if (currentRow !== rowIndex) {
                  labelIndex = cellIndex
                  currentRow = rowIndex
                }

                return (
                  <div
                    key={`cell-${cellIndex}`}
                    className={styles.cell}
                    ref={el => (!this._cell ? (this._cell = el) : null)}
                  >
                    {labelIndex === cellIndex ? (
                      <label className={styles.label}>{rowIndex + 1}</label>
                    ) : null}
                    <input
                      ref={el => (this[`input_${cell[0]}_${cell[1]}`] = el)}
                      onChange={this.handleChange}
                      id={`input_${cell[0]}_${cell[1]}`}
                      className={`${styles.input} ${
                        vertical ? styles.vertical : null
                      }`}
                      type="text"
                      onKeyDown={this.handleKeyDown}
                      onKeyUp={this.handleKeyUp}
                      minLength="1"
                      required={vertical}
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
      </div>
    )
  }
}

export default Crossword
