/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path");

/* exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`);

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }

      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.frontmatter.path,
          component: blogPostTemplate,
          context: {}, // additional data can be passed via context
        });
      });
    });
}; */

const getUniqueTags = (edges) => {
	// METHOD 1
	// ======================
	const set = new Set();

	edges.forEach((edge) => {
		console.log('getUniqueTags ::', edge, edge.node,edge.node.frontmatter.tags)
		edge.node.frontmatter.tags.forEach(tag => set.add(tag))
	});

	console.log('SET :', ...set);
	return [...set];

	/* // METHOD 2
	// ======================
	const sampleValues = [1, 4, 5, 2, 'a', 'e', 'b', 'e', 2, 2, 4];
	const uniqueValues = [...new Set(sampleValues)];
	console.log(uniqueValues); */

	/* // METHOD 3
	// ======================
	return edges.node.frontmatter.tags.filter(function (value, index, self) {
		console.log("getUniqueTags :", value, index, self);
		return self.indexOf(value) === index;
	}); */
};

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ boundActionCreators, graphql }) => {
	const { createPage } = boundActionCreators;

	return new Promise((resolve, reject) => {
		const blogPostTemplate = path.resolve(`src/templates/blog-post-template.js`);
		// Query for markdown nodes to use in creating pages.
		resolve(
			graphql(
				`
				{
					allMarkdownRemark(
						sort: { order: DESC, fields: [frontmatter___date] }
						limit: 1000
					) {
						edges {
							node {
								excerpt(pruneLength: 250)
								html
								id
								frontmatter {
									path
									tags
								}
							}
						}
					}
				}
        `
			).then(result => {
				if (result.errors) {
					reject(result.errors);
				}

				// Create pages for each markdown file.
				result.data.allMarkdownRemark.edges.forEach(({ node }) => {
					console.log('Node :', node);
					const path = node.frontmatter.path;
					createPage({
						path,
						component: blogPostTemplate,
						// If you have a layout component at src/layouts/blog-layout.js
						// layout: `blog-layout`,
						// In your blog post template's graphql query, you can use path
						// as a GraphQL variable to query for data from the markdown file.
						context: {
							tags: getUniqueTags(result.data.allMarkdownRemark.edges)
						},
					});
				});
			})
		);
	});
};
