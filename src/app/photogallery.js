import "../utils/fslightbox";
class ImageGallery {
  constructor(images, itemsPerPage) {
    this.images = images;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = parseInt(localStorage.getItem("currentPage")) || 1;
    this.galleryElement = document.getElementById("gallery");
    this.loaderElement = document.getElementById("loader");
    this.paginationElement = document.getElementById("pagination");
    this.totalPages = Math.ceil(this.images.length / this.itemsPerPage);
    this.createGallery();
  }

  showLoader() {
    this.loaderElement.style.display = "block";
  }

  hideLoader() {
    this.loaderElement.style.display = "none";
  }

  updateGalleryHeight() {
    requestAnimationFrame(() => {
      const currentPageImagesCount = Math.min(this.itemsPerPage, this.images.length - (this.currentPage - 1) * this.itemsPerPage);
      this.galleryElement.style.height = currentPageImagesCount >= 5 ? "" : "";
    });
  }

  renderGallery() {
    this.showLoader();
    this.galleryElement.classList.add("hidden");
    requestAnimationFrame(() => {
      this.galleryElement.innerHTML = "";
      this.galleryElement.classList.add("grid-layout");
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const pageImages = this.images.slice(start, start + this.itemsPerPage);
      const fragment = document.createDocumentFragment();
      pageImages.forEach((src) => {
        const img = document.createElement("img");
        const hrefLink = document.createElement("a");
        hrefLink.setAttribute("data-fslightbox", "gallery");
        hrefLink.setAttribute("href", src.img);
        img.src = src.img;
        img.alt = src.alt;
        img.width = "200";
        img.classList.add("fade-in");
        hrefLink.appendChild(img);
        fragment.appendChild(hrefLink);
      });
      this.galleryElement.appendChild(fragment);
      refreshFsLightbox();
      this.galleryElement.classList.remove("hidden");
      this.updateGalleryHeight();
      this.hideLoader();
    });
  }

  renderPagination() {
    if (this.images.length <= this.itemsPerPage) {
      this.paginationElement.style.display = "none";
      return;
    }
    this.paginationElement.innerHTML = "";

    const createButton = (text, isActive, isDisabled, onClick) => {
      const button = document.createElement("button");
      button.classList.add("photo-gallery-pagination");
      button.textContent = text;
      button.classList.toggle("active", isActive);
      button.disabled = isDisabled;
      button.addEventListener("click", onClick);
      return button;
    };

    const addPageButton = (page) => {
      this.paginationElement.appendChild(
        createButton(page, page === this.currentPage, page === this.currentPage, () => {
          if (this.currentPage !== page) {
            this.currentPage = page;
            localStorage.setItem("currentPage", page);
            this.renderGallery();
            this.renderPagination();
            this.galleryElement.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });
          }
        })
      );
    };

    if (this.currentPage > 1) {
      this.paginationElement.appendChild(
        createButton("<", false, false, () => {
          this.currentPage--;
          localStorage.setItem("currentPage", this.currentPage);
          this.renderGallery();
          this.renderPagination();
          this.galleryElement.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        })
      );
    }

    if (this.totalPages <= 5) {
      for (let i = 1; i <= this.totalPages; i++) {
        addPageButton(i);
      }
    } else {
      if (this.currentPage > 2) {
        addPageButton(1);
        if (this.currentPage > 3) {
          this.paginationElement.appendChild(createButton("...", false, true, null));
        }
      }

      const startPage = Math.max(1, this.currentPage - 1);
      const endPage = Math.min(this.totalPages, this.currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        addPageButton(i);
      }

      if (this.currentPage < this.totalPages - 2) {
        if (this.currentPage < this.totalPages - 3) {
          this.paginationElement.appendChild(createButton("...", false, true, null));
        }
        addPageButton(this.totalPages);
      }
    }

    if (this.currentPage < this.totalPages) {
      this.paginationElement.appendChild(
        createButton(">", false, false, () => {
          this.currentPage++;
          localStorage.setItem("currentPage", this.currentPage);
          this.renderGallery();
          this.renderPagination();
          this.galleryElement.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        })
      );
    }
  }

  createGallery() {
    this.renderGallery();
    this.renderPagination();
  }
}

export default ImageGallery;
