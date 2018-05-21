// src : https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/

import React from "react";
import PropTypes from "prop-types";

// Components
import Link from "gatsby-link";

const Tags = ({ pathContext, data }) => {

    console.log('Tags Template :::: ', pathContext, data);

    const { posts, post, tag } = pathContext;
    const { edges, totalCount } = data.allMarkdownRemark;
    const tagHeader = `${totalCount} post${
        totalCount === 1 ? "" : "s"
        } tagged with "${tag}"`;

    if (tag) {
        return (
            <div>
                <h1>
                    {post.length} post{post.length === 1 ? '' : 's'} tagged with {tag}
                </h1>
                <ul>
                    {post.map(({ id, frontmatter, excerpt }) => {
                        return (
                            <li key={id}>
                                <h1>
                                    <GatsbyLink to={frontmatter.path}>
                                        {frontmatter.title}
                                    </GatsbyLink>
                                </h1>
                                <p>
                                    {excerpt}
                                </p>
                            </li>
                        );
                    })}
                </ul>
                <Link to="/tags">
                    <TagsIcon /> All tags
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h1>{tagHeader}</h1>
            <ul>
                {edges.map(({ node }) => {
                    const { path, title } = node.frontmatter;
                    return (
                        <li key={path}>
                            <Link to={path}>{title}</Link>
                        </li>
                    );
                })}
            </ul>
            {/*
              This links to a page that does not yet exist.
              We'll come back to it!
            */}
            <Link to="/tags">All tags</Link>
        </div>
    );
};

Tags.propTypes = {
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
