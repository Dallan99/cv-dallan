document.addEventListener("DOMContentLoaded", () => {
  console.log("Página carregada!");

  // Adiciona um efeito de fade-in nos elementos ao carregar
  const elements = document.querySelectorAll(".fade-in");
  elements.forEach(el => {
      el.style.opacity = 0;
      setTimeout(() => {
          el.style.transition = "opacity 1s";
          el.style.opacity = 1;
      }, 200);
  });

  // Animação ao passar o mouse nos botões
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach(button => {
      button.addEventListener("mouseenter", () => {
          button.style.transform = "scale(1.05)";
      });
      button.addEventListener("mouseleave", () => {
          button.style.transform = "scale(1)";
      });
  });
});
