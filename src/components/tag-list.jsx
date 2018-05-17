import React from 'react';

export const TagList = ({ tags }) => {
    return (
        <ul>
            {
                tags
                    .filter((value, index, self) => self.indexOf(value) === index)
                    .map((tag, i) => {
                        return <li key={i}>{tag}</li>
                    })
            }
        </ul>
    )
}
