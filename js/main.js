/* =========================================
   GELANO LEMA PORTFOLIO
   MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Gelano Lema Portfolio Started");


    /* =========================================
       PAGE LOADER
    ========================================= */

    const pageLoader = document.getElementById("page-loader");

    if (pageLoader) {

        window.addEventListener("load", () => {

            setTimeout(() => {

                pageLoader.classList.add("hidden");

            }, 500);

        });

    }


    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuToggle =
        document.getElementById("menu-toggle");

    const navbar =
        document.getElementById("navbar");

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            navbar.classList.toggle("active");

        });


        const navLinks =
            document.querySelectorAll(".nav-link");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navbar.classList.remove("active");

            });

        });

    }


    /* =========================================
       TYPING ANIMATION
    ========================================= */

    const typingText =
        document.getElementById("typing-text");

    if (typingText) {

        const words = [

            "Software Engineering Student",

            "Web Developer",

            "Software Developer",

            "Full Stack Developer",

            "Problem Solver",

            "Technology Enthusiast"

        ];

        let wordIndex = 0;

        let characterIndex = 0;

        let deleting = false;


        function typeEffect() {

            const currentWord =
                words[wordIndex];


            if (!deleting) {

                typingText.textContent =
                    currentWord.substring(
                        0,
                        characterIndex + 1
                    );

                characterIndex++;


                if (
                    characterIndex ===
                    currentWord.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeEffect,
                        1500
                    );

                    return;
                }

            } else {

                typingText.textContent =
                    currentWord.substring(
                        0,
                        characterIndex - 1
                    );

                characterIndex--;


                if (characterIndex === 0) {

                    deleting = false;

                    wordIndex++;

                    if (
                        wordIndex >=
                        words.length
                    ) {

                        wordIndex = 0;

                    }

                }

            }


            setTimeout(
                typeEffect,
                deleting ? 50 : 100
            );

        }


        typeEffect();

    }


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navigationLinks =
        document.querySelectorAll(".nav-link");


    window.addEventListener("scroll", () => {

        let currentSection = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    });


    /* =========================================
       BACK TO TOP
    ========================================= */

    const backToTop =
        document.getElementById("back-to-top");


    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        });


        backToTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }


    /* =========================================
       CONTACT FORM
    ========================================= */

    const contactForm =
        document.getElementById("contact-form");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                showToast(
                    "Message submitted successfully! 🚀"
                );

                contactForm.reset();

            }
        );

    }


    /* =========================================
       TOAST NOTIFICATION
    ========================================= */

    function showToast(message) {

        const toast =
            document.getElementById("toast");

        if (!toast) return;


        toast.textContent = message;

        toast.classList.add("show");


        setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);

    }


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements =
        document.querySelectorAll(
            ".skill-card, .service-card, .project-card, .certificate-card"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

});