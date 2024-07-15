import Header from "./head";
import Hero from "./hero";
import Uslugi from "./uslugi";
import ImageGallery from "./photogallery";
// import Photogallery from "./photogallery";
import Contact from "./contact";
import Feedback from "./feedback";
import data from "../data/images.json";

export class App {
     render;
     hero;
     uslugi;
     advantages;
     feedback;
     photogallery;
     contact;

     constructor() {
        this.render = new Header;
        this.hero = new Hero;
        this.uslugi = new Uslugi;
        this.feedback = new Feedback;
        this.photogallery = new ImageGallery(data, 8);
        this.contact = new Contact;
     }

     init() {
        this.render.header();
        this.hero.heroSlider();
        this.uslugi.clickImage();;
        this.contact.contactForm();
        this.photogallery.createGallery();
        this.feedback.feedBackForm();
     }
}