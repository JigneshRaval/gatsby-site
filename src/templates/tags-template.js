// src : https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/

import React from "react";
import PropTypes from "prop-types";

// Components
import Link from "gatsby-link";
// import { DataPassing } from '../components/DataPassing';

const Tags = (props) => {

    console.log('Tags Template :::: ', props);

    const { posts, post, tag } = props.pathContext;

    window.postsHome = props.pathContext;
    const handleChangeData = () => {
        return props.pathContext;
    }

    if (tag) {
        return (
            <div>
                {/* <DataPassing changeData={handleChangeData} /> */}
                <h1>
                    {post.length} post{post.length === 1 ? '' : 's'} tagged with {tag}
                </h1>
                <ul>
                    {post.map(({ id, frontmatter, excerpt }) => {
                        return (
                            <li key={id}>
                                <h1>
                                    <Link to={frontmatter.path}>
                                        {frontmatter.title}
                                    </Link>
                                </h1>
                                <p>
                                    {excerpt}
                                </p>
                            </li>
                        );
                    })}
                </ul>
                <Link to="/tags">
                    All tags
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h1>Tags</h1>
            <ul className="tags">
                {Object.keys(posts).map(tagName => {
                    const tags = posts[tagName];
                    return (
                        <li key={tagName}>
                            <GatsbyLink to={`/tags/${tagName}`}>
                                {tagName}
                            </GatsbyLink>
                        </li>
                    );
                })}
            </ul>
            <Link to="/">
                All posts
        </Link>
        </div>
    );
};

/* Tags.propTypes = {
    pathContext: PropTypes.shape({
        tag: PropTypes.string.isRequired,
    }),
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            totalCount: PropTypes.number.isRequired,
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.shape({
                        frontmatter: PropTypes.shape({
                            path: PropTypes.string.isRequired,
                            title: PropTypes.string.isRequired,
                        }),
                    }),
                }).isRequired
            ),
        }),
    }),
};
 */
export default Tags;

/**
 * warning The GraphQL query in the non-page component "C:/Documents/GitHub/gatsby-site/src/templates/tags-template.js" will not be run.
Queries are only executed for Page or Layout components. Instead of a query,
co-locate a GraphQL fragment and compose that fragment into the query (or other
fragment) of the top-level page or layout that renders this component. For more
info on fragments and composition see: http://graphql.org/learn/queries/#fragments
success extract queries from components — 0.342 s
 */

/*
export const TagsPageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`;
 */
