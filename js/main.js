import GithubAPI from './api.js';
import handleError from './error.js';
import { showLoader, removeLoader } from './utils.js';
import {
  element,
  renderUserRepo,
  populateUserBio,
  clearResult,
} from './base.js';

async function getUserProfile(username) {
  const response = await GithubAPI.getUserInfo(username);
  return response;
}

function handleSubmit(e) {
  e.preventDefault();
  const input = e.currentTarget.query;
  const value = input.value;
  if (value) {
    getUserProfileAndDisplay(value);
    getUserRepos(value);
    element.form.reset();
    clearResult();
    showLoader(element.sidebar);
    showLoader(element.repositories);
  }
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
  element.form.submit.disabled = true;
  const res = await getUserProfile(user).catch(handleError);
  // invalid user
  if (res.message) return;
  element.form.submit.disabled = false;
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
    element.sidebar.insertAdjacentHTML('afterbegin', html);
    removeLoader();
  }
}

async function getRepoNum(user) {
  const repos = await GithubAPI.getUserRepos(user);
  element.repoNum.textContent = repos.length;
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
  element.repositories.innerHTML = result;
  element.main.insertAdjacentHTML('beforeend', element.repositories);
  removeLoader();
}

element.form.addEventListener('submit', handleSubmit);
element.filter.addEventListener('keyup', filterRepo);
