import React from 'react';
import './css/About.css'

const About = () => {
    return (
        <div className="page-container">
            <div className="row justify-content-center text-center m-0" data-aos="fade-up">
                <div className="col-12 titles my-5">Article Master</div>
                <div className="about-text mb-5 text-start">
                    <p>
                        <strong>Article Master</strong> is an innovative web platform developed to simplify access to information and transform how individuals interact with content. Our primary goal is not only for users to read articles but also to reflect deeply on the content, take notes, and personalize information for lasting learning.
                    </p>
                    <p>
                        In the modern age of information, reading habits are rapidly evolving. At Article Master, we not only keep up with this change but also aim to make the reading experience more <strong>interactive</strong>, <strong>personalized</strong>, and <strong>social</strong>.
                    </p>
                    <p><strong>Our Goals:</strong></p>
                    <ul>
                        <li>Simplify and personalize access to information</li>
                        <li>Enhance note-taking and information management habits in a digital environment</li>
                        <li>Increase content interaction by bringing authors and readers together</li>
                        <li>Provide a digital space that supports educational and intellectual development</li>
                    </ul>

                    <p><strong>Platform roles and permissions:</strong></p>
                    <p><strong>Users:</strong></p>
                    <ul>
                        <li>Can search articles and access content</li>
                        <li>Can add read articles to their favorites</li>
                        <li>Can take personalized notes on content</li>
                        <li>Can organize notes using a folder system</li>
                        <li>Can update username and password</li>
                    </ul>

                    <p><strong>Authors (in addition to user permissions):</strong></p>
                    <ul>
                        <li>Can add new articles and delete existing ones</li>
                        <li>Can track the popularity of their own articles</li>
                        <li>Can monitor their profile statistics</li>
                    </ul>

                    <p><strong>Administrators (in addition to author and user permissions):</strong></p>
                    <ul>
                        <li>Can delete articles, users, and authors</li>
                        <li>Can view lists of users and authors</li>
                        <li>Can search among users</li>
                        <li>Can approve or reject author application requests</li>
                    </ul>

                    <p>
                        <strong>Article Master</strong> is not just a reading platform; it is an interactive digital learning environment where knowledge is created, organized, and personalized. Be a part of this experience—let’s explore and grow knowledge together!
                    </p>
                </div>
                <div className="col-5 row justify-content-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="col-12" height="200" viewBox="100 0 400 400">
                        <path d="M120,60 L220,60 L220,140 L120,140 Z" fill="#FFFFFF" stroke="#4A235A" strokeWidth="1"/>
                        <path d="M120,60 L120,140 L140,120 L140,80 Z" fill="#F8F9F9" stroke="#4A235A" strokeWidth="1"/>

                        <line x1="160" y1="80" x2="210" y2="80" stroke="#4A235A" strokeWidth="3"/>
                        <line x1="160" y1="95" x2="210" y2="95" stroke="#4A235A" strokeWidth="3"/>
                        <line x1="160" y1="110" x2="200" y2="110" stroke="#4A235A" strokeWidth="3"/>
                        <line x1="160" y1="125" x2="190" y2="125" stroke="#4A235A" strokeWidth="3"/>

                        <text x="250" y="95" fontFamily="Arial, sans-serif" fontSize="36" fontWeight="bold" fill="#4A235A">ARTICLE</text>
                        <text x="250" y="135" fontFamily="Arial, sans-serif" fontSize="36" fontWeight="bold" fill="#8E44AD">MASTER</text>

                        <line x1="250" y1="150" x2="520" y2="150" stroke="#4A235A" strokeWidth="3"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default About;