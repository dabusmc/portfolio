const projectGrid = document.getElementById("projectGrid");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDate = document.getElementById("modalDate");
const modalStatus = document.getElementById("modalStatus");
const modalDescription = document.getElementById("modalDescription");
const modalTags = document.getElementById("modalTags");
const modalLinks = document.getElementById("modalLinks");

let projects = [];

async function loadProjects() {
    const response = await fetch("data/projects.json");
    const data = await response.json();

    projects = data.projects;

    projects.sort((a, b) =>
        b.priority - a.priority
    );

    renderProjects();
}

function renderProjects() {
    projectGrid.innerHTML = "";

    projects.forEach(project => {
        projectGrid.appendChild(
            createProjectCard(project)
        );
    });
}

function createProjectCard(project) {
    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
        <img
            class="project-image"
            src="${project.image}"
            alt="${project.title}"
        >

        <div class="project-info">
            <h2 class="project-title">
                ${project.title}
            </h2>

            <div class="project-date">
                ${project.date}
            </div>

            <p class="project-summary">
                ${project.summary}
            </p>

            <span class="status">
                ${project.status}
            </span>
        </div>
    `;

    card.addEventListener("click", () => {
        openProject(project);
    });

    return card;
}

function openProject(project) {
    modalImage.src = project.image;
    modalTitle.textContent = project.title;
    modalDate.textContent = project.date;
    modalStatus.textContent = project.status;
    modalDescription.textContent = project.description;

    modalTags.innerHTML = "";
    modalLinks.innerHTML = "";

    project.tags.forEach(tag => {
        const element = document.createElement("span");
        element.textContent = tag;
        modalTags.appendChild(element);
    });

    Object.entries(project.links).forEach(([name, url]) => {
        const link = document.createElement("a");

        link.href = url;
        link.target = "_blank";

        link.textContent =
            name.charAt(0).toUpperCase() +
            name.slice(1);

        modalLinks.appendChild(link);
    });

    modal.classList.remove("hidden");
}

closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
});

modal.addEventListener("click", e => {
    if (e.target === modal) {
        modal.classList.add("hidden");
    }
});

loadProjects();