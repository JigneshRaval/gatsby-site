import React from 'react'
import Link from 'gatsby-link';
import { SearchPost } from './Search-Post';
import { SidebarHeader } from './Sidebar-Header';

export default class PostList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            initialData: props.data,
            isPostLinkActive: false
        }

        this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
        this.makePostActive = this.makePostActive.bind(this);
    }

    handleFilterUpdate = (filterValue) => {
        this.setState({ data: filterValue });
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate :', window.postsHome);

        return true;
    }
    componentDidUpdate(nextProps, nextState) {
        console.log('componentDidUpdate :', window.postsHome, nextProps, nextState)



        //this.setState({ initialData: this.state.data });
        // return data;

    }
    setNewData() {
        let data = {
            allMarkdownRemark: {
                edges: [

                ]
            }
        }

        if (window.postsHome) {
            window.postsHome.post.map((item) => {
                data.allMarkdownRemark.edges.push({ node: item });
            })


        }
        return data;
        console.log('componentDidUpdate 2:', data);
    }
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps :', window.postsHome, nextProps);

        let finalData = this.setNewData();

        if (this.props.status !== nextProps.status) {
            this.setState({
                data: finalData
            });
        }
    }

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


                <SidebarHeader data={this.state.data} initialData={this.state.initialData} updateFilter={this.handleFilterUpdate} />

                {/*  <header className="postlist-header">
                    <h2 className="postlist-header--title">Articles <span className="postlist-header--count">{this.state.data.allMarkdownRemark.edges.length}</span></h2>

                    <SearchPost data={this.state.data} initialData={this.state.initialData} updateFilter={this.handleFilterUpdate} />

                    <a href="/" className="postlist-back"><span><i className="icon icon-home"></i> Back to Latest Articles</span></a>
                </header> */}


                <div className="postlist-container">

                    {this.state.data.allMarkdownRemark.edges.map(({ node }, index) => (
                        <article key={index} className="postlist-post" data-post-id="82">
                            <Link to={node.frontmatter.path} className="postlist-post-inner" onClick={this.makePostActive}>
                                <div className="postlist-category">
                                    <span className="category-badge" style={{ backgroundColor: node.frontmatter.categoryColor }} data-category-color={node.frontmatter.categoryColor}></span> {node.frontmatter.category}
                                </div>
                                <h3 className="postlist-title">{node.frontmatter.title}</h3>
                                <p className="postlist-excerpt hidden" >{node.excerpt}</p>
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
