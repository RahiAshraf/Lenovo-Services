async function loadComponent(id, file) {
  const element = document.getElementById(id);
  if (!element) return;

  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(file + " not found");
    element.innerHTML = await response.text();
    setActiveNav();
  } catch (error) {
    console.error("Component load failed:", error);
  }
}

function setActiveNav() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-link").forEach(link => {
    const linkPage = link.getAttribute("href");
    link.classList.toggle("active", linkPage === currentPage);
  });
}

function initForms() {
  document.querySelectorAll(".needs-validation").forEach(form => {
    form.addEventListener("submit", event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        const target = form.dataset.redirect;
        alert(form.dataset.success || "Submitted successfully.");
        if (target) window.location.href = target;
      }

      form.classList.add("was-validated");
    });
  });

  const date = document.querySelector("#serviceDate");
  if (date) date.min = new Date().toISOString().split("T")[0];
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("site-header", "components/header.html");
  await loadComponent("site-footer", "components/footer.html");
  initForms();
});
