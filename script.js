window.addEventListener("load", () => {

    const splash = document.getElementById("splash");
    const logo = splash.querySelector("img");

    // Setelah logo tampil sebentar
    setTimeout(() => {
        logo.classList.add("logo-out");
    }, 1500);

    // Setelah logo hilang, background ikut hilang
    setTimeout(() => {
        splash.classList.add("fade-out");
    }, 2200);

    // Hapus splash
    setTimeout(() => {
        splash.remove();
    }, 3000);

});

document.body.style.overflow = "auto";

const popup = document.getElementById("popup");
const open = document.getElementById("openCard");
const close = document.getElementById("closeCard");

open.onclick = function () {
    popup.classList.add("show");
};

close.onclick = function () {
    popup.classList.remove("show");

    document.getElementById("home").scrollIntoView({
        behavior: "smooth"
    });
};

// ===========================
// ACCORDION
// ===========================

const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {

    accordion.addEventListener("click", () => {

        accordion.classList.toggle("active");

        const panel = accordion.nextElementSibling;

        if(panel.style.display === "block"){

            panel.style.display = "none";

        }else{

            panel.style.display = "block";

        }

    });

});