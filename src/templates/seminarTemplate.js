import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import { Row, Col } from "react-bootstrap"

export default function SeminarTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <Row>
        <Col>
          <Row>
            <Col>
              <h4>
                {frontmatter.title}
              </h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Presented by: {frontmatter.lecturer}</p>
            </Col>
            <Col>
              {frontmatter.slides && <p><a href={frontmatter.slides.publicURL}>Slides</a></p>}
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <p>Duration: {frontmatter.duration}</p>
            </Col>
            <Col xs={12} md={4}>
              <p>On: {frontmatter.date}</p>
            </Col>
            <Col xs={12} md={4}>
              <p>Location: {frontmatter.venue}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <div
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout>
  )
}

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      html
      frontmatter {
        title
        lecturer
        duration
        date(formatString: "DD MMM, YYYY")
        venue
        slides {
          publicURL
        }
      }
      fields {
        slug
      }
    }
  }
`