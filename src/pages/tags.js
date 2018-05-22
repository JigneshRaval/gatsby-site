import React from "react";
import PropTypes from "prop-types";

// Components
import Helmet from "react-helmet";
import Link from "gatsby-link";

const TagsPage = ({
    data: {
        allMarkdownRemark: { group },
        site: {
            siteMetadata: { title },
        },
    },
}) => (
        <div className="taglist--main">
            <h1>Tags</h1>

            <ul>
                {group.map(tag => (
                    <li key={tag.fieldValue}>
                        <Link to={`/tags/${tag.fieldValue.toLowerCase().replace(/\s/ig, '-')}`}>
                            {tag.fieldValue} ({tag.totalCount})
                                </Link>
                    </li>
                ))}
            </ul>
        </div>
    );

export default TagsPage;

export const pageQuery = graphql`
    query TagsQuery {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            limit: 2000
        ) {
            group(field: frontmatter___tags) {
                fieldValue
                totalCount
            }
        }
    }
`;
