const paginas = [
  { titulo: "Inicio", url: "index.html" },
  { titulo: "Tortas", url: "tortas.html" },
  { titulo: "Tartas", url: "tartas.html" },
  { titulo: "Budines", url: "budines.html" },
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
      window.location.href = "login.html";
    });
  } else {
    linkSesion.href = "login.html";
    linkSesion.textContent = "Iniciar sesión";
  }

  liSesion.appendChild(linkSesion);
  ul.appendChild(liSesion);
}
crearNavbar(paginas);
