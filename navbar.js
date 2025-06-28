const estaEnPrivado = window.location.pathname.includes("/privado/");
const base = estaEnPrivado ? "../" : "";

const paginas = [
  { titulo: "Inicio", url: base + "index.html" },
  { titulo: "Tortas", url: base + "tortas.html" },
  { titulo: "Tartas", url: base + "tartas.html" },
  { titulo: "Budines", url: base + "budines.html" },
];

function crearNavbar(paginas) {
  const ul = document.getElementById("nav-links");

  paginas.forEach((pagina) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = pagina.url;
    link.textContent = pagina.titulo;
    li.appendChild(link);
    ul.appendChild(li);
  });

  const liSesion = document.createElement("li");
  const linkSesion = document.createElement("a");

  const estaLogueado = localStorage.getItem("logueado");

  if (estaLogueado) {
    linkSesion.href = "#";
    linkSesion.textContent = "Cerrar sesión";
    linkSesion.addEventListener("click", () => {
      localStorage.removeItem("logueado");
      window.location.href = estaEnPrivado ? "../index.html" : "index.html";
    });
  } else {
    linkSesion.href = estaEnPrivado ? "../login.html" : "login.html";
    linkSesion.textContent = "Iniciar sesión";
  }

  liSesion.appendChild(linkSesion);
  ul.appendChild(liSesion);

  const liCarrito = document.createElement("li");
  const linkCarrito = document.createElement("a");
  linkCarrito.href = estaEnPrivado ? "../carrito.html" : "carrito.html";
  linkCarrito.innerHTML = `🛒 Carrito <span id="cart-count">(0)</span>`;
  liCarrito.appendChild(linkCarrito);
  ul.appendChild(liCarrito);
}

function actualizarCarritoUI() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const contador = document.getElementById("cart-count");
  if (contador) {
    contador.textContent = `(${totalCantidad})`;
  }
}

crearNavbar(paginas);
actualizarCarritoUI();
