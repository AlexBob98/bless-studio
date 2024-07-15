import dataServices from "../data/dataServices.json";
import SendTelegram from "./sendTelegram.js";

class Feedback extends SendTelegram {
  feedBackForm() {
    const sendBtn = document.getElementById("send");
    const selectOptions = document.getElementById("options");

    dataServices.forEach((item) => {
      if (selectOptions) {
        selectOptions.innerHTML += `<option id="option" value="${item.text}">${item.text}</option>`;
      }
    });

    this.maskPhone();
    this.checkForm(sendBtn);
    this.sendMessage();
    this.btnAnimation(sendBtn);
  }

  checkForm(button) {
    let id = (id) => document.getElementById(id);
    const optionForm = id("options");
    const form = id("form");
    const phone = id("telephone");
    const name = id("name");

    this.setReplacer(name, /[^A-Za-zА-ЯЁа-яё\s]/g);
    phone.addEventListener("click", (event) => {
      if (event.target.value === "") {
        phone.value = `+7`;
      }
    });
    
    button.addEventListener("click", (e) => {
      setTimeout(()=> {
        name.value = '';
        phone.value = ''
        e.target.parentNode.parentNode.querySelectorAll(".success-icon").forEach((icon) => icon.style.opacity = "0");
        e.target.parentNode.parentNode.querySelectorAll('input.success').forEach((input) => input.style.border = '');
        optionForm.selectedIndex = 0
        phone.classList.remove("success");
      }, 1000);

      e.preventDefault();

      e.target.classList.remove('active');
     
    });

    form.addEventListener("input", (e) => {
      this.validateForm("name", "telephone", e);
    });
  
  }
 
}
export default Feedback;
