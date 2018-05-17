import React from 'react'
import Link from 'gatsby-link'
import IndexPost from "../components/IndexPost";


const IndexPage = ({ data }) => (
	<div>
		<h1>Hi people 123</h1>
		<p>Welcome to your new Gatsby site.</p>
		<p>Now go build something great.</p>
		<Link to="/page-2/">Go to page 2</Link>
		<Link to="/blog/my-first-post">My First Post in Markdown</Link>
		<Link to="/blog/angular-tutorials">Angular Tutorials</Link>

		<h1>Index page</h1>
		<a href="https://www.gatsbyjs.org/docs/querying-with-graphql/#fragments">Querying Data with GraphQL</a>
		<h4>{data.allMarkdownRemark.totalCount} Posts</h4>
		{data.allMarkdownRemark.edges.map(({ node }, index) => (
			<div key={index}>
				<IndexPost frontmatter={node.frontmatter} />
			</div>
		))}
	</div>
)

export default IndexPage

export const query = graphql`
	query MyQuery {
	  allMarkdownRemark {
		totalCount
		edges {
		  node {
			...IndexPostFragment
		  }
		}
	  }
	}
  `;
