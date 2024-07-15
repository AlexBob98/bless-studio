class Hero {
  heroSlider() {
    const navbarMenu = document.getElementById("menu");
    const burgerMenu = document.getElementById("burger");
    const headerMenu = document.getElementById("header");
    const bodyMain = document.querySelector('body');
    
    if (burgerMenu && navbarMenu) {
      burgerMenu.addEventListener("click", () => {
        burgerMenu.classList.toggle("is-active");
        navbarMenu.classList.toggle("is-active");
        bodyMain.classList.toggle("active");
      });
    }

    document.querySelectorAll(".menu-link").forEach((link) => {
      link.addEventListener("click", () => {
        burgerMenu.classList.remove("is-active");
        navbarMenu.classList.remove("is-active");
        bodyMain.classList.remove("active");
      });
    });

    window.addEventListener("scroll", () => {
      
      if (window.scrollY >= 45) {
        // headerMenu.classList.add("on-scroll");
      } else {
        // headerMenu.classList.remove("on-scroll");
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        if (navbarMenu.classList.contains("is-active")) {
          navbarMenu.classList.remove("is-active");
        }
      }
    });
  }
}

export default Hero;
