import telephone from "../components/main.js";

class Header{
  header() {
    this.addPhone();
    this.addSocial();
    this.addColor()
  }
  addColor() {
    const colorPhone = document.querySelector('.telephone i');
    const date = new Date().getHours();
    if (date > 9 && date < 19) {
      colorPhone.style.color = '#42d446'
    } else {
      colorPhone.style.color = '#c60000'
    }
  }
  addPhone() {

    const telephoneContent = document.querySelectorAll(".phone");
    telephoneContent.forEach((phone) => {
      if (!phone) {
        phone.textContent = "+7 (931) 245-01-71";
      }
      phone.textContent = telephone;
    });
  }
  addSocial() {
    const info = {
      instagram: ["fa-brands fa-instagram", "https://www.instagram.com/bless.studio.spb/"],
      telegram: ["fa-brands fa-telegram", "https://t.me/Denis_Detailing"],
      whatsapp: ["fa-brands fa-whatsapp", "https://wa.me/79312450171"],
      mail: ["fa-regular fa-envelope mail", "mailto:avtolider2013@gmail.com"]
    }
    const socials = document.querySelectorAll(".links-soc");
    const regexp = /[a-zA-Z]*$/gmi
    
    Object.values(info).forEach((socialName) => {
      socials.forEach((item) => {
        item.innerHTML += `<a href="${socialName[1]}" target="_blank" title="${socialName[0].match(regexp)[0].toUpperCase()}">
        <i class="${socialName[0]}"></i>
        </a>`;
      });
    })
  }
}

export default Header;
