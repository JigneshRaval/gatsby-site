import React from "react";
import Link from 'gatsby-link';
import { TagList } from '../components/tag-list';

export default function Template({
    data, // this prop will be injected by the GraphQL query below.
}) {
    const { markdownRemark } = data; // data.markdownRemark holds our post data
    const { frontmatter, html } = markdownRemark;

    return (
        <div className="blog-post-container">


            <article className="post post-type">


                <div className="cover">
                    <div className="cover-gradient"></div>
                    <div className="cover-mouse"><span></span></div>
                    <div className="cover-content">
                        <div className="cover-category"><a className="ajax-postlist" href="https://nodewebapps.com/category/frameworks/"><span data-category-color="#F3C610"></span>Frameworks</a></div>
                        <h1 className="cover-title" itemprop="headline">{frontmatter.title}</h1>
                        <TagList tags={frontmatter.tags} />
                        <hr className="cover-divider" />
                        <a href="https://nodewebapps.com/author/tilomitragmail-com/" className="cover-author ajax-postlist">
                            <div className="cover-author-thumbnail">

                            </div>
                            <div className="cover-author-info">
                                <div className="cover-author-info-name" itemprop="name">Tilo Mitra</div>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="post-main">
                    <Link to="/">Home</Link>

                    <div className="guide">
                        <div className="guide-inner">
                            <div className="guide-title"><span ></span> {frontmatter.title}</div>
                            <div className="guide-meta">Posted <span className="guide-meta-date"><a href="https://nodewebapps.com/2017/06/27/javascript-testing-code-coverage/" className="ajax-main"><time datetime="2017-06-27" itemprop="datePublished">on {frontmatter.date}</time></a></span><span className="guide-meta-author"> by<a href="https://nodewebapps.com/author/tilomitragmail-com/" className="ajax-postlist"> Tilo Mitra</a></span></div>
                        </div>
                    </div>

                    <div className="post-inner">
                        <div
                            className="blog-post-content"
                            dangerouslySetInnerHTML={{ __html: html }}
                        />


                    </div>



                    <div className="post-footer">
                        <a href="https://nodewebapps.com/author/tilomitragmail-com/" className="post-footer-author ajax-postlist">
                            <div className="post-footer-author-thumbnail">
                                <div className="post-footer-author-thumbnail-image" ></div>
                            </div>
                            <div className="post-footer-author-info">
                                <div className="post-footer-author-info-name">Tilo Mitra</div>
                            </div>
                        </a>
                        <ul className="post-footer-tags">
                            <li className="post-footer-tags-item"><a href="https://nodewebapps.com/tag/chrome/" rel="tag">chrome</a></li><li className="post-footer-tags-item"><a href="https://nodewebapps.com/tag/javascript/" rel="tag">javascript</a></li><li className="post-footer-tags-item"><a href="https://nodewebapps.com/tag/jest/" rel="tag">jest</a></li><li className="post-footer-tags-item"><a href="https://nodewebapps.com/tag/testing/" rel="tag">testing</a></li>        </ul>


                    </div>


                    <div className="comments">

                    </div>


                </div>


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




            </article>



            {/* <div className="blog-post">
                <h1>{frontmatter.title}</h1>
                <h2>{frontmatter.date}</h2>

                <TagList tags={frontmatter.tags} />

                <div
                    className="blog-post-content"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
            <Link to="/">Home</Link> */}
        </div>
    );
}

export const pageQuery = graphql`
    query BlogPostByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                path
                title
                tags
            }
        }
    }
`;
