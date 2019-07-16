import React from "react"

import Layout from "../components/layout"
import Head from "../components/head"
import Message from "../components/message"

const NotFoundPage = () => (
  <Layout>
    <Head title="404: Sidan kunde inte hittas" />
    <Message
      title="Sidan kunde inte hittas"
      body="Du försöker nå en sida som inte finns."
    />
  </Layout>
)

export default NotFoundPage
