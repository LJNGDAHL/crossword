import PropTypes from "prop-types"
import React from "react"

import styles from "./header.module.css"
import Logo from "./logo"

const Header = ({ siteTitle }) => (
  <header className={styles.header}>
    <Logo />
    <h1 className={styles.title}>Schlagerord-flätan</h1>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
