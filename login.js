const usuarios = [
  {
    email: "julieta@merengues.com",
    password: "123456",
  },
];

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const usuarioValido = usuarios.find(
    (u) => u.email === email && u.password === password
  );

  if (usuarioValido) {
    localStorage.setItem("logueado", "true");
    window.location.href = "privado/tienda.html";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
});
