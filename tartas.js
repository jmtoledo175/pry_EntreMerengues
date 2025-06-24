const productos = [
  {
    titulo: "Tarta de Manzana",
    descripcion: " Se prepara con una base de masa quebrada, y se rellena con manzanas caramelizadas.",
    precio: 4500,
    imagen: "assets/images/tarta-manzana.jpg"
  },
  
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