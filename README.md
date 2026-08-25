# 🚀 Poliçe Teklif Karşılaştırma Sihirbazı // Akıllı Satış & Vitrin Motoru
> **bGroup // SigortamRahat × DATEX Tasarım**  
> *Sigorta Acenteleri İçin Sunucusuz, LocalStorage Tabanlı Hızlı Teklif Karşılaştırma, Sunum Modu ve A4 PDF Raporlama Aracı*

<p align="left">
  <a href="https://police-karsilastirma-sihirbazi.vercel.app/"><img src="https://img.shields.io/badge/Canlı%20Demo-Vercel-2563eb?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel Canlı Demo"></a>
  <img src="https://img.shields.io/badge/Ecosystem-bGroup-0f172a?style=for-the-badge" alt="bGroup">
  <img src="https://img.shields.io/badge/Partners-SigortamRahat%20%C3%97%20DATEX-2563eb?style=for-the-badge" alt="Marka İş Birliği">
  <img src="https://img.shields.io/badge/Storage-LocalStorage%20%2F%20Client--Side-059669?style=for-the-badge" alt="LocalStorage">
  <img src="https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge" alt="License">
</p>

---

## 📌 Proje Özeti

**Poliçe Teklif Karşılaştırma Sihirbazı**, sigorta acentelerinin müşterilerine sundukları fiyat tekliflerini karmaşık Excel tabloları veya düzensiz WhatsApp mesajları yerine kurumsal, anlaşılır ve şık bir karşılaştırma kartına dönüştüren **sunucusuz (Serverless & Client-Side)** bir satış destek aracıdır.

Kullanıcı arayüzü; hızlı teklif girişi, müşteri önünde tek tuşla açılan **Sunum Modu (Vitrin)**, A4 boyutunda temiz PDF/Yazdırma çıktısı, otomatik e-posta taslağı oluşturucu ve şirket-ürün bazlı akıllı teminat otomasyonu sunar[cite: 7].

---

## ✨ Öne Çıkan Özellikler

* ⚡ **Hızlı Teklif Girişi:** Müşteri adı/plaka, sigorta şirketi, branş, teminatlar ve fiyatı saniyeler içinde ekleme[cite: 7].
* ⭐ **Tavsiye Edilen Teklif Vurgusu:** Belirlenen teklifi öne çıkaran özel rozet ve görsel hiyerarşi[cite: 5, 7].
* 🖥️ **Sunum Modu (Vitrin):** Tek tuşla veya `ESC` kısayoluyla sol yönetim panelini gizleyip ekranda yalnızca müşteriye özel şık fiyat kartlarını bırakma[cite: 4, 7].
* 🧠 **Akıllı Özellik Otomasyonu:** Şirket ve ürün eşleşmesi seçildiğinde (Örn: *Allianz + Kasko*), tanımlı poliçe teminatlarını otomatik doldurma[cite: 7].
* 🖨️ **A4 PDF & Yazdırma Mizanpajı:** `@media print` mimarisiyle gereksiz butonları gizleyerek müşteriye verilecek temiz bir A4 teklif karşılaştırma formu üretme[cite: 7, 8].
* 📧 **Otomatik E-Posta Taslağı:** Eklenen tüm teklifleri tek tıkla düzenli bir e-posta metnine dönüştürüp `mailto:` protokolüyle açma[cite: 7, 9].
* 💾 **%100 Yerel Veri & Yedekleme:** Veriler tarayıcının yerel hafızasında (`LocalStorage`) saklanır; JSON olarak dışa aktarılabilir (Export) ve geri yüklenebilir (Import)[cite: 6, 7].

---

## 🛠️ Teknoloji Yığını

* **Arayüz / Tasarım:** Semantic HTML5, Modern CSS3 Flexbox & Grid, FontAwesome 6[cite: 5, 7, 8]
* **Baskı & Sunum:** CSS3 `@media print`, Presentation Mode Layout[cite: 8, 9]
* **Mantık & Veri Motoru:** Vanilla ES6+ JavaScript (`DataManager`, `UI` sınıfları)[cite: 6, 7, 9]
* **Depolama:** Web Storage API (`localStorage`)[cite: 6, 7]
* **Dağıtım / CI-CD:** Vercel Edge Network

---

## 🚀 Yerel Kurulum ve Çalıştırma

```bash
# Repoyu klonlayın
git clone [https://github.com/batuhanbayatli/police-karsilastirma-sihirbazi.git](https://github.com/batuhanbayatli/police-karsilastirma-sihirbazi.git)

# Proje dizinine geçin
cd police-karsilastirma-sihirbazi

# index.html dosyasını doğrudan tarayıcınızda açın veya canlı demoyu ziyaret edin:
# [https://police-karsilastirma-sihirbazi.vercel.app/](https://police-karsilastirma-sihirbazi.vercel.app/)
