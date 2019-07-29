import React from 'react'
import { graphql, StaticQuery } from "gatsby"

const withArticles = (View) =>{
  return class extends React.Component{
    render(){
      return (<StaticQuery
          query={graphql`
      query  {
        allStrapiArticle {
    edges {
      node {
        title
        id
        fluidImage: image {
          childImageSharp {
              fluid(maxWidth: 960, maxHeight: 600) {
            ...GatsbyImageSharpFluid
              }
            }
        }
        image {
          id
          childImageSharp {
            fluid {
              src
            }
          }
        }
      }
    }
  }
 }
  `}
          render={data => {
            return <View {...this.props} articles={data.allStrapiArticle.edges}/>
          }}
        />
      )
    }
  }
}
export default withArticles