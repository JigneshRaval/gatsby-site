import React from 'react';

export const SearchPost = (props) => {

    // Filter from blog post list
    const filterList = (event) => {
        console.log('SearchPost :', props);
        let filteredData = [];
        let data = {
            allMarkdownRemark: {
                edges: []
            }
        }

        props.initialData.allMarkdownRemark.edges.filter(({ node }) => {
            if (node.frontmatter.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1) {
                data.allMarkdownRemark.edges.push({ node: node });
            }
        });

        props.updateFilter(data);
    };

    return <input type="text" className="uk-input" placeholder="Search" onChange={filterList} />

}

// <SearchTodoItem data={this.state.data} initialData={this.state.initialData} />
