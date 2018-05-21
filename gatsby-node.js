/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path");
const slash = require(`slash`);

// TEMPLATES
// =======================================
const blogPostTemplate = path.resolve(`src/templates/blog-post-template.js`);
const tagTemplate = path.resolve("src/templates/tags-template.js");
const snippetsTemplate = path.resolve("src/templates/snippets-template.js");
const snippetsLayout = path.resolve("src/layouts/snippets-layout.js");

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

	return new Promise((resolve, reject) => {

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
									title
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

				// createTagPages(createPage, posts);

				// BLOG POSTS :: Create post detail pages
				// =================================
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
				// REF. : https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/
				// =================================
				/* let tags = [];
				// Iterate through each post, putting all found tags into `tags`
				_.each(posts, edge => {
					if (_.get(edge, "node.frontmatter.tags")) {
						tags = tags.concat(edge.node.frontmatter.tags);
					}
				});
				// Eliminate duplicate tags
				tags = _.uniq(tags);

				// Make tag pages
				tags.forEach(tag => {
					createPage({
						path: `/tags/${_.kebabCase(tag)}/`,
						component: tagTemplate,
						context: {
							tag,
						},
					});
				}); */

				let tags = [],
					postNew = {};

				posts.forEach(({ node }) => {
					if (node.frontmatter.tags) {
						console.log(node.frontmatter.tags);
						tags = tags.concat(node.frontmatter.tags);

						node.frontmatter.tags.forEach(tag => {
							if (!postNew[tag]) {
								postNew[tag] = [];
							}
							postNew[tag].push(node);
						});
					}
				});

				let uniqueTags = [...new Set(tags)];



				uniqueTags.forEach(tag => {
					const post = postNew[tag];
					createPage({
						path: `/tags/${tag.toLowerCase().replace(/\s/ig, '-')}`,
						component: tagTemplate,
						context: {
							tag,
							post,
							posts: postNew
						},
					});
				});

				console.log('postNew ====>', postNew);

				/* //
				edges.forEach(({ node }) => {
					if (node.frontmatter.tags) {
						node.frontmatter.tags.forEach(tag => {
							if (!posts[tag]) {
								posts[tag] = [];
							}
							posts[tag].push(node);
						});
					}
				});

				Object.keys(posts).forEach(tagName => {
					const post = posts[tagName];
					createPage({
						path: `/tags/${tagName.toLowerCase()}`,
						component: tagTemplate,
						context: {
							posts: postsFiltered,
							post,
							tag: tagName
						}
					})
				}); */

				/* createPage({
					path: '/tags',
					component: tagTemplate,
					context: {
						posts: postsFiltered
					}
				}); */

				/* // Make tag pages
				tags.forEach(tag => {
					createPage({
						path: `/tags/${tag.toLowerCase()}/`,
						component: tagTemplate,
						context: {
							posts,
							tag
						},
					});
				});

				Object.keys(posts).forEach(tagName => {
					const post = posts[tagName];
					createPage({
						path: `/tags/${tagName.toLowerCase()}`,
						component: tagTemplate,
						context: {
							posts: postsFiltered,
							post,
							tag: tagName
						}
					})
				}); */


			})
		);
	});
};


const createTagPages = (createPage, edges) => {
	// const tagTemplate = path.resolve(`src/templates/tags.js`);
	const posts = {};

	edges.forEach(({ node }) => {
		if (node.frontmatter.tags) {
			node.frontmatter.tags.forEach(tag => {
				if (!posts[tag]) {
					posts[tag] = [];
				}
				posts[tag].push(node);
			});
		}
	});

	createPage({
		path: '/tags',
		component: tagTemplate,
		context: {
			posts
		}
	});

	Object.keys(posts).forEach(tagName => {
		const post = posts[tagName];
		createPage({
			path: `/tags/${tagName.toLowerCase()}`,
			component: tagTemplate,
			context: {
				posts,
				post,
				tag: tagName
			}
		})
	});
};
