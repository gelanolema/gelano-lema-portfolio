/* =========================================
   GITHUB INTEGRATION
========================================= */

const githubUsername = "gelanolema";


async function loadGitHubRepositories() {

    const container =
        document.getElementById(
            "github-projects"
        );

    if (!container) return;


    try {

        const response =
            await fetch(
                `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`
            );


        if (!response.ok) {

            throw new Error(
                "GitHub API request failed"
            );

        }


        const repositories =
            await response.json();


        container.innerHTML = "";


        repositories.forEach(repo => {

            const card =
                document.createElement("article");

            card.className =
                "github-card";


            card.innerHTML = `

                <div class="github-card-header">

                    <span>💻</span>

                    <span>
                        ${repo.language || "Code"}
                    </span>

                </div>


                <h3>
                    ${repo.name}
                </h3>


                <p>
                    ${repo.description ||
                    "No description available."}
                </p>


                <div class="github-stats">

                    <span>
                        ⭐ ${repo.stargazers_count}
                    </span>

                    <span>
                        🍴 ${repo.forks_count}
                    </span>

                </div>


                <a
                    href="${repo.html_url}"
                    target="_blank"
                    class="btn btn-outline"
                >
                    View Repository →
                </a>

            `;


            container.appendChild(card);

        });


    } catch (error) {

        console.error(
            "GitHub Error:",
            error
        );


        container.innerHTML = `

            <p>
                GitHub repositories could not be loaded.
            </p>

        `;

    }

}


document.addEventListener(
    "DOMContentLoaded",
    loadGitHubRepositories
);