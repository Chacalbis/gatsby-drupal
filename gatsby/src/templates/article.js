import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const ArticleTemplate = ({ data }) => {
  const article = data.nodeArticle

  return (
    <Layout>
      <SEO title={article.title} description={article.body?.summary} />
      <div key={article.path.alias}>
        <ArticleHeader article={article} />
        <ArticleContent article={article} />
      </div>
    </Layout>
  )
}

const ArticleHeader = ({ article }) => (
  <div>
    <h2>
      <Link
        to={article.path.alias}
        dangerouslySetInnerHTML={{ __html: article.title }}
      />
    </h2>
    <ArticleAuthor article={article} />
  </div>
)

const ArticleAuthor = ({ article }) => (
  <span>
    Soumis par {article.relationships?.uid?.name} le {article.fields?.slug_date}
  </span>
)

const ArticleContent = ({ article }) => (
  <div>
    {article.body.summary && article.body.summary}
    <div dangerouslySetInnerHTML={{ __html: article.body?.processed }} />
  </div>
)

export default ArticleTemplate

export const query = graphql`
  query($slug: String!) {
    nodeArticle(path: { alias: { eq: $slug } }) {
      title
      body {
        summary
        processed
      }
      path {
        alias
      }
      relationships {
        uid {
          name
        }
      }
      created
      fields {
        slug_date
      }
    }
  }
`
