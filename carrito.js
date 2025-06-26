document.addEventListener("DOMContentLoaded", () => {
  mostrarCarrito();
  actualizarCarritoUI();

  document.getElementById("vaciar-carrito").addEventListener("click", () => {
    localStorage.removeItem("carrito");
    mostrarCarrito();
    actualizarCarritoUI();
  });
});

function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contenedor = document.getElementById("contenedor-carrito");
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>El carrito está vacío.</p>";
    document.getElementById("total").textContent = "Total: $0";
    return;
  }

  let total = 0;

  carrito.forEach((producto, index) => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    const div = document.createElement("div");
    div.className = "item-carrito";
    div.innerHTML = `
      <p><strong>${producto.titulo}</strong></p>
      <p>Cantidad: ${producto.cantidad}</p>
      <p>Precio unitario: $${producto.precio}</p>
      <p>Subtotal: $${subtotal}</p>
      <button class="eliminar-item" data-index="${index}">Eliminar</button>
      <hr>
    `;
    contenedor.appendChild(div);
  });

  document.getElementById("total").textContent = `Total: $${total}`;

  document.querySelectorAll(".eliminar-item").forEach(btn => {
    btn.addEventListener("click", e => {
      const i = e.target.dataset.index;
      eliminarDelCarrito(i);
    });
  });
}

function eliminarDelCarrito(index) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
  actualizarCarritoUI();
}

function actualizarCarritoUI() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const span = document.getElementById("cart-count");
  if (span) span.textContent = `(${total})`;
}
