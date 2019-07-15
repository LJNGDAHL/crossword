import React, { Component } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Crossword from "../components/crossword"
import SubmitForm from "../components/form"

class Main extends Component {
  constructor() {
    super()

    this.state = {
      filled: false,
      submitted: false,
      solution: [],
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.filled && this.state.filled) {
      window.setTimeout(() => {
        if (this._form) {
          this._form.scrollIntoView({ block: "start", behavior: "smooth" })
        }
      }, 190)
    }
  }

  handleChange(valid, { id, value }) {
    const clone = this.state.solution.slice()
    if (id.includes("_")) {
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
    }

    if (valid) {
      this.setState({ solution: clone, filled: valid })
    } else {
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
    }).then(() => this.setState({ submitted: true, loading: false }))
  }

  render() {
    return (
      <Layout>
        <SEO title="Schlagerord-flätan" />
        <Crossword onChange={this.handleChange} />
        {this.state.filled ? (
          <div ref={el => (this._form = el)}>
            <SubmitForm
              submitted={this.state.submitted}
              loading={this.state.loading}
              onInput={this.handleInput}
              handleSubmit={event => this.handleSubmit(event)}
            />
          </div>
        ) : null}
      </Layout>
    )
  }
}

export default Main
