import GithubAPI from './api.js';
import {
  showLoader,
  removeLoader,
  timeSince,
  getRandomColor,
} from './utils.js';

const main = document.querySelector('.main');
const sidebar = document.querySelector('.sidebar');
const userBio = document.querySelector('.user-nav__user');
const form = document.querySelector('.search');
const repositories = document.querySelector('.repositories');
const repoNum = document.querySelector('.list-tab-item__repos');
const filter = document.querySelector('.filter-search');

async function getUserProfile(username) {
  const response = await GithubAPI.getUserInfo(username);
  return response;
}

function handleSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  getUserProfileAndDisplay(form.query.value);
  getUserRepos(form.query.value);
  form.reset();
  clearResult();
  showLoader(sidebar);
  showLoader(repositories);
}

function clearResult() {
  sidebar.innerHTML = '';
  repositories.innerHTML = '';
}

function handleError({ message }) {
  console.error(message);
}

function populateUserBio(imageUrl, alt, login) {
  userBio.children[0].src = imageUrl;
  userBio.children[0].alt = alt;
  userBio.children[1].textContent = login;
}

function filterRepo(e) {
  const text = e.currentTarget.query.value.toLowerCase();
  const allRepos = document.querySelectorAll('.repository');
  allRepos.forEach((repo) => {
    const item = repo.children[0].textContent.toLowerCase();
    return item.includes(text)
      ? (repo.style.display = 'block')
      : (repo.style.display = 'none');
  });
}

async function getUserProfileAndDisplay(user) {
  form.submit.disabled = true;
  const res = await getUserProfile(user).catch(handleError);
  // invalid user
  if (res.message) return;
  form.submit.disabled = false;
  displayUserProfile(res);
}

async function displayUserProfile(user) {
  if (user) {
    const { avatar_url, login, name, followers, following } = user;
    populateUserBio(avatar_url, name, login);
    const html = `    
        <div class="sidebar__user">
          <div class="center">
             <img class="sidebar__user-photo" src="${avatar_url}" alt="${name}" />
          </div>
          <p class="sidebar__user-name">${name}</p>
          <p class="sidebar__user-nickname">${login}</p>
            <div class="sidebar__user-stats">
               <a class="sidebar__user-stats-followers" href="#">
                 <span>
                   <i class="fas fa-users"></i>
                 </span>
                 <span class="followers">${followers}</span>
                 <span>followers</span>
               </a>
               <a class="sidebar__user-stats-following" href="#">
                 <span class="following">${following}</span>
                 <span>following</span>
               </a>
            </div>
          </div>
          <div class="legal">
            &copy; 2020 by sheygs.
          </div>
   `;
    sidebar.insertAdjacentHTML('afterbegin', html);
    removeLoader();
  }
}

async function getRepoNum(user) {
  const repos = await GithubAPI.getUserRepos(user);
  repoNum.textContent = repos.length;
}

async function getUserRepos(username) {
  const data = await GithubAPI.getUserRepos(username);
  getRepoNum(username);
  let result = data.map(
    ({ name, full_name, description, updated_at, language }) => ({
      name,
      full_name,
      description,
      updated_at,
      language,
    })
  );
  result = result.map((el) => renderUserRepo(el)).join('');
  repositories.innerHTML = result;
  main.insertAdjacentHTML('beforeend', repositories);
  removeLoader();
}

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

form.addEventListener('submit', handleSubmit);
filter.addEventListener('keyup', filterRepo);
