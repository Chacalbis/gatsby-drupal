import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ListActualites from "../components/listActualites"
import ContenuLibre from "../components/contenuLibre"
import CarnetAdresse from "../components/carnetAdresse"
import AgendaEvenements from "../components/agendaEvenements"
import ListNePasManquer from "../components/listNePasManquer"
import ListPartenaires from "../components/listPartenaires"
import AccesDirects from "../components/accesDirects"
import BackgroundImage from "../components/backgroundImage"
import {
  sectionFirst,
  sectionSecond,
  sectionThird,
  sectionNePasManquer,
  sectionPartenaires,
  sectionAccesDirect,
} from "../styles/index.module.scss"
import "../styles/mixins.scss"
import "../styles/animations.scss"
import "../styles/buttons.scss"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <BackgroundImage />
      <div className={sectionFirst}>
        <ContenuLibre zoneTaxoLibre="zone_accueil_1" />
        <ListActualites />
      </div>
      <div className={sectionAccesDirect}>
        <AccesDirects />
      </div>
      <div className={sectionSecond}>
        <CarnetAdresse />
        <AgendaEvenements />
      </div>
      <div className={sectionNePasManquer}>
        <ListNePasManquer />
      </div>
      <div className={sectionThird}>
        <ContenuLibre zoneTaxoLibre="zone_accueil_2" />
        <ContenuLibre zoneTaxoLibre="zone_accueil_3" />
      </div>
      <div className={sectionPartenaires}>
        <ListPartenaires />
      </div>
    </Layout>
  )
}

export default IndexPage
