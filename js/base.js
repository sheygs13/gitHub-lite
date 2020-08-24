import { getRandomColor, timeSince } from './utils.js';
const element = {
  main: document.querySelector('.main'),
  sidebar: document.querySelector('.sidebar'),
  userBio: document.querySelector('.user-nav__user'),
  form: document.querySelector('.search'),
  repositories: document.querySelector('.repositories'),
  repoNum: document.querySelector('.list-tab-item__repos'),
  filter: document.querySelector('.filter-search'),
};

function renderUserRepo(repo) {
  const html = `
     <div class="repository">
       <a href="https://github.com/${
         repo.full_name
       }" target="_blank"><p class="name">${repo.name}</p></a>
       <p class="description" style="display:${!repo.description && 'none'}">${
    repo.description
  }</p>     
       <p class="language" style="display: ${!repo.language && 'none'}">
       <span class="dot" style="color:${
         repo.language && getRandomColor(repo.language)
       }"></span>
       ${repo.language}
       </p>
       <p class="updated_at">Updated ${timeSince(repo.updated_at)}</p>
     </div>
     <hr/>
  `;
  return html;
}

function populateUserBio(imageUrl, alt, login) {
  element.userBio.children[0].src = imageUrl;
  element.userBio.children[0].alt = alt;
  element.userBio.children[1].textContent = login;
}

function clearResult() {
  element.sidebar.innerHTML = '';
  element.repositories.innerHTML = '';
}

export { element, renderUserRepo, clearResult, populateUserBio };
