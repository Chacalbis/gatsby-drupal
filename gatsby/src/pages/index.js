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
import {
  background,
  backgroundText,
  backgroundContainer,
  sectionFirst,
  sectionSecond,
  sectionNePasManquer,
  sectionPartenaires,
  sectionAccesDirect,
  backgroundWrapper,
} from "../styles/index.module.scss"
import "../styles/mixins.scss"
import "../styles/animations.scss"
import "../styles/buttons.scss"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <div className={backgroundContainer}>
        <div className={backgroundWrapper}>
          <img className={background} alt="bg" src="lune-2000px.jpg"></img>
          <div className={backgroundText}>
            <p>Bienvenue sur ce nouveau thème !</p>
          </div>
        </div>
      </div>
      <div className={sectionFirst}>
        <ContenuLibre zoneTaxoLibre="zone_accueil_1" />
        <ListActualites />
      </div>
      <div className={sectionAccesDirect}>
        <AccesDirects />
      </div>
      <div className={sectionSecond}>
        <CarnetAdresse/>
        <AgendaEvenements />
      </div>
      <div className={sectionNePasManquer}>
        <ListNePasManquer />
      </div>
      <div className={sectionPartenaires}>
        <ListPartenaires />
      </div>
    </Layout>
  )
}

export default IndexPage
