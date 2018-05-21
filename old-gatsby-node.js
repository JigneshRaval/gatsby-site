/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path");
const slash = require(`slash`)

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
		// console.log('getUniqueTags ::', edge, edge.node, edge.node.frontmatter.tags)
		edge.node.frontmatter.tags.forEach(tag => set.add(tag))
	});

	// console.log('SET :', ...set);
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

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
/* exports.onCreatePage = async ({ page, boundActionCreators }) => {
	const { createPage } = boundActionCreators;

	return new Promise((resolve, reject) => {
		if (page.path.match(/^\/snippets/)) {
			// It's assumed that `landingPage.js` exists in the `/layouts/` directory
			page.layout = "snippets-layout";

			// Update the page.
			createPage(page);
		}

		resolve();
	});
}; */

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ page, boundActionCreators, graphql }) => {
	const { createPage, createLayout } = boundActionCreators;
	console.log("PAGE =======>", page)
	return new Promise((resolve, reject) => {

		const blogPostTemplate = path.resolve(`src/templates/blog-post-template.js`);
		const tagTemplate = path.resolve("src/templates/tags-template.js");
		const snippetsTemplate = path.resolve("src/templates/snippets-template.js");
		const snippetsLayout = path.resolve("src/layouts/snippets-layout.js");


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
									category
									categoryColor
									coverImage
									sourceUrl
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
				const posts = result.data.allMarkdownRemark.edges;



				// BLOG POSTS :: Create post detail pages
				posts.forEach(({ node }) => {
					const path = node.frontmatter.path;

					// console.log("PATH =========>", node);

					let layout = 'index',
						template = blogPostTemplate;

					if (path.indexOf('/snippets') !== -1) {
						layout = 'snippets-layout';
						template = snippetsTemplate;
					}
					createPage({
						path,
						component: template,
						layout: layout,
						// If you have a layout component at src/layouts/blog-layout.js
						// layout: `blog-layout`,
						// In your blog post template's graphql query, you can use path
						// as a GraphQL variable to query for data from the markdown file.
						context: {
							tags: getUniqueTags(result.data.allMarkdownRemark.edges),
							excerpt: node.frontmatter.excerpt,
							category: node.frontmatter.category,
							categoryColor: node.frontmatter.categoryColor,
							coverImage: node.frontmatter.coverImage,
							sourceUrl: node.frontmatter.sourceUrl
						},
					});
				});

				// Tag pages:
				let tags = [];
				// Iterate through each post, putting all found tags into `tags`
				[].forEach.call(posts, edge => {
					// console.log("POSTS ::", edge.node.frontmatter)
					//if (edge.hasOwnProperty("node")) {
					//tags = tags.concat(edge.node.frontmatter.tags);
					//}
				});
				// Eliminate duplicate tags
				tags = getUniqueTags(tags);

				// Make tag pages
				tags.forEach(tag => {
					createPage({
						path: `/tags/${tag.toLowerCase()}`,
						component: tagTemplate,
						context: {
							tag,
							posts
						},
					});
				});


			})
		);
	});
};
