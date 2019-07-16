import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Message from "../components/message"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Sidan kunde inte hittas" />
    <Message
      title="Sidan kunde inte hittas"
      body="Du försöker nå en sida som inte finns."
    />
  </Layout>
)

export default NotFoundPage
