import * as ymaps3 from "ymaps3";

class Contact {
  async contactForm() {

    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3;
    const RESTRICT_AREA = [[30.456500797228337, 59.962979779308654],[30.477100162462705, 59.96857397396517]];
    const map = new YMap(document.getElementById("map"), {
      location: {
        center: [30.467621, 59.965264],
        restrictMapArea: [RESTRICT_AREA],
        zoom: 17,
      },
      behaviors: ["drag"],
    });

    const imageIcon = document.createElement("img");
    imageIcon.className = "marker";
    imageIcon.style.maxWidth = "130px";
    imageIcon.src = "images/icons/bless-studio.png";
    imageIcon.title = "Химиков 2 стр 2";

    const marker = new YMapMarker({ coordinates: [30.4665, 59.9657] },imageIcon);

    map.addChild(new YMapDefaultFeaturesLayer());
    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(marker);
  }
}

export default Contact;
