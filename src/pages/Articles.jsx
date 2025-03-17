import React from 'react';
import Navbar from "../components/Navbar.jsx";

const Articles = () => {
    return (
        <div>
            <Navbar />
            <div className="page-container container-fluid">
                <div className="row row-gap-5 mt-5 popular-row">
                    <div className="col-12 titles mb-4 text-center">Articles</div>
                    <div className="col-lg-3">
                        <a href="#" className="article-card">
                            <img className="w-100 img-fluid article-card-img" alt="article-image"
                                 src="https://bgcp.bionluk.com/images/portfolio/1400x788/d9792dfe-2379-4a8f-bc5f-3c1649310174.jpg"/>
                            <p className="article-card-title">Article Title</p>
                            <p className="article-card-desc">Article Description Article Description Article Description
                                Article Description Article Description Article Description Article Description</p>
                        </a>
                    </div>

                    <div className="col-lg-3">
                        <a href="#" className="article-card">
                            <img className="w-100 img-fluid article-card-img" alt="article-image"
                                 src="https://bgcp.bionluk.com/images/portfolio/1400x788/d9792dfe-2379-4a8f-bc5f-3c1649310174.jpg"/>
                            <p className="article-card-title">Article Title</p>
                            <p className="article-card-desc">Article Description Article Description Article Description
                                Article Description Article Description Article Description Article Description</p>
                        </a>
                    </div>

                    <div className="col-lg-3">
                        <a href="#" className="article-card">
                            <img className="w-100 img-fluid article-card-img" alt="article-image"
                                 src="https://bgcp.bionluk.com/images/portfolio/1400x788/d9792dfe-2379-4a8f-bc5f-3c1649310174.jpg"/>
                            <p className="article-card-title">Article Title</p>
                            <p className="article-card-desc">Article Description Article Description Article Description
                                Article Description Article Description Article Description Article Description</p>
                        </a>
                    </div>

                    <div className="col-lg-3">
                        <a href="#" className="article-card">
                            <img className="w-100 img-fluid article-card-img" alt="article-image"
                                 src="https://bgcp.bionluk.com/images/portfolio/1400x788/d9792dfe-2379-4a8f-bc5f-3c1649310174.jpg"/>
                            <p className="article-card-title">Article Title</p>
                            <p className="article-card-desc">Article Description Article Description Article Description
                                Article Description Article Description Article Description Article Description</p>
                        </a>
                    </div>

                    <div className="col-lg-3">
                        <a href="#" className="article-card">
                            <img className="w-100 img-fluid article-card-img" alt="article-image"
                                 src="https://bgcp.bionluk.com/images/portfolio/1400x788/d9792dfe-2379-4a8f-bc5f-3c1649310174.jpg"/>
                            <p className="article-card-title">Article Title</p>
                            <p className="article-card-desc">Article Description Article Description Article Description
                                Article Description Article Description Article Description Article Description</p>
                        </a>
                    </div>

                    <div className="col-lg-3">
                        <a href="#" className="article-card">
                            <img className="w-100 img-fluid article-card-img" alt="article-image"
                                 src="https://bgcp.bionluk.com/images/portfolio/1400x788/d9792dfe-2379-4a8f-bc5f-3c1649310174.jpg"/>
                            <p className="article-card-title">Article Title</p>
                            <p className="article-card-desc">Article Description Article Description Article Description
                                Article Description Article Description Article Description Article Description</p>
                        </a>
                    </div>

                </div>


            </div>

        </div>
    );
};

export default Articles;