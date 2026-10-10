
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("certificates-container");

    if (!container) {
        console.error("Certificates container not found.");
        return;
    }

    if (typeof certificatesData === "undefined" || !Array.isArray(certificatesData)) {
        console.error("certificatesData is missing. Check js/data.js.");
        container.textContent = "Certificates could not be loaded.";
        return;
    }

    certificatesData.forEach(function (certificate) {
        const card = document.createElement("article");
        card.className = "certificate-card";

        const image = document.createElement("img");
        image.className = "certificate-image";
        image.src = certificate.image;
        image.alt = certificate.title;
        image.loading = "lazy";

        image.onerror = function () {
            image.alt = "Certificate image could not be loaded";
        };

        const content = document.createElement("div");
        content.className = "certificate-content";

        const date = document.createElement("span");
        date.className = "certificate-year";
        date.textContent = certificate.date || certificate.year || "";

        const title = document.createElement("h3");
        title.textContent = certificate.title;

        const issuer = document.createElement("h4");
        issuer.textContent = certificate.issuer;

        const description = document.createElement("p");
        description.textContent = certificate.description;

        const button = document.createElement("button");
        button.className = "certificate-view-btn";
        button.type = "button";
        button.textContent = "View Certificate";

        button.addEventListener("click", function () {
            const modal = document.createElement("div");
            modal.className = "certificate-modal";

            const preview = document.createElement("div");
            preview.className = "certificate-modal-content";

            const close = document.createElement("button");
            close.className = "certificate-close";
            close.type = "button";
            close.textContent = "×";
            close.addEventListener("click", function () {
                modal.remove();
            });

            const largeImage = document.createElement("img");
            largeImage.src = certificate.image;
            largeImage.alt = certificate.title;

            const heading = document.createElement("h2");
            heading.textContent = certificate.title;

            preview.append(close, largeImage, heading);
            modal.appendChild(preview);
            document.body.appendChild(modal);
        });

        content.append(date, title, issuer, description, button);
        card.append(image, content);
        container.appendChild(card);
    });

    console.log("Certificates rendered:", certificatesData.length);
});
