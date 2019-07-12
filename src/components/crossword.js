import React from "react"
import data from "./../data"
import styles from "./crossword.module.css"

const Crossword = () => {
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

  /* 1 Since middle letter needs to be included in total width */
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
    <div className={styles.grid}>
      {grid.map((row, rowIndex) => {
        return (
          <div className={styles.row}>
            {row.map((item, itemIndex) => {
              if (!item) return <div className={styles.placeholder}></div>

              const value = data[item[0]][item[1]]
              const vertical = value.includes("_")

              if (currentRow !== rowIndex) {
                labelIndex = itemIndex
                currentRow = rowIndex
              }

              return (
                <div className={styles.inputContainer}>
                  {labelIndex === itemIndex ? (
                    <label className={styles.label}>{rowIndex + 1}</label>
                  ) : null}
                  <input
                    id={`item-${item[0]}-${item[1]}`}
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

export default Crossword
