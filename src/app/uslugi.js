class Uslugi {
  clickImage() {
    const currentImage = document.querySelectorAll(".card-image");
    
    currentImage.forEach((item) => {
      item.addEventListener("click", (event) => {
        const form = document.getElementById("contacts");
        const name = item.firstChild.nextSibling.getAttribute("alt");
        const options = document.getElementById("options");
        
        if (event.target.classList.contains("fa-brands")) {
          options.value = name;
          form.scrollIntoView({ behavior: "smooth" });
        }
        
      });
    });
  }
}

export default Uslugi;
