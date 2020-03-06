import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./Header/header"
import "./layout.scss"
import HeaderTop from "./HeaderTop/header-top"
import Footer from "./Footer/footer"

const Layout = ({ children, isIndex, isDetail, message }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <HeaderTop
        children={children}
        isDetail={isDetail}
        isIndex={isIndex}
        message={message}
      />
      <Footer></Footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
