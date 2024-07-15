import TG from "../components/tg.js";
import IMask from "imask";

class SendTelegram {
  sendMessage() {
    const sendBtn = document.getElementById("send");

    sendBtn.addEventListener("click", () => {
      const result = [...document.querySelectorAll(".forms")].reduce(
        (acc, item) => (
          acc.push({
            id: item.id,
            value: item.value,
          }),
          acc
        ),
        []
      );
      const textFromForms = [];
      result.map((item) => {
        textFromForms.push(item.value);
      });
      this.sendMessageOnTG(textFromForms.join("%0A"));
    });
  }
  sendMessageOnTG(text) {
    const date = new Date();

    const url = `https://api.telegram.org/bot${TG.token}/sendMessage?chat_id=${
      TG.chat_id
    }&text=Запись с сайта BlessStudioSpb:%0AВремя заявки: ${date.toLocaleString()}%0A${text}`; // The url to request
    const xht = new XMLHttpRequest();
    xht.open("GET", url);
    xht.send();
  }
  maskPhone() {
    IMask(document.getElementById("telephone"), { mask: "+{7}(000)000-00-00" });
  }
  btnAnimation(buttonSend) {
    buttonSend.addEventListener("click", (e) => {
      e.preventDefault();
      buttonSend.innerHTML = `<span id="send-spinner" class="loading-spinner"></span>`;
      let bspinner = document.getElementById(buttonSend.id + "-spinner");

      bspinner.classList.add("spinner");

      setTimeout(() => {
        buttonSend.disabled = true;
        bspinner.classList.remove("spinner");
        buttonSend.innerHTML = "Отправлено";
        buttonSend.style.background = "#3587536e";
      }, 1000);

      setTimeout(() => {
        buttonSend.style.background = "";
        buttonSend.disabled = true;
        buttonSend.innerHTML = "Отправить";
      }, 4000);
    });
  }
  setReplacer(target, expression) {
    target.addEventListener("input", () => {
      const parsedValue = target.value.replace(expression, "");
      if (parsedValue !== target.value) {
        target.value = parsedValue;
      }
    });
  }
  validateForm(name, phone, e) {
    let words = 3;
    let number = 16;
    const counter = words - e.target.value.length;
    const res = counter === 1 ? "символа" : "символов";
    const btnSend =
      e.target.parentNode.parentNode.lastElementChild.firstChild.nextSibling;
    const checkWordsBelowThree =
      e.target.id === name && e.target.value.length <= words;
    const checkNumberBelowSixteen =
      e.target.id === phone && e.target.value.length <= number;
    const checkNumsAndWords =
      (e.target.id === name && e.target.value.length >= words) ||
      (e.target.id === phone && e.target.value.length === number);

    switch (true) {
      case checkWordsBelowThree:
        console.log(e.target.parentElement.parentElement)
        e.target.style.border = "2px solid #ff4646";
        e.target.parentNode.querySelector(".failure-icon").style.opacity = "1";
        e.target.parentNode.querySelector(".failure-icon").style.display =
          "flex";
        e.target.parentNode.querySelector(".success-icon").style.opacity = "0";
        e.target.parentNode.querySelector(".success-icon").style.display =
          "none";
        e.target.classList.remove("success");
        e.target.parentNode.lastElementChild.innerHTML = `Не хватает ${
          words - e.target.value.length
        } ${res}`;
        e.target.parentNode.parentNode.querySelector(".button").disabled = true;
        break;
      case checkNumberBelowSixteen:
        e.target.parentNode.lastElementChild.innerHTML = `Введите правильно телефон`;
        e.target.style.border = "2px solid #ff4646";
        e.target.parentNode.querySelector(".failure-icon").style.opacity = "1";
        e.target.parentNode.querySelector(".failure-icon").style.display =
          "flex";
        e.target.parentNode.querySelector(".success-icon").style.opacity = "0";
        e.target.parentNode.querySelector(".success-icon").style.display =
          "none";
        e.target.parentNode.parentNode.querySelector(".button").disabled = true;
        e.target.classList.remove("success");
        break;

      default:
    }
    switch (true) {
      case checkNumsAndWords:
        e.target.style.border = "2px solid #005300";
        e.target.classList.add("success");
        e.target.parentNode.querySelector(".failure-icon").style.opacity = "0";
        e.target.parentNode.querySelector(".failure-icon").style.display =
          "none";
        e.target.parentNode.querySelector(".success-icon").style.opacity = "1";
        e.target.parentNode.querySelector(".success-icon").style.display =
          "flex";
        e.target.parentNode.lastElementChild.innerHTML = "";
    }
    if (document.querySelectorAll(".success").length === 2) {
      btnSend.removeAttribute("disabled");
      btnSend.classList.add("active");
    }
    if (document.querySelectorAll(".success").length < 2) {
      btnSend.classList.remove("active");
    }
  }
}

export default SendTelegram;
