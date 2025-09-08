// projects.js

const GITHUB_USERNAME = 'ChikenNuget1';
const projectsList = document.getElementById('projects-list');

fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`)
  .then(res => res.json())
  .then(repos => {
    repos.filter(repo => !repo.fork).forEach(repo => {
      const card = document.createElement('div');
      card.className = 'Project-card';

      card.innerHTML = `
        <div class="Project-card-info">
          <a href="${repo.html_url}" class="Project-card-title" target="_blank">${repo.name.replace(/-/g, ' ')}</a>
          <p class="Project-card-desc">${repo.description ? repo.description : 'No description.'}</p>
        </div>
      `;
      projectsList.appendChild(card);
    });
  })
  .catch(() => {
    projectsList.innerHTML = '<p style="color: #f66">Could not load repositories.</p>';
  });
