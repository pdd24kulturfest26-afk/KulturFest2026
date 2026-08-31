/* =========================================================
   SPLASH SCREEN
   ========================================================= */

window.addEventListener("load", function () {

    const splash = document.getElementById("splash");

    if (!splash) return;

    const logo = splash.querySelector("img");

    // Animasi logo keluar
    if (logo) {
        setTimeout(function () {
            logo.classList.add("logo-out");
        }, 1500);
    }

    // Splash mulai menghilang
    setTimeout(function () {
        splash.classList.add("fade-out");
    }, 2200);

    // Hapus splash dari halaman
    setTimeout(function () {
        splash.remove();
    }, 3000);

});


/* =========================================================
   POPUP / WELCOME CARD
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const popup = document.getElementById("popup");
    const openButton = document.getElementById("openCard");
    const closeButton = document.getElementById("closeCard");

    // Jika elemen popup tidak ada, jangan jalankan bagian ini
    if (popup && openButton) {

        openButton.addEventListener("click", function () {

            popup.classList.add("show");

            // Jalankan confetti jika library tersedia
            if (typeof confetti === "function") {
                launchConfetti();
            }

        });

    }


    if (popup && closeButton) {

        closeButton.addEventListener("click", function () {

            popup.classList.remove("show");

            const home = document.getElementById("home");

            if (home) {
                setTimeout(function () {
                    home.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }, 200);
            }

        });

    }


    /* =====================================================
       CONFETTI
       ===================================================== */

    function launchConfetti() {

        const duration = 2200;
        const animationEnd = Date.now() + duration;

        const colors = [
            "#EA5E86",
            "#37C8E8",
            "#F4C542",
            "#EF6545",
            "#FFFFFF"
        ];

        function frame() {

            confetti({
                particleCount: 5,
                angle: 60,
                spread: 65,
                origin: {
                    x: 0,
                    y: 0.7
                },
                colors: colors
            });

            confetti({
                particleCount: 5,
                angle: 120,
                spread: 65,
                origin: {
                    x: 1,
                    y: 0.7
                },
                colors: colors
            });

            if (Date.now() < animationEnd) {
                requestAnimationFrame(frame);
            }

        }

        frame();
    }


    /* =====================================================
       ACCORDION UMUM
       ===================================================== */

    const accordions = document.querySelectorAll(".accordion");

    accordions.forEach(function (accordion) {

        accordion.addEventListener("click", function () {

            accordion.classList.toggle("active");

            const panel = accordion.nextElementSibling;

            if (!panel) return;

            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }

        });

    });


    /* =====================================================
       PERLOMBAAN & KATEGORI
       ===================================================== */

    const categoryList = document.getElementById("categoryList");

    const categoryButtons =
        document.querySelectorAll(".category-item");

    const categoryContents =
        document.querySelectorAll(".competition-category");

    const backButtons =
        document.querySelectorAll(".back-category");

    const competitionItems =
        document.querySelectorAll(".competition-item");


    /*
       Jika bagian kategori tidak ada,
       jangan lanjutkan script perlombaan.
    */

    if (!categoryList) {
        return;
    }


    /* =====================================================
       KONDISI AWAL
       ===================================================== */

    // Tampilkan 3 kategori
    categoryList.style.display = "flex";


    // Sembunyikan semua halaman lomba
    categoryContents.forEach(function (content) {

        content.style.display = "none";
        content.classList.remove("active");

    });


    /* =====================================================
       KLIK SISWA / MAHASISWA / UMUM
       ===================================================== */

    categoryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const category = button.dataset.category;

            console.log("Kategori dipilih:", category);


            /* ---------------------------------------------
               SEMBUNYIKAN DAFTAR KATEGORI
               --------------------------------------------- */

            categoryList.style.display = "none";


            /* ---------------------------------------------
               SEMBUNYIKAN SEMUA HALAMAN LOMBA
               --------------------------------------------- */

            categoryContents.forEach(function (content) {

                content.style.display = "none";
                content.classList.remove("active");

            });


            /* ---------------------------------------------
               CARI HALAMAN SESUAI KATEGORI
               --------------------------------------------- */

            const selected =
                document.querySelector(
                    '.competition-category[data-content="' +
                    category +
                    '"]'
                );


            if (!selected) {

                console.log(
                    "Kategori tidak ditemukan:",
                    category
                );

                return;
            }


            /* ---------------------------------------------
               TAMPILKAN HALAMAN YANG DIPILIH
               --------------------------------------------- */

            selected.style.display = "flex";

            selected.classList.add("active");


            /* ---------------------------------------------
               SCROLL KE HALAMAN LOMBA
               --------------------------------------------- */

            setTimeout(function () {

                selected.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 100);

        });

    });


    /* =====================================================
       TOMBOL KEMBALI KE KATEGORI
       ===================================================== */

    backButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            console.log("Kembali ke kategori");


            /* ---------------------------------------------
               SEMBUNYIKAN SEMUA HALAMAN LOMBA
               --------------------------------------------- */

            categoryContents.forEach(function (content) {

                content.style.display = "none";

                content.classList.remove("active");

            });


            /* ---------------------------------------------
               RESET ACCORDION LOMBA
               --------------------------------------------- */

            competitionItems.forEach(function (item) {

                const panel =
                    item.nextElementSibling;

                /*
                   Mengambil tombol/arrow di bagian kanan
                */

                const arrow =
                    item.querySelector("span:last-child");


                if (panel) {
                    panel.style.display = "none";
                }


                if (arrow) {
                    arrow.textContent = "+";
                }


                item.classList.remove("active");

            });


            /* ---------------------------------------------
               TAMPILKAN KEMBALI 3 KATEGORI
               --------------------------------------------- */

            categoryList.style.display = "flex";


            /* ---------------------------------------------
               SCROLL KEMBALI KE KATEGORI
               --------------------------------------------- */

            setTimeout(function () {

                categoryList.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 100);

        });

    });


    /* =====================================================
       ACCORDION LOMBA
       ===================================================== */

    competitionItems.forEach(function (item) {

        item.addEventListener("click", function () {

            const panel =
                item.nextElementSibling;

            const arrow =
                item.querySelector("span:last-child");


            if (!panel) {

                console.log(
                    "Panel lomba tidak ditemukan"
                );

                return;
            }


            /* ---------------------------------------------
               CEK APAKAH PANEL SEDANG TERBUKA
               --------------------------------------------- */

            const isOpen =
                panel.style.display === "block";


            /* ---------------------------------------------
               JIKA SUDAH TERBUKA → TUTUP
               --------------------------------------------- */

            if (isOpen) {

                panel.style.display = "none";

                item.classList.remove("active");

                if (arrow) {
                    arrow.textContent = "+";
                }

            }


            /* ---------------------------------------------
               JIKA TERTUTUP → BUKA
               --------------------------------------------- */

            else {

                panel.style.display = "block";

                item.classList.add("active");

                if (arrow) {
                    arrow.textContent = "−";
                }

            }

        });

    });

});