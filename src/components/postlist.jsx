import React from 'react'
import Link from 'gatsby-link'

export default function PostList({ data }) {

    console.log('PostList :', data);

    return (
        <div className="postlist ">

            <div className="postlist-title ">
                <h2 className="postlist-title-current">Related Articles</h2>
                <div className="postlist-title-search">

                    <form className="postlist-title-search-form" role="search" method="get" action="https://nodewebapps.com/">
                        <input type="text" value="" name="s" className="postlist-title-search-input" placeholder="Search the blog..." />
                    </form>

                </div>
            </div >

            {/* <h1>Index page</h1>
		<h4>{data.allMarkdownRemark.totalCount} Posts</h4>
		{data.allMarkdownRemark.edges.map(({ node }) => (
		  <div key={node.id}>
			<IndexPost frontmatter={node.frontmatter} />
		  </div>
		))} */}

            <div className="postlist-filter">
                <div className="postlist-filter-close">

                </div>
                <div className="postlist-filter-categories">
                    <p className="postlist-filter-title">Filter by Category</p>
                    <ul className="postlist-filter-container">
                        <li className="postlist-filter-item">
                            <a className="postlist-filter-item-anchor ajax-postlist" href="https://nodewebapps.com/category/tutorials/"><span className="postlist-filter-item-category" ></span>Tutorials<span className="postlist-filter-item-count">(6)</span></a>
                        </li>
                        <li className="postlist-filter-item">
                            <a className="postlist-filter-item-anchor ajax-postlist" href="https://nodewebapps.com/category/servers/"><span className="postlist-filter-item-category"></span>Servers<span className="postlist-filter-item-count">(6)</span></a>
                        </li>

                    </ul>
                </div>
                <div className="postlist-filter-authors">
                    <p className="postlist-filter-title">Filter by Author</p>
                    <ul className="postlist-filter-container">
                        <li className="postlist-filter-item">
                            <a className="postlist-filter-item-anchor ajax-postlist" href="https://nodewebapps.com/author/tilomitragmail-com/"><span className="postlist-filter-item-avatar" ></span>Tilo Mitra <span className="postlist-filter-item-count">(16)</span></a>
                        </li>
                    </ul>
                </div>
            </div >

            <div className="postlist-container">
                <div className="postlist-container-inner">

                    <a href="/" className="postlist-back"><span>Back to Latest Articles</span></a>

                    <div className="postlist-block">

                        {data.allMarkdownRemark.edges.map(({ node }, index) => (
                            <article key={index} className="postlist-post postlist-post__active post-82 post type-post status-publish format-standard hentry category-generators category-tutorials tag-html tag-javascript tag-metalsmith tag-node tag-npm" data-post-id="82">
                                <Link to={node.frontmatter.path} className="postlist-post-inner ajax-main">
                                    <div className="postlist-post-content">
                                        <div className="postlist-post-category"><span data-category-color="#39A155"></span>Generators</div>
                                        <h3 className="postlist-post-title">{node.frontmatter.title}</h3>
                                        <p className="postlist-post-excerpt">{node.frontmatter.excerpt}</p>
                                        <p className="postlist-post-meta">
                                            <span className="postlist-post-sticky"><i className="fa fa-thumb-tack"></i></span>
                                            Posted<span className="postlist-post-meta-date"><time dateTime="2017-01-15">on {node.date}</time></span>
                                            <span className="postlist-post-meta-author">by Tilo Mitra</span>
                                        </p>
                                    </div>
                                </Link>
                            </article>
                        ))}

                    </div>

                </div>
            </div>

        </div>
    );
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
