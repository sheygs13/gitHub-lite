const baseEndPoint = 'https://api.github.com/users';

const GithubAPI = {
  async getUserInfo(username) {
    try {
      const response = await fetch(`${baseEndPoint}/${username}`);
      return await response.json();
    } catch ({ message }) {
      console.log(message);
    }
  },
  async getUserRepos(username) {
    try {
      const response = await fetch(`${baseEndPoint}/${username}/repos`);
      return await response.json();
    } catch ({ message }) {
      console.log(message);
    }
  },
};

export default GithubAPI;
