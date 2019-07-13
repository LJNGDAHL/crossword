import React, { Component } from "react"
import data from "./../data"
import styles from "./crossword.module.css"

class Crossword extends Component {
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
                      id={`item-${cell[0]}-${cell[1]}`}
                      className={`${styles.input} ${
                        vertical ? styles.vertical : null
                      }`}
                      type="text"
                      minLength="1"
                      required={vertical}
                      maxLength="1"
                      autoComplete="off"
                      pattern="^[aA-öÖ]{1}$"
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
