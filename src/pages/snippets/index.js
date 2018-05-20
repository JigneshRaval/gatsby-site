import React from 'react'
import { Redirect } from 'react-router-dom'
import Link from 'gatsby-link'
import IndexPost from "../../components/IndexPost";


const IndexPage = (props) => {
    console.log('Index Data ::', props);
    setTimeout(() => {
        props.history.push('/snippets/snippet1')
    }, 500);

    return null;
}

export default IndexPage

export const query = graphql`
	query SnippetQuery {
	  allMarkdownRemark {
		totalCount
		edges {
		  node {
			...IndexPostFragment
		  }
		}
	  }
	}
  `;
