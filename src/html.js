import React from "react"

let stylesStr
if (process.env.NODE_ENV === `production`) {
	try {
		stylesStr = require(`!raw-loader!../public/styles.css`)
	} catch (e) {
		console.log(e)
	}
}

// https://www.browserling.com/tools/html-to-markdown
// https://domchristie.github.io/turndown/
module.exports = class HTML extends React.Component {
	render() {
		let css
		if (process.env.NODE_ENV === `production`) {
			css = (
				<style
					id="gatsby-inlined-css"
					dangerouslySetInnerHTML={{ __html: stylesStr }}
				/>
			)
		}
		return (
			<html {...this.props.htmlAttributes}>
				<head>
					<title>Gatsby Blog - JR</title>
					<meta charSet="utf-8" />
					<meta httpEquiv="x-ua-compatible" content="ie=edge" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1, shrink-to-fit=no"
					/>
					<link rel="shortcut icon" type="image/png" href="/images/favicon-16x16.png" />
					<link rel="shortcut icon" type="image/png" href="/images/favicon-16x16.png" />
					<link href="https://fonts.googleapis.com/css?family=Poppins:100,300,400,500,600,700,800" rel="stylesheet" />

					<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
					<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;subset=latin-ext" rel="stylesheet" />
					<link href="https://unpkg.com/ionicons@4.1.1/dist/css/ionicons.min.css" rel="stylesheet" />
					<link href="/css/github-gist.css" rel="stylesheet" />
					<link href="/css/icomoon-fonts.css" rel="stylesheet" />

					<script src="/js/highlight.pack.js"></script>
					<script></script>

					{this.props.headComponents}
					{css}
				</head>
				<body {...this.props.bodyAttributes}>
					{this.props.preBodyComponents}
					<div
						key={`body`}
						id="___gatsby"
						dangerouslySetInnerHTML={{ __html: this.props.body }}
					/>
					{this.props.postBodyComponents}
				</body>
			</html>
		)
	}
}
