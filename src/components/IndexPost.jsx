// src/components/IndexPost.jsx ( Not in Use )

import React from "react";

export default ({ frontmatter: { title, date } }) => (
    <div>
        <h3>
            {title} <span>— {date}</span>
        </h3>
    </div>
);

export const query = graphql`
    fragment IndexPostFragment on MarkdownRemark {
        html
        frontmatter {
            excerpt
            date(formatString: "MMMM DD, YYYY")
            path
            title
            tags
            category
            categoryColor
            coverImage
            sourceUrl
        }
    }
`;

/* export const query = graphql`
    fragment IndexPostFragment on MarkdownRemark {
        frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
        }
    }
`;
 */
