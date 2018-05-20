import React from 'react';

import { SearchPost } from './Search-Post';


export const SidebarHeader = (props) => {
    console.log('SidebarHeader ::', props);

    const handleFilterUpdate = (filterValue) => {
        console.log('SidebarHeader filterValue ::', filterValue);

        // Calling updateFilter Method passed from postlist.jsx
        props.updateFilter(filterValue);
    }

    return (
        <header className="postlist-header">
            <h2 className="postlist-header--title">Articles <span className="postlist-header--count">{props.data.allMarkdownRemark.edges.length}</span></h2>

            <SearchPost data={props.data} initialData={props.initialData} updateFilter={handleFilterUpdate} />

            <a href="/" className="postlist-back"><span><i className="icon icon-home"></i> Back to Latest Articles</span></a>
        </header>
    );
}
