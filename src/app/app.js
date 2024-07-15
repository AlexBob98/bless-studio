import Header from "./head";
import Hero from "./hero";
import Uslugi from "./uslugi";
import Photogallery from "./photogallery";
import Contact from "./contact";
import Feedback from "./feedback";

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
        this.photogallery = new Photogallery;
        this.contact = new Contact;
     }

     init() {
        this.render.header();
        this.hero.heroSlider();
        this.uslugi.clickImage();;
        this.contact.contactForm();
        this.photogallery.createPhoto();
        this.feedback.feedBackForm();
     }
}