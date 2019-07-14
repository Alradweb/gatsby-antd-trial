import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../containers/app-layout"
//import ReactMarkdown from "react-markdown"
//import Img from 'gatsby-image'
import Header from '../components/header'
/* eslint-disable */

export default (props) => {
    const { data } = props
    console.log(process.env.IMAGE_BASE_URL)
    return (
      <div className='app-container'>
        <Layout>
          <div style={{ color: `purple` }}>
            <Header headerText={data.site.siteMetadata.title}/>
            <div style={{width: '100%', height: '100vh'}}>
              <video id="bg-vid" className="app-media" autoPlay muted loop playsInline="" style={{opacity: '0.62'}}>
                <source src="https://dsnu2dcxtn37x.cloudfront.net/assets/videos/gmlaunch2.mp4" type="video/mp4"/>
              </video>
            </div>

            <Link to="/contact/">Contact</Link>
            <p>language : {data.site.siteMetadata.language}</p>
            <img src="https://source.unsplash.com/random/400x200" alt="Fq8USwd9HH3A62D"/>
          </div>
        </Layout>
      </div>

    )
}
export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        language
      }
    }
  }
`