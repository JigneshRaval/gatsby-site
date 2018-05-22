import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/header'
import PostList from '../components/postlist'

import './index.css'
import './main.css'
// import '../assets/css/icomoon-fonts.css'

export default class SnippetsLayout extends React.Component {

    constructor(props) {
        super(props);

        // State
        this.state = {
            data: this.props.data
        }

        // Methods
        this.filterSnippetsList = this.filterSnippetsList.bind(this);

    }

    // Filter from blog post list
    filterSnippetsList() {

        let data = {
            allMarkdownRemark: {
                edges: []
            }
        }

        this.props.data.allMarkdownRemark.edges.filter(({ node }) => {
            if (node.id.indexOf('/snippets') > 0) {
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

            <main>
            {this.props.children()}
                </main>

        );
    }
}

SnippetsLayout.propTypes = {
    children: PropTypes.func,
}

//export default SnippetsLayout

export const query = graphql`
	query SnippetsLayoutQuery {
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
