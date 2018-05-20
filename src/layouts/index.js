import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/header'
import PostList from '../components/postlist'

import './index.css'
import './main.css'
// import '../assets/css/icomoon-fonts.css'

export default class Layout extends React.Component {

	constructor(props) {

		super(props);

		// State
		this.state = {
			data: this.props.data
		}

		// Methods
		this.filterSnippetsList = this.filterSnippetsList.bind(this);
		hljs.initHighlightingOnLoad();
	}

	// Filter from blog post list
	filterSnippetsList() {

		let data = {
			allMarkdownRemark: {
				edges: []
			}
		}

		this.props.data.allMarkdownRemark.edges.filter(({ node }) => {
			if (node.id.indexOf('/blog') > 0) {
				data.allMarkdownRemark.edges.push({ node: node });
			}
		});

		return data;
	}

	componentWillMount() {

		let dataNew = this.filterSnippetsList();

		this.setState({
			data: dataNew
		});

	}

	render() {
		return (
			<div className="container">
				<div className="container-side">
					{/* <div className="header">
					test
      			</div> */}
					<PostList data={this.state.data} />
				</div>

				<div className="container-main">
					{this.props.children()}
				</div>
			</div>
		);
	}
}

Layout.propTypes = {
	children: PropTypes.func,
}

//export default Layout

/**
 * allMarkdownRemark(
			filter: { frontmatter:  { category: { eq:"Angular"}}},
			sort: { order: DESC, fields: [frontmatter___date] }
		)
 */

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
