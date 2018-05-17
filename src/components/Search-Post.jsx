import React from 'react';

export const SearchPost = (props) => {
    const filterList = (event) => {
        console.log('SearchPost :', props);
        let filteredData = [];
        let data = {
            allMarkdownRemark: {
                edges : []
            }
        }

        //Object.keys(props.initialData).map(date => {
        props.initialData.allMarkdownRemark.edges.filter(({node}) => {

            console.log('SearchPost :', node);
                if (node.frontmatter.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1) {

                        //filteredData.push(node);
                    data.allMarkdownRemark.edges.push(node);

                }
            })
        //});

        props.updateFilter(data);
        //return filteredData;

    };

    return <input type="text" className="uk-input" placeholder="Search" onChange={filterList} />

}

// <SearchTodoItem data={this.state.data} initialData={this.state.initialData} />
