/* =========================================
   GELANO LEMA PORTFOLIO
   PROJECT SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const projectsContainer =
        document.getElementById("projects-container");

    if (!projectsContainer) return;


    /* =========================================
       RENDER PROJECTS
    ========================================= */

    function renderProjects(
        filter = "all"
    ) {

        projectsContainer.innerHTML = "";


        const filteredProjects =
            filter === "all"

                ? projectsData

                : projectsData.filter(
                    project =>
                        project.category === filter
                );


        filteredProjects.forEach(project => {

            const projectCard =
                document.createElement("article");

            projectCard.className =
                "project-card";


            projectCard.innerHTML = `

                <div class="project-image-wrapper">

                    <img
                        src="${project.image}"
                        alt="${project.title}"
                        class="project-image"
                        onerror="this.style.display='none'"
                    >

                    <div class="project-status">
                        ${project.status}
                    </div>

                </div>


                <div class="project-content">

                    <span class="project-category">
                        ${project.category.toUpperCase()}
                    </span>

                    <h3>
                        ${project.title}
                    </h3>

                    <p>
                        ${project.description}
                    </p>


                    <div class="project-tags">

                        ${project.technologies
                            .slice(0, 4)
                            .map(
                                technology =>
                                    `<span>${technology}</span>`
                            )
                            .join("")
                        }

                    </div>


                    <div class="project-actions">

                        <button
                            class="project-details-btn"
                            data-id="${project.id}"
                        >
                            View Details
                            →
                        </button>

                        <a
                            href="${project.github}"
                            target="_blank"
                            class="project-github"
                        >
                            GitHub
                        </a>

                    </div>

                </div>

            `;


            projectsContainer.appendChild(
                projectCard
            );

        });


        attachProjectButtons();

    }


    /* =========================================
       PROJECT FILTER
    ========================================= */

    const filterButtons =
        document.querySelectorAll(
            ".filter-btn"
        );


    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                });


                button.classList.add(
                    "active"
                );


                const filter =
                    button.dataset.filter;


                renderProjects(filter);

            }
        );

    });


    /* =========================================
       PROJECT DETAILS BUTTON
    ========================================= */

    function attachProjectButtons() {

        const detailButtons =
            document.querySelectorAll(
                ".project-details-btn"
            );


        detailButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const projectId =
                        Number(
                            button.dataset.id
                        );


                    const project =
                        projectsData.find(
                            item =>
                                item.id === projectId
                        );


                    if (project) {

                        openProjectModal(
                            project
                        );

                    }

                }
            );

        });

    }


    /* =========================================
       PROJECT MODAL
    ========================================= */

    function openProjectModal(project) {

        const modal =
            document.createElement("div");


        modal.className =
            "project-modal";


        modal.innerHTML = `

            <div class="project-modal-overlay">

                <div class="project-modal-content">

                    <button
                        class="project-modal-close"
                        aria-label="Close"
                    >
                        ×
                    </button>


                    <div class="modal-header">

                        <span class="project-category">
                            ${project.category.toUpperCase()}
                        </span>

                        <h2>
                            ${project.title}
                        </h2>

                    </div>


                    <div class="modal-body">

                        <p class="modal-description">
                            ${project.longDescription}
                        </p>


                        <h3>
                            Main Features
                        </h3>


                        <ul class="project-features">

                            ${project.features
                                .map(
                                    feature =>
                                        `<li>
                                            ✓ ${feature}
                                        </li>`
                                )
                                .join("")
                            }

                        </ul>


                        <h3>
                            Technologies
                        </h3>


                        <div class="modal-technologies">

                            ${project.technologies
                                .map(
                                    technology =>
                                        `<span>
                                            ${technology}
                                        </span>`
                                )
                                .join("")
                            }

                        </div>

                    </div>


                    <div class="modal-footer">

                        <a
                            href="${project.github}"
                            target="_blank"
                            class="btn btn-primary"
                        >
                            View GitHub
                        </a>


                        <a
                            href="${project.demo}"
                            target="_blank"
                            class="btn btn-outline"
                        >
                            Live Demo
                        </a>

                    </div>

                </div>

            </div>

        `;


        document.body.appendChild(modal);


        /* CLOSE BUTTON */

        const closeButton =
            modal.querySelector(
                ".project-modal-close"
            );


        closeButton.addEventListener(
            "click",
            () => {

                modal.remove();

            }
        );


        /* CLOSE BY CLICKING OUTSIDE */

        modal
            .querySelector(
                ".project-modal-overlay"
            )
            .addEventListener(
                "click",
                event => {

                    if (
                        event.target.classList.contains(
                            "project-modal-overlay"
                        )
                    ) {

                        modal.remove();

                    }

                }
            );


        /* CLOSE WITH ESC */

        document.addEventListener(
            "keydown",
            function closeModal(event) {

                if (event.key === "Escape") {

                    modal.remove();

                    document.removeEventListener(
                        "keydown",
                        closeModal
                    );

                }

            }
        );

    }


    /* =========================================
       INITIAL LOAD
    ========================================= */

    renderProjects();

});