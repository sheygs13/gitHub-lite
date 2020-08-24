import GithubAPI from './api.js';
import handleError from './error.js';
import { showLoader, removeLoader } from './utils.js';
import {
  element,
  renderUserRepo,
  displayUserProfile,
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

async function getNumberOfRepos(user) {
  const repos = await GithubAPI.getUserRepos(user);
  element.repoNum.textContent = repos.length;
}

async function getUserRepos(username) {
  const data = await GithubAPI.getUserRepos(username);
  getNumberOfRepos(username);
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
