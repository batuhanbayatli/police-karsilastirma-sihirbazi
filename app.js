document.addEventListener('DOMContentLoaded', () => {
    UI.populateDropdowns(); 
    UI.displayOffers();     
});


document.getElementById('offer-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const offer = {
        company: document.getElementById('company-select').value,
        product: document.getElementById('product-select').value,
        price: document.getElementById('price').value,
        features: document.getElementById('feature').value,
        isRecommended: document.getElementById('is-recommended').checked
    };

    if(!offer.company || !offer.product) {
        alert("Lütfen Şirket ve Ürün seçiniz.");
        return;
    }

    DataManager.addOffer(offer);
    UI.displayOffers();
    
    // Form temizle (Kısmi)
    document.getElementById('price').value = '';
    document.getElementById('feature').value = '';
    document.getElementById('is-recommended').checked = false;
});


document.getElementById('presentation-btn').addEventListener('click', UI.togglePresentationMode);
document.addEventListener('keydown', (e) => { if (e.key === "Escape" && document.body.classList.contains('presentation-mode')) UI.togglePresentationMode(); });
document.getElementById('client-name').addEventListener('input', (e) => { 
    const val = e.target.value;
    if(document.getElementById('display-client')) document.getElementById('display-client').innerText = `Sayın ${val} İçin Özel Teklifler`; 
});


const modal = document.getElementById('settings-modal');
const settingsBtn = document.getElementById('settings-btn');
const closeModal = document.getElementsByClassName("close-modal")[0];

settingsBtn.onclick = () => {
    UI.loadSettingsToModal(); 
    modal.style.display = "block";
}
closeModal.onclick = () => modal.style.display = "none";
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; }