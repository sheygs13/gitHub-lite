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

const displayUserProfile = (user) => {
  if (user) {
    const {
      avatar_url,
      login,
      name,
      bio,
      followers,
      following,
      location,
      email,
      blog,
      twitter_username,
    } = user;
    populateUserBio(avatar_url, name, login);
    const html = `    
        <div class="sidebar__user">
          <div class="center">
             <img class="sidebar__user-photo" src="${avatar_url}" alt="${name}" />
          </div>
          <p class="sidebar__user-name">${name}</p>
          <p class="sidebar__user-nickname">${login}</p>
          <p class="bio">${bio}</p>
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
          <p class="location">${location}</p>  
          <p class="email">${email}</p>
          <p class="blog">${blog}</p>
          <p class="twitter">${twitter_username}</p>
          </div>
          <div class="legal">
            &copy; 2020 by sheygs.
          </div>
   `;
    element.sidebar.insertAdjacentHTML('afterbegin', html);
    removeLoader();
  }
};

const renderUserRepo = (repo) => {
  return `
     <div class="repository">
       <a href="https://github.com/${
         repo.full_name
       }" target="_blank"><p class="name">${repo.name}</p></a>
       <p class="description ${!repo.description && 'hide'}">${
    repo.description
  }</p>     
       <p class="language ${!repo.language && 'hide'}">
       <span class="dot" style="color:${
         repo.language && getRandomColor(repo.language)
       }"></span>
       ${repo.language}
       </p>
       <p class="updated_at">Updated ${timeSince(repo.updated_at)}</p>
     </div>
  `;
};

const populateUserBio = (imageUrl, alt, login) => {
  element.userBio.children[0].src = imageUrl;
  element.userBio.children[0].alt = alt;
  element.userBio.children[1].textContent = login;
};

const clearResult = () => {
  element.sidebar.innerHTML = '';
  element.repositories.innerHTML = '';
};

const showLoader = (parent) => {
  const loader = `
    <p class="loader">Loading...</p>
  `;
  parent.insertAdjacentHTML('afterbegin', loader);
};

const removeLoader = () => {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.remove();
  }
};

export {
  element,
  displayUserProfile,
  renderUserRepo,
  clearResult,
  populateUserBio,
  showLoader,
  removeLoader,
};
