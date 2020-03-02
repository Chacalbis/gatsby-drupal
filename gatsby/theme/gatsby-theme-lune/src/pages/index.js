import React from "react"
import Layout from "../components/Layout/layout"
import SEO from "../components/seo"
import ListActualites from "../components/Home/Actualites/actualites"
import ContenuLibre from "../components/ContenuLibre/contenu-libre"
import CarnetAdresse from "../components/Home/CarnetAdresse/carnet-adresse"
import AgendaEvenements from "../components/Home/Agenda/agenda"
import ListNePasManquer from "../components/Home/NePasManquer/ne-pas-manquer"
import ListPartenaires from "../components/Home/Partenaires/partenaires"
import AccesDirects from "../components/Home/AccesDirect/acces-direct"
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
import { useSiteMetadata } from "../hooks/use-site-metadata"

const IndexPage = () => {
  const metadata = useSiteMetadata()
  return (
    <Layout isIndex={true} message={metadata.config.slogan}>
      <SEO title="Home" />
      <div className={sectionFirst}>
        <ContenuLibre isIndex={true} zoneTaxoLibre="zone_accueil_1" />
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
        <ContenuLibre isIndex={true} zoneTaxoLibre="zone_accueil_2" />
        <ContenuLibre isIndex={true} zoneTaxoLibre="zone_accueil_3" />
      </div>
      <div className={sectionPartenaires}>
        <ListPartenaires />
      </div>
    </Layout>
  )
}

export default IndexPage
