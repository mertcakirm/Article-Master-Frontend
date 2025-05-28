const CommentsPopup = ({onClose}) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content comments-popup" style={{color: '#fff'}} data-aos="zoom-in">
                <button className="popup-close-btn" onClick={() => onClose(false)}>&times;</button>
                <div style={{overflow:'hidden', overflowY:'scroll', maxHeight:'500px'}}>
                    <p className="titles text-center">KVKK Aydınlatma Metni</p>

                    <p>Değerli Site Ziyaretçilerimiz, Müşterilerimiz, Üyelerimiz,</p>
                    <p>www.articleMaster.com sitesi üzerinden paylaştığınız kişisel verilerinizin gizliliği ve güvenliğine önem vermekte; özel hayatın gizliliği başta olmak üzere, Anayasa ile güvence altına alınan temel hak ve özgürlüklerin korunması ilkesine azami hassasiyet göstermekteyiz. Buna göre, 07.04.2016 tarihli Resmî Gazete ile yürürlüğe giren 6698 Sayılı Kişisel Verilerin Korunması Kanunu ve ilgili sair mevzuat kapsamında haiz olduğumuz aydınlatma yükümlülüğü uyarınca, aşağıda yer alan hususları bilgilerinize arz ederiz.</p>

                    <p><strong>A. Tanımlar</strong></p>
                    <p><strong>Açık Rıza:</strong> Belirli bir konuya ilişkin, bilgilendirilmeye dayanan ve özgür iradeyle açıklanan rıza anlamına gelmektedir.</p>
                    <p><strong>Anonim Hâle Getirme:</strong> Kişisel verilerin, başka verilerle eşleştirilerek dahi hiçbir surette kimliği belirli veya belirlenebilir bir gerçek kişiyle ilişkilendirilemeyecek hâle getirilmesi anlamına gelmektedir.</p>
                    <p><strong>İlgili Kişi:</strong> Kişisel verisi işlenen gerçek kişi anlamına gelmektedir.</p>
                    <p><strong>Kanun:</strong> 07.04.2016 tarihli Resmî Gazete ile yürürlüğe giren 6698 Sayılı Kişisel Verilerin Korunması Kanunu.</p>
                    <p><strong>Kişisel Veri:</strong> Kimliği belirli veya belirlenebilir gerçek kişiye ilişkin her türlü bilgi anlamına gelmektedir.</p>
                    <p><strong>Kişisel Verilerin İşlenmesi:</strong> Kişisel verilerin tamamen veya kısmen otomatik olan ya da herhangi bir veri kayıt sisteminin parçası olmak kaydıyla otomatik olmayan yollarla elde edilmesi, kaydedilmesi, depolanması, muhafaza edilmesi, değiştirilmesi, yeniden düzenlenmesi, açıklanması, aktarılması, devralınması, elde edilebilir hâle getirilmesi, sınıflandırılması ya da kullanılmasının engellenmesi gibi veriler üzerinde gerçekleştirilen her türlü işlem anlamına gelmektedir.</p>
                    <p><strong>Kurul:</strong> Kişisel Verileri Koruma Kurulu anlamına gelmektedir.</p>
                    <p><strong>Kurum:</strong> Kişisel Verileri Koruma Kurumu anlamına gelmektedir.</p>
                    <p><strong>Veri İşleyen:</strong> Veri sorumlusunun verdiği yetkiye dayanarak onun adına kişisel verileri işleyen gerçek veya tüzel kişi anlamına gelmektedir.</p>
                    <p><strong>Veri Kayıt Sistemi:</strong> Kişisel verilerin belirli kriterlere göre yapılandırılarak işlendiği kayıt sistemi anlamına gelmektedir.</p>
                    <p><strong>Veri Sorumlusu:</strong> Kişisel verilerin işleme amaçlarını ve vasıtalarını belirleyen, veri kayıt sisteminin kurulmasından ve yönetilmesinden sorumlu olan gerçek veya tüzel kişi anlamına gelmektedir.</p>

                    <p><strong>B. Veri Sorumlusu</strong></p>
                    <p>www.sonfaturaodeme.com sitesi üzerinden paylaştığınız kişisel verilere ilişkin Veri Sorumlusu, merkez adresi Gümüşsuyu Caddesi No:5 Daire:8 Meral Plaza Ümraniye / İstanbul  olan HTM Bilişim'dir.</p>

                    <p><strong>C. Kişisel Verileri İşleme Amacı</strong></p>
                    <p>Şirketimiz tarafından, www.sonfaturaodeme.com  sitesi üzerinden işlenen web sitesi kullanıcıları, üyeleri ve müşterileri vb. taraflara ait kişisel veriler, ad-soyad bilgisi, iletişim bilgisi (telefon numarası, e-mail adresi vb.), işlem güvenliği bilgisi (online ödemelere ilişkin bilgiler) gibi kategorilerde kişisel veri toplanabilmektedir.</p>

                    <p>Toplanan Kişisel Veriler aşağıda yer alan amaçlar doğrultusunda işlenmektedir:</p>
                    <p>a. Şirket faaliyetleri doğrultusunda, web sitesi üzerinden gerçekleştirilecek ödeme işlemleri ile web sitesi üzerinden sunulan ürün ve hizmetlerden en iyi şekilde faydalanılmasını sağlamak,</p>
                    <p>b. Hizmet ve ürünlerin kalitesinin artırılmasına yönelik yapılacak olan satış, tanıtım ve pazarlama faaliyetleri için üyelere özel reklam, kampanya, avantajlar ve diğer faydaları sunmak...</p>

                </div>
            </div>
        </div>
    );
};

export default CommentsPopup;