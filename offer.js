class DataManager {
    
    static getOffers() { return JSON.parse(localStorage.getItem('tv3_offers')) || []; }
    static addOffer(offer) {
        const offers = DataManager.getOffers();
        offer.id = Date.now();
        offers.push(offer);
        localStorage.setItem('tv3_offers', JSON.stringify(offers));
    }
    static removeOffer(id) {
        let offers = DataManager.getOffers();
        offers = offers.filter(o => o.id !== id);
        localStorage.setItem('tv3_offers', JSON.stringify(offers));
    }
    static clearOffersOnly() { localStorage.removeItem('tv3_offers'); }

    
    static getAgencyInfo() {
        return JSON.parse(localStorage.getItem('tv3_agency')) || {
            name: "Acenteniz",
            contact: "İletişim Bilgileri Girilmedi"
        };
    }
    static saveAgencyInfo(info) { localStorage.setItem('tv3_agency', JSON.stringify(info)); }

    static getList(key) {
        
        return JSON.parse(localStorage.getItem(`tv3_list_${key}`)) || [];
    }
    static addItemToList(key, item) {
        const list = DataManager.getList(key);
        if(!list.includes(item) && item.trim() !== "") {
            list.push(item);
            localStorage.setItem(`tv3_list_${key}`, JSON.stringify(list));
        }
    }
    static removeItemFromList(key, item) {
        let list = DataManager.getList(key);
        list = list.filter(i => i !== item);
        localStorage.setItem(`tv3_list_${key}`, JSON.stringify(list));
    }

    
    static getTemplates() {
        return JSON.parse(localStorage.getItem('tv3_templates')) || [];
    }
    static saveTemplate(company, product, features) {
        let templates = DataManager.getTemplates();
        
        const index = templates.findIndex(t => t.company === company && t.product === product);
        if(index > -1) {
            templates[index].features = features;
        } else {
            templates.push({ id: Date.now(), company, product, features });
        }
        localStorage.setItem('tv3_templates', JSON.stringify(templates));
    }
    static findTemplate(company, product) {
        const templates = DataManager.getTemplates();
        return templates.find(t => t.company === company && t.product === product);
    }
    static removeTemplate(id) {
        let templates = DataManager.getTemplates();
        templates = templates.filter(t => t.id !== id);
        localStorage.setItem('tv3_templates', JSON.stringify(templates));
    }

    
    static exportData() {
        const data = {
            agency: DataManager.getAgencyInfo(),
            companies: DataManager.getList('company'),
            products: DataManager.getList('product'),
            templates: DataManager.getTemplates()
        };
        const dataStr = JSON.stringify(data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `TeklifSihirbazi_Yedek_${new Date().toLocaleDateString()}.json`;
        a.click();
    }

    static importData(input) {
        const file = input.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                if(data.agency) localStorage.setItem('tv3_agency', JSON.stringify(data.agency));
                if(data.companies) localStorage.setItem('tv3_list_company', JSON.stringify(data.companies));
                if(data.products) localStorage.setItem('tv3_list_product', JSON.stringify(data.products));
                if(data.templates) localStorage.setItem('tv3_templates', JSON.stringify(data.templates));
                alert("Yedek başarıyla yüklendi! Sayfa yenileniyor...");
                location.reload();
            } catch(err) { alert("Hatalı dosya formatı!"); }
        };
        reader.readAsText(file);
    }

    static factoryReset() {
        if(confirm("TÜM VERİLER (Şirketler, Ürünler, Ayarlar) SİLİNECEK! Emin misiniz?")) {
            localStorage.clear();
            location.reload();
        }
    }
}