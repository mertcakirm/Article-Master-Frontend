import React from 'react';
import './css/About.css'

const About = () => {
    return (
        <div className="page-container">
            <div className="row justify-content-center text-center" data-aos="fade-up">
                <div className="col-12 titles my-5">Article Master</div>
                <div className="about-text text-start">
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
            </div>
        </div>
    );
};

export default About;