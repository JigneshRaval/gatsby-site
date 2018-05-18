import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/header'
import PostList from '../components/postlist'

import './index.css'
import './main.css'
// import '../assets/css/icomoon-fonts.css'

const Layout = ({ children, data }) => {
	console.log('Layout ::', data);
	return (
		<div className="container">
			<div className="container-side">
				{/* <div className="header">
					test
      			</div> */}
				<PostList data={data} />
			</div>

			<div className="container-main">
				{children()}
			</div>
		</div>
	)
}

Layout.propTypes = {
	children: PropTypes.func,
}

export default Layout

export const query = graphql`
	query SiteTitleQuery {
		site {
			siteMetadata {
				title
			}
		}
		allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___date] }
		) {
			totalCount
			edges {
				node {
					excerpt(pruneLength: 250)
					id
					frontmatter {
						date(formatString: "MMMM DD, YYYY")
						path
						tags
						title
						category
						categoryColor
					}
				}
			}
		}
	}
`
