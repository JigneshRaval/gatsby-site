import React from 'react';
import Link from 'gatsby-link'

export const TagList = ({ tags }) => {
    return (
        <ul className="post-tags">
            {
                tags
                    .filter((value, index, self) => self.indexOf(value) === index)
                    .map((tag, i) => {
                        // let tag = tag.toLowerCase();
                        return <li className="post-tags--item" key={i}>
                            <Link to={`/tags/${tag.toLowerCase().replace(/\s/ig, '-')}`}>{tag}</Link>
                        </li>
                    })
            }
        </ul>
    )
}
