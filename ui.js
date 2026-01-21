class UI {
    static displayOffers() {
        const container = document.getElementById('cards-container');
        container.innerHTML = '';
        const offers = DataManager.getOffers();
        const agency = DataManager.getAgencyInfo();

        document.getElementById('footer-agency-name').innerText = `🛡️ ${agency.name}`;
        document.getElementById('footer-agency-contact').innerText = `📞 ${agency.contact}`;

        if(offers.length === 0) {
            container.innerHTML = '<div style="color:#aaa; text-align:center; width:100%; margin-top:50px;">Henüz teklif eklenmedi.<br>Sol taraftan ekleyebilirsiniz.</div>';
            return;
        }

        offers.forEach(offer => {
            const card = document.createElement('div');
            let cardClass = 'offer-card';
            let badgeHTML = '';
            
            if (offer.isRecommended) {
                cardClass += ' recommended';
                badgeHTML = '<div class="badge">⭐ Tavsiye Edilen</div>';
            }
            const formattedPrice = Number(offer.price).toLocaleString('tr-TR');

            card.className = cardClass;
            card.innerHTML = `
                ${badgeHTML}
                <div style="font-weight:bold; font-size:1.1rem; color:#333;">${offer.company}</div>
                <div style="color:#777; font-size:0.9rem; margin-bottom:5px;">${offer.product}</div>
                <div class="price">${formattedPrice} ₺</div>
                <div style="background:#f8f9fa; padding:8px; font-size:0.85rem; border-radius:4px; color:#555;">${offer.features}</div>
                <button class="btn-clear no-print" onclick="deleteOffer(${offer.id})" style="background:none; color:red; margin-top:10px; font-size:0.8rem; width:auto;">
                   <i class="fa-solid fa-trash"></i> Sil
                </button>
            `;
            container.appendChild(card);
        });

        const clientName = document.getElementById('client-name').value;
        if(clientName) document.getElementById('display-client').innerText = `Sayın ${clientName} İçin Özel Teklifler`;
    }

    static populateDropdowns() {
        const companies = DataManager.getList('company');
        const products = DataManager.getList('product');
        
        
        const cSelect = document.getElementById('company-select');
        const pSelect = document.getElementById('product-select');
        
        
        const tCSelect = document.getElementById('tmpl-company');
        const tPSelect = document.getElementById('tmpl-product');

        
        const fill = (sel, list) => {
            const current = sel.value;
            sel.innerHTML = '<option value="" disabled selected>Seçiniz...</option>' + 
                            list.map(i => `<option value="${i}">${i}</option>`).join('');
            if(list.includes(current)) sel.value = current;
        };

        fill(cSelect, companies); fill(pSelect, products);
        fill(tCSelect, companies); fill(tPSelect, products);
    }

    
    static checkTemplate() {
        const comp = document.getElementById('company-select').value;
        const prod = document.getElementById('product-select').value;
        
        if(comp && prod) {
            const tmpl = DataManager.findTemplate(comp, prod);
            if(tmpl) {
                document.getElementById('feature').value = tmpl.features;
                
                const featureBox = document.getElementById('feature');
                featureBox.style.borderColor = '#27ae60';
                setTimeout(() => featureBox.style.borderColor = '#ccc', 1000);
            }
        }
    }

    
    static sendEmail() {
        const client = document.getElementById('client-name').value || "Müşteri";
        const offers = DataManager.getOffers();
        const agency = DataManager.getAgencyInfo();
        
        if(offers.length === 0) { alert("Mail göndermek için önce teklif ekleyin."); return; }

        let body = `Sayın ${client},\n\nAcenteniz ${agency.name} olarak sizin için hazırladığımız teklifler aşağıdadır:\n\n`;
        
        offers.forEach(o => {
            body += `--------------------------------\n`;
            body += `FİRMA: ${o.company}\n`;
            body += `ÜRÜN: ${o.product}\n`;
            body += `FİYAT: ${Number(o.price).toLocaleString('tr-TR')} TL\n`;
            body += `ÖZELLİKLER: ${o.features}\n`;
            if(o.isRecommended) body += `(⭐ TAVSİYE EDİLEN)\n`;
        });

        body += `\n--------------------------------\n`;
        body += `Detaylı bilgi için bizimle iletişime geçebilirsiniz.\n\n${agency.name}\n${agency.contact}`;

        const subject = encodeURIComponent(`${client} - Sigorta Teklif Çalışması`);
        const bodyEncoded = encodeURIComponent(body);
        
        window.open(`mailto:?subject=${subject}&body=${bodyEncoded}`);
    }

    
    static resetSession() {
        if(confirm("Ekran temizlensin mi? (Ayarlarınız silinmez)")) {
            document.getElementById('offer-form').reset();
            DataManager.clearOffersOnly();
            UI.displayOffers();
        }
    }
    
    static clearOffersOnly() {
        if(confirm("Sadece ekrandaki teklifler silinsin mi?")) {
            DataManager.clearOffersOnly();
            UI.displayOffers();
        }
    }

    
    static loadSettingsToModal() {
        const agency = DataManager.getAgencyInfo();
        document.getElementById('set-agency-name').value = agency.name;
        document.getElementById('set-agency-contact').value = agency.contact;
        
        UI.renderList('company-list', 'company');
        UI.renderList('product-list', 'product');
        UI.renderTemplates();
    }

    static renderList(elId, key) {
        const list = DataManager.getList(key);
        document.getElementById(elId).innerHTML = list.map(item => `
            <li>${item} <span onclick="removeItem('${key}', '${item}')" style="color:red; cursor:pointer;">&times;</span></li>
        `).join('');
    }

    static renderTemplates() {
        const list = DataManager.getTemplates();
        document.getElementById('template-list').innerHTML = list.map(t => `
            <li>
                <div style="font-size:0.85rem;"><b>${t.company} - ${t.product}</b><br>${t.features}</div>
                <span onclick="removeTemplate(${t.id})" style="color:red; cursor:pointer;">&times;</span>
            </li>
        `).join('');
    }

    static openTab(evt, tabName) {
        const contents = document.getElementsByClassName("tab-content");
        for(let c of contents) c.style.display = "none";
        const links = document.getElementsByClassName("tab-link");
        for(let l of links) l.className = l.className.replace(" active", "");
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
    }

    static togglePresentationMode() {
        document.body.classList.toggle('presentation-mode');
        if (document.body.classList.contains('presentation-mode')) {
            alert("Sunum Modu! Çıkmak için ESC'ye bas.");
        }
    }
}


window.deleteOffer = (id) => { if (!document.body.classList.contains('presentation-mode')) { DataManager.removeOffer(id); UI.displayOffers(); }};
window.saveAgencySettings = () => {
    const info = { name: document.getElementById('set-agency-name').value, contact: document.getElementById('set-agency-contact').value };
    DataManager.saveAgencyInfo(info); UI.displayOffers(); alert("Bilgiler kaydedildi!");
};
window.addCustomItem = (type) => { 
    const input = document.getElementById(type === 'company' ? 'new-company' : 'new-product');
    if(input.value) {
        DataManager.addItemToList(type, input.value);
        UI.renderList(type + '-list', type); UI.populateDropdowns();
        input.value = '';
    }
};
window.removeItem = (key, item) => {
    if(confirm("Silinsin mi?")) { DataManager.removeItemFromList(key, item); UI.renderList(key + '-list', key); UI.populateDropdowns(); }
};
window.saveTemplate = () => {
    const c = document.getElementById('tmpl-company').value;
    const p = document.getElementById('tmpl-product').value;
    const f = document.getElementById('tmpl-features').value;
    if(c && p && f) {
        DataManager.saveTemplate(c, p, f); UI.renderTemplates(); alert("Otomasyon kuralı eklendi!");
    } else { alert("Lütfen tüm alanları doldurun."); }
};
window.removeTemplate = (id) => {
    if(confirm("Kural silinsin mi?")) { DataManager.removeTemplate(id); UI.renderTemplates(); }
};