import React from 'react';
import './css/About.css'

const About = () => {
    return (
        <div className="page-container">
            <div className="row justify-content-center text-center mb-5" data-aos="fade-up">
                <div className="col-12 titles my-5">Article Master</div>
                <div className="about-text mb-5 text-start">
                    <p>
                        <strong>Article Master</strong>, bilgiye erişimi kolaylaştırmak ve bireylerin içeriklerle etkileşim kurma biçimini dönüştürmek amacıyla geliştirilmiş yenilikçi bir web platformudur. Temel hedefimiz, kullanıcıların yalnızca makaleleri okuması değil; aynı zamanda bu içerikler üzerinde derinlemesine düşünmesi, notlar alması ve bilgiyi kişiselleştirerek kalıcı öğrenme sağlamasıdır.
                    </p>
                    <p>
                        Modern bilgi çağında okuma alışkanlıkları hızla değişiyor. Article Master olarak bu değişime ayak uydurmakla kalmayıp, okuma deneyimini daha <strong>etkileşimli</strong>, <strong>kişisel</strong> ve <strong>sosyal</strong> hale getirmeyi amaçlıyoruz.
                    </p>
                    <p><strong>Hedeflerimiz:</strong></p>
                    <ul>
                        <li>Bilgiye erişimi sadeleştirmek ve kişiselleştirmek</li>
                        <li>Not alma ve bilgi yönetimi alışkanlıklarını dijital ortamda güçlendirmek</li>
                        <li>Yazarlarla okuyucuları bir araya getirerek içerik etkileşimini artırmak</li>
                        <li>Eğitimsel ve entelektüel gelişimi destekleyen bir dijital ortam sunmak</li>
                    </ul>

                    <p><strong>Platform rolleri ve yetkileri:</strong></p>
                    <p><strong>Kullanıcılar:</strong></p>
                    <ul>
                        <li>Makaleler arasında arama yaparak içeriklere erişebilir</li>
                        <li>Okudukları makaleleri favorilerine ekleyebilir</li>
                        <li>İçerikler üzerine kişiselleştirilmiş notlar alabilir</li>
                        <li>Notlarını klasör sistemi ile düzenleyebilir</li>
                        <li>Kullanıcı adı ve şifresini güncelleyebilir</li>
                    </ul>

                    <p><strong>Yazarlar (Kullanıcı yetkilerine ek olarak):</strong></p>
                    <ul>
                        <li>Yeni makale ekleyebilir ve mevcut makaleleri silebilir</li>
                        <li>Kendi makalelerinin popülerliğini izleyebilir</li>
                        <li>Kendi profil istatistiklerini takip edebilir</li>
                    </ul>

                    <p><strong>Yöneticiler (Yazar ve kullanıcı yetkilerine ek olarak):</strong></p>
                    <ul>
                        <li>Makaleleri, kullanıcıları ve yazarları silebilir</li>
                        <li>Kullanıcı ve yazar listelerini görüntüleyebilir</li>
                        <li>Kullanıcılar arasında arama yapabilir</li>
                        <li>Yazar başvuru taleplerini onaylayabilir veya reddedebilir</li>
                    </ul>

                    <p>
                        <strong>Article Master</strong>, yalnızca bir okuma platformu değil; bilginin üretildiği, düzenlendiği ve kişiselleştirildiği etkileşimli bir dijital öğrenme ortamıdır. Siz de bu deneyimin bir parçası olun, bilgiyi birlikte keşfedelim ve geliştirelim!
                    </p>
                </div>
                <div className="col-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="300" viewBox="0 0 600 200">
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