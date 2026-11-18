/* =========================================================
   CTRL+CAR
   TECHNOLOGY PAGE
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -60px 0px"
            }
        );


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });


    /* =====================================================
       IMAGE PARALLAX
    ===================================================== */

    const images =
        document.querySelectorAll(".piece-image img");


    images.forEach(function (image) {

        image.classList.add("parallax-image");

    });


    function updateParallax() {

        const viewportHeight =
            window.innerHeight;


        images.forEach(function (image) {

            const container =
                image.closest(".piece-image");


            if (!container) return;


            const rect =
                container.getBoundingClientRect();


            const center =
                rect.top + rect.height / 2;


            const distance =
                center - viewportHeight / 2;


            const movement =
                distance * -0.018;


            if (
                rect.bottom > 0 &&
                rect.top < viewportHeight
            ) {

                image.style.transform =
                    "translateY(" +
                    movement +
                    "px) scale(1.02)";

            }

        });

    }


    let ticking = false;


    window.addEventListener(
        "scroll",
        function () {

            if (!ticking) {

                window.requestAnimationFrame(
                    function () {

                        updateParallax();

                        ticking = false;

                    }
                );

                ticking = true;

            }

        },
        {
            passive: true
        }
    );


    updateParallax();


    /* =====================================================
       HERO SCROLL INDICATOR
    ===================================================== */

    const heroScroll =
        document.querySelector(".hero-scroll");


    const hero =
        document.querySelector(".technology-hero");


    if (heroScroll && hero) {

        window.addEventListener(
            "scroll",
            function () {

                const scrollAmount =
                    window.scrollY;


                const opacity =
                    Math.max(
                        0,
                        1 - scrollAmount / 250
                    );


                if (scrollAmount < hero.offsetHeight) {

                    heroScroll.style.opacity =
                        opacity;

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       IMAGE LIGHTBOX
    ===================================================== */

    const lightbox =
        document.getElementById(
            "technologyLightbox"
        );


    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );


    const lightboxTitle =
        document.getElementById(
            "lightboxTitle"
        );


    const lightboxCategory =
        document.getElementById(
            "lightboxCategory"
        );


    const lightboxClose =
        document.getElementById(
            "lightboxClose"
        );


    const technologyImages =
        document.querySelectorAll(
            ".piece-image"
        );


    technologyImages.forEach(function (frame) {

        frame.addEventListener(
            "click",
            function () {

                const image =
                    frame.querySelector("img");


                if (!image || !lightbox) {
                    return;
                }


                lightboxImage.src =
                    image.src;


                lightboxImage.alt =
                    image.alt;


                lightboxTitle.textContent =
                    getCarName(image.alt);


                lightboxCategory.textContent =
                    getCategory(image);


                lightbox.classList.add("active");


                document.body.style.overflow =
                    "hidden";

            }
        );

    });


    /* =====================================================
       CAR NAME
    ===================================================== */

    function getCarName(altText) {

        if (!altText) {
            return "AUTOMOTIVE ENGINEERING";
        }


        return altText
            .replace(
                " Engineering Infographic",
                ""
            )
            .replace(
                " Technical Cutaway",
                ""
            )
            .replace(
                " Luxury Engineering",
                ""
            )
            .replace(
                " X-Ray Engineering",
                ""
            )
            .replace(
                " Exploded Engineering",
                ""
            )
            .replace(
                " Exploded Engineering Blueprint",
                ""
            )
            .replace(
                " Exploded Engineering Poster",
                ""
            )
            .replace(
                " Exploded Engineering",
                ""
            )
            .replace(
                " Vintage Design Study",
                ""
            )
            .replace(
                " Vintage Design Blueprint",
                ""
            )
            .replace(
                " Design Study",
                ""
            )
            .trim();

    }


    /* =====================================================
       CATEGORY
    ===================================================== */

    function getCategory(image) {

        const piece =
            image.closest(
                ".technology-piece"
            );


        if (!piece) {
            return "CTRL+CAR / TECHNOLOGY";
        }


        const section =
            piece.closest(
                ".technology-chapter"
            );


        if (!section) {
            return "CTRL+CAR / TECHNOLOGY";
        }


        if (
            section.classList.contains(
                "luxury-chapter"
            )
        ) {

            return "CTRL+CAR / LUXURY ENGINEERING";

        }


        if (
            section.classList.contains(
                "heritage-chapter"
            )
        ) {

            return "CTRL+CAR / DESIGN HERITAGE";

        }


        if (
            section.classList.contains(
                "performance-chapter"
            )
        ) {

            return "CTRL+CAR / PERFORMANCE ENGINEERING";

        }


        return "CTRL+CAR / TECHNOLOGY";

    }


    /* =====================================================
       CLOSE LIGHTBOX
    ===================================================== */

    function closeLightbox() {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove(
            "active"
        );


        document.body.style.overflow =
            "";


        setTimeout(
            function () {

                lightboxImage.src = "";

            },
            400
        );

    }


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    /* =====================================================
       CLICK OUTSIDE IMAGE
    ===================================================== */

    if (lightbox) {

        lightbox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                lightbox &&
                lightbox.classList.contains("active")
            ) {

                closeLightbox();

            }

        }
    );

});