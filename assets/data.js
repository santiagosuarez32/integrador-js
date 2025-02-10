const productsData = [
  {
    id: 1,
    name: "Auriculares",
    precio: 800,
    descripcion: "Auriculares para tener la mejor experiencia gamer",
    category: "perifericos",
    cardImg: "assets/img/products/auriculares.webp",
  },
  {
    id: 2,
    name: "Cooler CPU",
    precio: 760,
    descripcion: "Ideal para la refrigeración y mantenimiento del cpu",
    category: "hardware",
    cardImg: "assets/img/products/cooler.jpg",
  },
  {
    id: 3,
    name: "Pad Gamer",
    precio: 330,
    descripcion: "Ideal para tener la mayor comodidad en tu set-up",
    category: "perifericos",
    cardImg: "assets/img/products/pad.jpg",
  },
  {
    id: 4,
    name: "Disco HDD",
    precio: 560,
    descripcion: "Adquiere mayor velocidad de lectura en tu Pc",
    category: "hardware",
    cardImg: "assets/img/products/disco-hdd.webp",
  },
  {
    id: 5,
    name: "Disco SSD",
    precio: 670,
    descripcion: "La mejor opción si deseas tener velocidad en tu Pc",
    category: "hardware",
    cardImg: "assets/img/products/disco-ssd.jpg",
  },
  {
    id: 6,
    name: "Fuente",
    precio: 780,
    descripcion: "Alimenta y optimiza tus componentes con esta fuente",
    category: "hardware",
    cardImg: "assets/img/products/fuente-de-poder.webp",
  },
  {
    id: 7,
    name: "Intel I13",
    precio: 653,
    descripcion: "Obtiene la mayor velocidad en tu Pc con esta opción",
    category: "hardware",
    cardImg: "assets/img/products/intel.webp",
  },
  {
    id: 8,
    name: "Gabinete",
    precio: 700,
    descripcion: "Ensambla y organiza tus componentes Gaming",
    category: "perifericos",
    cardImg: "assets/img/products/gabinete.jpg",
  },
  {
    id: 9,
    name: "Tarjeta de video",
    precio: 800,
    descripcion: "Disfruta de los mejores juegos con esta opción",
    category: "hardware",
    cardImg: "assets/img/products/tarjeta-de-video.jpg",
  },
  {
    id: 10,
    name: "Memoria Ram",
    precio: 670,
    descripcion: "Obtiene el mejor desempeño en tus juegos",
    category: "hardware",
    cardImg: "assets/img/products/memory.jpg",
  },
  {
    id: 11,
    name: "Monitor",
    precio: 700,
    descripcion: "Ideal para tener una mejor experiencia Gaming",
    category: "perifericos",
    cardImg: "assets/img/products/monitor.webp",
  },
  {
    id: 12,
    name: "Mouse",
    precio: 820,
    descripcion: "Mejora tu jugabilidad y competitividad",
    category: "perifericos",
    cardImg: "assets/img/products/mouse.jpeg",
  },
  {
    id: 13,
    name: "Placa madre",
    precio: 125,
    descripcion: "Mayor compatibilidad con nuevos componentes",
    category: "hardware",
    cardImg: "assets/img/products/placa-madre.jpg",
  },
  {
    id: 14,
    name: "Cámara PC",
    precio: 350,
    descripcion: "Ideal para refrigerar tus componentes",
    category: "perifericos",
    cardImg: "assets/img/products/camara.jpg",
  },
  {
    id: 15,
    name: "Microfono PC",
    precio: 170,
    descripcion: "Tarjeta de video potente y ideal para gaming",
    category: "perifericos",
    cardImg: "assets/img/products/microfono.jpg",
  },

  {
    id: 16,
    name: "Teclado Gamer",
    precio: 220,
    descripcion: "Mejor jugabilidad y diseño en tus juegos",
    category: "perifericos",
    cardImg: "assets/img/products/teclado-mecanico.webp",
  },
];

const divideProductsInParts = (size) => {
  let productList = [];

  for (let i = 0; i < productsData.length; i += size) {
    productList.push(productsData.slice(i, i + size));
  }
  return productList;
};

const PRODUCTS_SIZE = 4;

const appState = {
  products: divideProductsInParts(PRODUCTS_SIZE),
  productsLimit: divideProductsInParts(PRODUCTS_SIZE).length,
  currentProductsIndex: 0,
  activeFilter: null,
};

// console.log({ appState });
