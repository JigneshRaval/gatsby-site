// src/components/IndexPost.jsx

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
        frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
        }
    }
`;
