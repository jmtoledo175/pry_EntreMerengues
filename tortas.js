fetch("tortas.json")
  .then(res => res.json())
  .then(tortas => mostrarCards(tortas))
  .catch(err => console.error("Error al cargar las tortas:", err));

function mostrarCards(productos) {
  const contenedor = document.getElementById("productos");
  const categoriasMostradas = new Set();

  productos.forEach((producto) => {
    if (!categoriasMostradas.has(producto.categoria)) {
      const productosPorCategoria = productos
        .filter((p) => p.categoria === producto.categoria)
       
      productosPorCategoria.forEach((p) => {
        const card = document.createElement("div");
        card.className = "card-producto";
        card.innerHTML = `
          <img src="${p.imagen}" class="img-producto" alt="${p.titulo}">
          <h3>${p.titulo}</h3>
          <p>${p.descripcion}</p>
          <p class="precio">$${p.precio}</p>
          <div class="contador">
            <button class="btn-menos">-</button>
            <span class="cantidad">0</span>
            <button class="btn-mas">+</button>
          </div>
          <button class="btn-merengue">Añadir al carrito</button>
        `;
        contenedor.appendChild(card);

    
        const btnMas = card.querySelector(".btn-mas");
        const btnMenos = card.querySelector(".btn-menos");
        const span = card.querySelector(".cantidad");
        let cantidad = 0;

        btnMas.onclick = () => (span.textContent = ++cantidad);
        btnMenos.onclick = () => {
          if (cantidad > 0) span.textContent = --cantidad;
        };
      });

      categoriasMostradas.add(producto.categoria);
    }
  });
}
