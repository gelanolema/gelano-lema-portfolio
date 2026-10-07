/* =========================================
   CERTIFICATES SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const container =
        document.getElementById(
            "certificates-container"
        );

    if (!container) return;


    function renderCertificates() {

        container.innerHTML = "";


        certificatesData.forEach(certificate => {

            const card =
                document.createElement("article");

            card.className =
                "certificate-card";


            card.innerHTML = `

                <div class="certificate-image-wrapper">

                    <img
                        src="${certificate.image}"
                        alt="${certificate.title}"
                        class="certificate-image"
                        onerror="this.style.display='none'"
                    >

                    <div class="certificate-placeholder">
                        🏆
                    </div>

                </div>


                <div class="certificate-content">

                    <span class="certificate-year">
                        ${certificate.year}
                    </span>

                    <h3>
                        ${certificate.title}
                    </h3>

                    <h4>
                        ${certificate.issuer}
                    </h4>

                    <p>
                        ${certificate.description}
                    </p>


                    <button
                        class="certificate-view-btn"
                        data-id="${certificate.id}"
                    >
                        View Certificate →
                    </button>

                </div>

            `;


            container.appendChild(card);

        });


        attachCertificateEvents();

    }


    function attachCertificateEvents() {

        const buttons =
            document.querySelectorAll(
                ".certificate-view-btn"
            );


        buttons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.id
                        );


                    const certificate =
                        certificatesData.find(
                            item =>
                                item.id === id
                        );


                    if (certificate) {

                        openCertificate(
                            certificate
                        );

                    }

                }
            );

        });

    }


    function openCertificate(certificate) {

        const modal =
            document.createElement("div");

        modal.className =
            "certificate-modal";


        modal.innerHTML = `

            <div class="certificate-modal-overlay">

                <div class="certificate-modal-content">

                    <button
                        class="certificate-close"
                    >
                        ×
                    </button>


                    <img
                        src="${certificate.image}"
                        alt="${certificate.title}"
                    >


                    <div class="certificate-modal-info">

                        <h2>
                            ${certificate.title}
                        </h2>

                        <h4>
                            ${certificate.issuer}
                        </h4>

                        <p>
                            ${certificate.description}
                        </p>

                        <span>
                            ${certificate.year}
                        </span>

                    </div>

                </div>

            </div>

        `;


        document.body.appendChild(modal);


        modal
            .querySelector(".certificate-close")
            .addEventListener(
                "click",
                () => modal.remove()
            );


        modal
            .querySelector(
                ".certificate-modal-overlay"
            )
            .addEventListener(
                "click",
                event => {

                    if (
                        event.target.classList.contains(
                            "certificate-modal-overlay"
                        )
                    ) {

                        modal.remove();

                    }

                }
            );

    }


    renderCertificates();

});