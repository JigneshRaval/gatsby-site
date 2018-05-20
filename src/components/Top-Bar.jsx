import React from 'react';
import Link from 'gatsby-link';

export const TopBar = () => {

    const expandPost = (event) => {

        let postConstainer = document.querySelector('.container');

        if (postConstainer.classList.contains('full-screen')) {
            postConstainer.classList.remove('full-screen');
        } else {
            postConstainer.classList.add('full-screen');
        }

    }

    return (
        <div className="post-bar">
            <div className="post-cover--toggle-fullscreen" onClick={expandPost}>
                <i className="icon icon-menu"></i> <span className="visuallyhidden">Read in fullscreen mode.</span>
            </div>
            <h3>Blog</h3>
            <nav>
                <ul>
                    <li><Link to="/blog">Blog</Link></li>
                    <li><Link to="/snippets">Snippets</Link></li>
                </ul>
            </nav>
        </div>
    );
}
