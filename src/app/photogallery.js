import "../utils/fslightbox";
import data from "../data/images.json";

class Photogallery {
  createPhoto() {
    const WIDTH_PHOTO = "200";

    const divContainer = document.getElementById("photogallery");
    const gridLayout = document.createElement("div");
    gridLayout.classList.add("grid-layout");
    data.map((item) => {
      let hrefLightbox = document.createElement("a");
      hrefLightbox.setAttribute("data-fslightbox", "gallery");
      hrefLightbox.setAttribute("href", `${item.img}`);

      let srcImage = document.createElement("img");
      srcImage.setAttribute("src", `${item.img}`);
      srcImage.setAttribute("alt", `${item.alt}`);
      srcImage.setAttribute("width", WIDTH_PHOTO);
      hrefLightbox.append(srcImage);
      gridLayout.append(hrefLightbox);
    });

    divContainer.append(gridLayout);

    refreshFsLightbox();
  }
}

export default Photogallery;
