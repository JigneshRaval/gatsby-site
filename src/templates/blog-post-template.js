import React from "react";
import Link from 'gatsby-link';
import { TagList } from '../components/tag-list';
import { TopBar } from '../components/Top-Bar';

export default function Template({
    data, // this prop will be injected by the GraphQL query below.
}) {

    console.log('Blog Post TEmplate ::: ', data);

    const { markdownRemark } = data; // data.markdownRemark holds our post data
    const { frontmatter, html } = markdownRemark;

    return (
        <div className="blog-post-container">

            <article className="post">

                <TopBar />

                <header className="post-header">
                    <div className="post-cover" style={{ backgroundImage: 'url(' + frontmatter.coverImage + ')' }}>

                        <div className="post-cover--content">
                            <div className="post-cover--category">
                                <a href="/"><span className="category-badge" data-category-color={frontmatter.categoryColor} style={{ backgroundColor: frontmatter.categoryColor }}></span> {frontmatter.category}</a>
                            </div>
                            <h1 className="post-cover--title">{frontmatter.title}</h1>
                            <p className="post-cover--excerpt">
                                {frontmatter.excerpt}
                            </p>

                            <TagList tags={frontmatter.tags} />

                        </div>

                    </div>

                    <div className="post-guide">
                        <a href={frontmatter.sourceUrl} className="post-guide--title"
                            title={'Click to visit original website. ' + frontmatter.sourceUrl}
                            target="_blank">
                            <span className="category-badge" data-category-color={frontmatter.categoryColor} style={{ backgroundColor: frontmatter.categoryColor }}></span>
                            {frontmatter.title}
                        </a>
                        <div className="post-guide--meta">Posted on
                        <span className="guide-meta-date">
                                <a href="https://nodewebapps.com/2017/06/27/javascript-testing-code-coverage/">
                                    <time dateTime="2017-06-27">{frontmatter.date}</time></a>
                            </span>
                            <span className="guide-meta-author"> by<a href="https://nodewebapps.com/author/tilomitragmail-com/" className="ajax-postlist"> John Doe</a></span>
                        </div>
                    </div>
                </header>

                <section className="post-content--main">

                    <div
                        className="post-content"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />

                </section>

                <footer className="post-footer">

                    <TagList tags={frontmatter.tags} />

                    <div className="post-related">
                        <h3 className="post-related-title">Related Articles</h3>
                        <div className="post-related-container">


                            <div className="post-related-item">
                                <div className="post-related-item-thumbnail">
                                    <a href="https://nodewebapps.com/2017/11/24/html-page-lifecycle-events/" className="post-related-item-image ajax-main" ></a>
                                </div>
                            </div>


                            <div className="post-related-item">
                                <div className="post-related-item-thumbnail">
                                    <a href="https://nodewebapps.com/2017/01/03/13-security-best-practices-for-your-web-application/" className="post-related-item-image ajax-main" ></a>
                                </div>
                            </div>


                        </div>
                    </div>
                </footer>

            </article>

        </div>
    );
}

export const pageQuery = graphql`
    query BlogPostByPath($path: String!) {
        markdownRemark(
            frontmatter: { path: { eq: $path } }
        ) {
            html
            frontmatter {
                excerpt
                date(formatString: "MMMM DD, YYYY")
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
`;
