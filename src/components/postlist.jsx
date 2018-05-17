import React from 'react'
import Link from 'gatsby-link';
import { SearchPost } from './Search-Post';

export default function PostList({ data }) {

    const initialData = data;
    console.log('PostList :', data);

    const handleFilterUpdate = (filterValue) => {

        data = {
            data: filterValue
        }
        console.log('filterValue ::', filterValue, data);
    }
    const showSearch = (event) => {
        document.querySelector('.postlist-header').classList.add('isSearchActive');
    }
    const hideSearch = (event) => {
        document.querySelector('.postlist-header').classList.remove('isSearchActive');
    }

    return (
        <div className="postlist">

            <header className="postlist-header">
                <h2 className="postlist-header--title">Articles <i className="icon ion-md-search" onClick={showSearch}></i></h2>
                <div className="postlist-header--search">
                    <SearchPost data={data} initialData={initialData} updateFilter={handleFilterUpdate} />
                    <i className="icon ion-md-close" onClick={hideSearch}></i>
                </div>
                <a href="/" className="postlist-back"><span>Back to Latest Articles</span></a>
            </header>


            <div className="postlist-container">

                {data.allMarkdownRemark.edges.map(({ node }, index) => (
                    <article key={index} className="postlist-post postlist-post__active" data-post-id="82">
                        <Link to={node.frontmatter.path} className="postlist-post-inner">
                            <div className="postlist-category"><span data-category-color="#39A155"></span>Generators</div>
                            <h3 className="postlist-title">{node.frontmatter.title}</h3>
                            <p className="postlist-excerpt" >{node.excerpt}</p>
                        </Link>
                    </article>
                ))}

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
