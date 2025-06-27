function mostrarCards(productos) {
  const contenedor = document.getElementById("productos");
  const categoriasMostradas = new Set();

  productos.forEach((producto) => {
    if (!categoriasMostradas.has(producto.categoria)) {
      const productosPorCategoria = productos.filter(
        (p) => p.categoria === producto.categoria
      );

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
            <span class="cantidad">1</span> 
            <button class="btn-mas">+</button>
          </div>
          <button class="btn-agregar" data-id="${p.id}">Agregar al carrito</button>
        `;
        contenedor.appendChild(card);

        const btnMas = card.querySelector(".btn-mas");
        const btnMenos = card.querySelector(".btn-menos");
        const span = card.querySelector(".cantidad");

        btnMas.onclick = () => {
          let cant = parseInt(span.textContent);
          span.textContent = cant + 1;
        };

        btnMenos.onclick = () => {
          let cant = parseInt(span.textContent);
          if (cant > 1) span.textContent = cant - 1;
        };

        const btnAgregar = card.querySelector(".btn-agregar");
        btnAgregar.addEventListener("click", (e) => {
          const id = e.target.dataset.id;
          const cardActual = e.target.closest(".card-producto");
          const spanCantidad = cardActual.querySelector(".cantidad");
          const cantidad = parseInt(spanCantidad.textContent);

          const producto = productos.find((p) => p.id == id);
          if (producto && cantidad > 0) {
            agregarAlCarritoConCantidad(producto, cantidad);
            mostrarMensajeAgregado();
          }
        });
      });

      categoriasMostradas.add(producto.categoria);
    }
  });
}
function mostrarMensajeAgregado() {
  const div = document.createElement("div");
  div.textContent = "✅ Producto añadido al carrito";
  div.style.position = "fixed";
  div.style.bottom = "20px";
  div.style.right = "20px";
  div.style.background = "#e94f7c";
  div.style.color = "white";
  div.style.padding = "10px 20px";
  div.style.borderRadius = "10px";
  div.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
  div.style.zIndex = "9999";
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 2000);
}

function agregarAlCarritoConCantidad(producto, cantidadNueva) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const existente = carrito.find((p) => p.id === producto.id);
  if (existente) {
    existente.cantidad += cantidadNueva;
  } else {
    const productoParaCarrito = { ...producto, cantidad: cantidadNueva };
    carrito.push(productoParaCarrito);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarritoUI();
}

fetch("productos.json")
  .then((res) => res.json())
  .then((productos) => {
    mostrarCards(productos);
    actualizarCarritoUI();
  })
  .catch((error) => console.error("Error al cargar productos:", error));

function actualizarCarritoUI() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const contador = document.getElementById("cart-count");
  if (contador) {
    contador.textContent = `(${total})`;
  }
}
