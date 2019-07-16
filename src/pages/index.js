import React, { Component } from "react"
import smoothscroll from "smoothscroll-polyfill"

import Layout from "../components/layout"
import Head from "../components/head"
import Crossword from "../components/crossword"
import SubmitForm from "../components/form"

class Main extends Component {
  constructor() {
    super()

    this.state = {
      valid: false,
      submitted: false,
      solution: [],
    }

    this.handleChange = this.handleChange.bind(this)
    this.onValid = this.onValid.bind(this)
  }

  /* Loop through all stored items and store them in state
   * if they are part of the solution
   */
  componentDidMount() {
    smoothscroll.polyfill()
    const solution = []

    for (let key in window.localStorage) {
      if (key.includes("main")) {
        const index = key.split("-").pop()
        solution.push({ index, value: window.localStorage[key] })
      }
    }

    this.setState({ solution })
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.valid && this.state.valid) {
      window.setTimeout(() => {
        if (this._form)
          this._form.scrollIntoView({ block: "start", behavior: "smooth" })
      }, 190)
    }

    if (!prevState.submitted && this.state.submitted) {
      window.setTimeout(() => {
        if (this._container)
          this._container.scrollIntoView({ block: "start", behavior: "smooth" })
      }, 2500)
    }
  }

  onValid() {
    this.setState({ valid: true })
  }

  handleChange(id, value, name) {
    // Store everything in local storage
    if (value === "") {
      window.localStorage.removeItem(name)
    } else {
      window.localStorage.setItem(name, value)
    }

    if (id.includes("main")) {
      const clone = this.state.solution.slice()
      const current = id.split("-").pop()
      const index = clone.findIndex(el => el.index === current)

      if (index === -1) {
        clone.push({ index: current, value })
      } else {
        if (value === "") {
          clone.splice(index, 1)
        } else {
          clone[index].value = value
        }
      }
      this.setState({ solution: clone })
    }
  }

  handleSubmit(event) {
    this.setState({ loading: true })
    event.preventDefault()
    const str = this.state.solution
      .sort((a, b) => (b.index - a.index) * -1)
      .reduce((acc, current) => (acc += current.value), "")

    const data = new FormData(event.target)

    data.set(process.env.SOLUTION_FIELD, str.toUpperCase())
    data.set(process.env.TIE_FIELD, data.get("tie"))
    data.set(process.env.NAME_FIELD, data.get("name"))
    data.set(process.env.EMAIL_FIELD, data.get("email"))
    data.set(process.env.PHONE_FIELD, data.get("phone"))

    fetch(process.env.FORM_URL, {
      method: "POST",
      mode: "no-cors",
      body: data,
    }).then(() => {
      this.setState({ submitted: true, loading: false })
      window.localStorage.clear()
    })
  }

  render() {
    return (
      <div ref={el => (this._container = el)}>
        <Layout>
          <Head title="Schlagerord-flätan" />
          <Crossword onChange={this.handleChange} onValid={this.onValid} />
        </Layout>
        {this.state.valid ? (
          <div ref={el => (this._form = el)}>
            <SubmitForm
              submitted={this.state.submitted}
              loading={this.state.loading}
              onInput={this.handleInput}
              handleSubmit={event => this.handleSubmit(event)}
            />
          </div>
        ) : null}
      </div>
    )
  }
}

export default Main
