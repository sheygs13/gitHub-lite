function timeSince(date) {
  let seconds = Math.floor((new Date() - new Date(date)) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + ' years ago';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months ago';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days ago';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours ago';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes ago';
  }
  return Math.floor(seconds) + ' seconds ago';
}

const getRandomColor = (function () {
  const colors = {
    JavaScript: 'gold',
  };

  return function (language = '') {
    if (!language)
      return (
        '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
      );
    if (colors[language]) return colors[language];
    let color =
      '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
    colors[language] = color;
    return color;
  };
})();

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

export { getRandomColor, timeSince, showLoader, removeLoader };
