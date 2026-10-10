
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("certificates-container");

    if (!container) {
        console.error("Certificates container not found.");
        return;
    }

    if (typeof certificatesData === "undefined" || !Array.isArray(certificatesData)) {
        container.innerHTML = "<p>Certificates data could not be loaded.</p>";
        console.error("certificatesData is missing. Check js/data.js.");
        return;
    }

    container.innerHTML = certificatesData.map(certificate => `
        <article class="certificate-card">
            <div class="certificate-image-wrapper">
                <img
                    class="certificate-image"
                    src="${certificate.image}"
                    alt="${certificate.title}"
                    loading="lazy"
                    onerror="this.style.display='none'; this.nextElementSibling.hidden=false;"
                >
                <div class="certificate-placeholder" hidden>🏆</div>
            </div>

            <div class="certificate-content">
                <span class="certificate-year">${certificate.date || certificate.year || ""}</span>
                <h3>${certificate.title}</h3>
                <h4>${certificate.issuer}</h4>
                <p>${certificate.description}</p>
                <button class="certificate-view-btn" type="button">View Certificate →</button>
            </div>
        </article>
    ).join("");

    container.querySelectorAll(".certificate-view-btn").forEach((button, index) => {
        button.addEventListener("click", () => {
            const certificate = certificatesData[index];
            const modal = document.createElement("div");
            modal.className = "certificate-modal";

            modal.innerHTML = `
                <div class="certificate-modal-overlay">
                    <div class="certificate-modal-content">
                        <button class="certificate-close" type="button" aria-label="Close">×</button>
                        <img src="${certificate.image}" alt="${certificate.title}">
                        <div class="certificate-modal-info">
                            <h2>${certificate.title}</h2>
                            <h4>${certificate.issuer}</h4>
                            <p>${certificate.description}</p>
                            <span>${certificate.date || certificate.year || ""}</span>
                        </div>
                    </div>
                </div>
            ;

            document.body.appendChild(modal);

            const closeModal = () => modal.remove();
            modal.querySelector(".certificate-close").addEventListener("click", closeModal);
            modal.querySelector(".certificate-modal-overlay").addEventListener("click", event => {
                if (event.target === event.currentTarget) closeModal();
            });
            document.addEventListener("keydown", function handleEscape(event) {
                if (event.key === "Escape" && document.body.contains(modal)) {
                    closeModal();
                    document.removeEventListener("keydown", handleEscape);
                }
            });
        });
    });

    console.log("Certificates rendered:", certificatesData.length);
});
