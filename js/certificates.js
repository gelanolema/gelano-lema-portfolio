/* =========================================
   CERTIFICATES SYSTEM
   Responsive cards + image preview modal
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("certificates-container");

    if (!container) {
        console.warn("Certificates container not found.");
        return;
    }

    if (!Array.isArray(certificatesData)) {
        container.innerHTML =
            "<p>Certificates are temporarily unavailable.</p>";
        console.error("certificatesData is missing. Check js/data.js.");
        return;
    }

    function renderCertificates() {
        container.innerHTML = "";

        certificatesData.forEach((certificate) => {
            const card = document.createElement("article");
            card.className = "certificate-card";

            const imageWrapper = document.createElement("div");
            imageWrapper.className = "certificate-image-wrapper";

            const image = document.createElement("img");
            image.className = "certificate-image";
            image.src = certificate.image;
            image.alt = certificate.title;
            image.loading = "lazy";

            const placeholder = document.createElement("div");
            placeholder.className = "certificate-placeholder";
            placeholder.textContent = "🏆";
            placeholder.hidden = true;

            image.addEventListener("error", () => {
                image.hidden = true;
                placeholder.hidden = false;
            });

            image.addEventListener("load", () => {
                image.hidden = false;
                placeholder.hidden = true;
            });

            imageWrapper.append(image, placeholder);

            const content = document.createElement("div");
            content.className = "certificate-content";

            const date = document.createElement("span");
            date.className = "certificate-year";
            date.textContent = certificate.date || certificate.year || "";

            const title = document.createElement("h3");
            title.textContent = certificate.title || "Certificate";

            const issuer = document.createElement("h4");
            issuer.textContent = certificate.issuer || "";

            const description = document.createElement("p");
            description.textContent = certificate.description || "";

            const viewButton = document.createElement("button");
            viewButton.className = "certificate-view-btn";
            viewButton.type = "button";
            viewButton.textContent = "View Certificate →";

            viewButton.addEventListener("click", () => {
                openCertificate(certificate);
            });

            content.append(date, title, issuer, description, viewButton);
            card.append(imageWrapper, content);
            container.appendChild(card);
        });
    }

    function openCertificate(certificate) {
        const modal = document.createElement("div");
        modal.className = "certificate-modal";
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute(
            "aria-label",
            certificate.title || "Certificate preview"
        );

        const overlay = document.createElement("div");
        overlay.className = "certificate-modal-overlay";

        const content = document.createElement("div");
        content.className = "certificate-modal-content";

        const closeButton = document.createElement("button");
        closeButton.className = "certificate-close";
        closeButton.type = "button";
        closeButton.textContent = "×";
        closeButton.setAttribute("aria-label", "Close certificate");

        const image = document.createElement("img");
        image.src = certificate.image;
        image.alt = certificate.title || "Certificate";
        image.className = "certificate-modal-image";

        image.addEventListener("error", () => {
            image.alt = "Certificate image could not be loaded.";
        });

        const info = document.createElement("div");
        info.className = "certificate-modal-info";

        const title = document.createElement("h2");
        title.textContent = certificate.title || "Certificate";

        const issuer = document.createElement("h4");
        issuer.textContent = certificate.issuer || "";

        const description = document.createElement("p");
        description.textContent = certificate.description || "";

        const date = document.createElement("span");
        date.textContent = certificate.date || certificate.year || "";

        const closeModal = () => {
            modal.remove();
            document.removeEventListener("keydown", handleKeydown);
        };

        const handleKeydown = (event) => {
            if (event.key === "Escape") {
                closeModal();
            }
        };

        closeButton.addEventListener("click", closeModal);

        overlay.addEventListener("click", (event) => {
            if (event.target === overlay) {
                closeModal();
            }
        });

        document.addEventListener("keydown", handleKeydown);

        info.append(title, issuer, description, date);
        content.append(closeButton, image, info);
        overlay.appendChild(content);
        modal.appendChild(overlay);
        document.body.appendChild(modal);

        closeButton.focus();
    }

    renderCertificates();
});
```
