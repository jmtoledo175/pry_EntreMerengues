const productos = [
  {
    titulo: "Chocotorta",
    descripcion: "Clásico argentino con dulce de leche y galletitas.",
    precio: 4500,
    imagen: "assets/images/chocotorta.jpg"
  },
  {
    titulo: "Lemon Pie",
    descripcion: "Base crocante con crema de limón y merengue.",
    precio: 4800,
    imagen: "assets/images/lemonpie.jpg"
  },
  {
    titulo: "Carrot Cake",
    descripcion: "Torta de zanahoria con frosting de queso.",
    precio: 4900,
    imagen: "assets/images/carrot.jpg"
  }
];


function mostrarCards(productos) {
  const contenedor = document.getElementById("productos");

  productos.forEach(producto => {
    const card = document.createElement("div");
    card.className = "card-producto";

    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.titulo}" class="img-producto">
      <h3>${producto.titulo}</h3>
      <p>${producto.descripcion}</p>
      <p class="precio">$${producto.precio}</p>
      <div class="contador">
        <button class="btn-menos">-</button>
        <span class="cantidad">0</span>
        <button class="btn-mas">+</button>
      </div>
    `;

    contenedor.appendChild(card);

   
  });
}

mostrarCards(productos);