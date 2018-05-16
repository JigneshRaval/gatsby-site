import React from 'react'
import Link from 'gatsby-link'

const PostList = () => (


    <div className="postlist ">


        <div className="postlist-title ">
            <h2 className="postlist-title-current">

                Related Articles

        </h2>
            <div className="postlist-title-search">

                <form className="postlist-title-search-form" role="search" method="get" action="https://nodewebapps.com/">
                    <input type="text" value="" name="s" className="postlist-title-search-input" placeholder="Search the blog..." />
                </form>

            </div>
        </div >


        <div className="postlist-filter">
            <div className="postlist-filter-close">

            </div>
            <div className="postlist-filter-categories">
                <p className="postlist-filter-title">Filter by Category</p>
                <ul className="postlist-filter-container">
                    <li className="postlist-filter-item">
                        <a className="postlist-filter-item-anchor ajax-postlist" href="https://nodewebapps.com/category/tutorials/"><span className="postlist-filter-item-category" ></span>Tutorials<span className="postlist-filter-item-count">(6)</span></a>
                    </li>
                    <li className="postlist-filter-item">
                        <a className="postlist-filter-item-anchor ajax-postlist" href="https://nodewebapps.com/category/servers/"><span className="postlist-filter-item-category"></span>Servers<span className="postlist-filter-item-count">(6)</span></a>
                    </li>

                </ul>
            </div>
            <div className="postlist-filter-authors">
                <p className="postlist-filter-title">Filter by Author</p>
                <ul className="postlist-filter-container">
                    <li className="postlist-filter-item">
                        <a className="postlist-filter-item-anchor ajax-postlist" href="https://nodewebapps.com/author/tilomitragmail-com/"><span className="postlist-filter-item-avatar" ></span>Tilo Mitra <span className="postlist-filter-item-count">(16)</span></a>
                    </li>
                </ul>
            </div>
        </div >

        <div className="postlist-container">
            <div className="postlist-container-inner">


                <a href="https://nodewebapps.com" className="postlist-back">

                    <span>Back to Latest Articles</span>
                </a>





                <div className="postlist-block">


                    <article id="post-82" className="postlist-post postlist-post__active post-82 post type-post status-publish format-standard hentry category-generators category-tutorials tag-html tag-javascript tag-metalsmith tag-node tag-npm" data-post-id="82">
                        <a className="postlist-post-inner ajax-main" href="https://nodewebapps.com/2017/01/15/how-to-build-and-deploy-static-websites-using-metalsmith/">
                            <div className="postlist-post-content">
                                <div className="postlist-post-category">
                                    <span data-category-color="#39A155"></span>Generators                </div>
                                <h3 className="postlist-post-title">How to build and deploy static websites using Metalsmith</h3>
                                <p className="postlist-post-excerpt">Today, I’ll talk about my process for building and deploying static websites&nbsp;using Metalsmith, a static site generator for NodeJS. A static website is appropriate for a...</p>
                                <p className="postlist-post-meta">
                                    <span className="postlist-post-sticky"><i className="fa fa-thumb-tack"></i></span>
                                    Posted                    <span className="postlist-post-meta-date"><time dateTime="2017-01-15">on January 15, 2017</time></span>
                                    <span className="postlist-post-meta-author">by Tilo Mitra</span>
                                </p>
                            </div>
                        </a>
                    </article>

                    <article id="post-74" className="postlist-post  post-74 post type-post status-publish format-standard has-post-thumbnail hentry category-databases category-security tag-cookie tag-csrf tag-express tag-javascript tag-node tag-rate-limit tag-security tag-xss" data-post-id="74">
                        <a className="postlist-post-inner ajax-main" href="https://nodewebapps.com/2017/01/03/13-security-best-practices-for-your-web-application/">
                            <div className="postlist-post-thumbnail">
                                <div className="postlist-post-image" ></div>
                            </div>
                            <div className="postlist-post-content">
                                <div className="postlist-post-category">
                                    <span data-category-color="#F31010"></span>Databases                </div>
                                <h3 className="postlist-post-title">13 best practices to secure your NodeJS web application</h3>
                                <p className="postlist-post-excerpt">Everyone agrees that web application security is very important but few take&nbsp;it seriously. Here's a 13-step security&nbsp;checklist that you should follow before deploying your next web application.</p>
                                <p className="postlist-post-meta">
                                    <span className="postlist-post-sticky"><i className="fa fa-thumb-tack"></i></span>
                                    Posted                    <span className="postlist-post-meta-date"><time dateTime="2017-01-03">on January 3, 2017</time></span>
                                    <span className="postlist-post-meta-author">by Tilo Mitra</span>
                                </p>
                            </div>
                        </a>
                    </article>


                </div>


                <a href="https://nodewebapps.com/" className="pagination pagination-return">

                    <div className="pagination-message">View Latest Posts</div>
                </a>



            </div >
        </div >

    </div >
)

export default PostList;
