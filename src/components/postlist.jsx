import React from 'react'
import Link from 'gatsby-link';
import { SearchPost } from './Search-Post';

export default class PostList extends React.Component {
    constructor(props) {
        super(props);

        console.log('PostList :', props.data);

        this.state = {
            data: props.data,
            initialData: props.data,
            isPostLinkActive: false
        }

        this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
        // this.hideSearch = this.hideSearch.bind(this);
        // this.showSearch = this.showSearch.bind(this);
        this.makePostActive = this.makePostActive.bind(this);
    }

    handleFilterUpdate = (filterValue) => {
        console.log('filterValue ::', filterValue);
        this.setState({ data: filterValue });
    }

    /* showSearch = (event) => {
        document.querySelector('.postlist-header').classList.add('isSearchActive');
    }

    hideSearch = (event) => {
        document.querySelector('.postlist-header').classList.remove('isSearchActive');
    } */

    makePostActive(event) {
        var postListNodes = document.querySelectorAll('.postlist-post');

        [].forEach.call(postListNodes, (node) => {
            node.classList.remove('postlist-post__active')
        })

        event.currentTarget.parentElement.classList.add('postlist-post__active');
        this.setState({ isPostLinkActive: true })
    }

    render() {
        return (
            <div className="postlist">

                <header className="postlist-header">
                    <h2 className="postlist-header--title">Articles <span className="postlist-header--count">{this.state.data.allMarkdownRemark.totalCount}</span></h2>

                    <SearchPost data={this.state.data} initialData={this.state.initialData} updateFilter={this.handleFilterUpdate} />

                    <a href="/" className="postlist-back"><span><i className="icon icon-home"></i> Back to Latest Articles</span></a>
                </header>


                <div className="postlist-container">

                    {this.state.data.allMarkdownRemark.edges.map(({ node }, index) => (
                        <article key={index} className="postlist-post" data-post-id="82">
                            <Link to={node.frontmatter.path} className="postlist-post-inner" onClick={this.makePostActive}>
                                <div className="postlist-category">
                                    <span className="category-badge" style={{ backgroundColor: node.frontmatter.categoryColor }} data-category-color={node.frontmatter.categoryColor}></span> {node.frontmatter.category}
                                </div>
                                <h3 className="postlist-title">{node.frontmatter.title}</h3>
                                <p className="postlist-excerpt" >{node.excerpt}</p>
                            </Link>
                        </article>
                    ))}

                </div>

            </div>
        );
    }
}
/*
export const markdownFrontmatterFragment = graphql`
  fragment MyMarkdownFrontmatter on MarkdownRemark {
    frontmatter {
      path
      title
      date(formatString: "MMMM DD, YYYY")
    }
  }
`;

export const pageQuery = graphql`
    query PostListQuery {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
            edges {
                node {
                    excerpt(pruneLength: 250)
                    id
                    frontmatter {
                        title
                        date(formatString: "MMMM DD, YYYY")
                        path
                    }
                }
            }
        }
    }
`;
 */
/* export const query = graphql`
    query PostListQuery($path: String!) {
        allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___date] }
		) {
			edges {
				node {
					frontmatter {
						date(formatString: "MMMM DD, YYYY")
						path
						tags
						title
					}
				}
			}
		}
    }
`; */
