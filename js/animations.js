/* =========================================
   ADVANCED SCROLL ANIMATIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const animatedElements =
        document.querySelectorAll(
            ".section-heading, .about-grid, .skill-card, .service-card, .project-card, .certificate-card, .timeline-item"
        );


    animatedElements.forEach(element => {

        element.classList.add(
            "scroll-hidden"
        );

    });


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "scroll-show"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    animatedElements.forEach(element => {

        observer.observe(element);

    });

});