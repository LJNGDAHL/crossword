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
    }
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

  render() {
    return (
      <Layout>
        <SEO title="Schlagerord-flätan" />
        <Crossword onChange={bool => this.setState({ filled: bool })} />
        {this.state.filled ? (
          <div ref={el => (this._form = el)}>
            <SubmitForm />
          </div>
        ) : null}
      </Layout>
    )
  }
}

export default Main
