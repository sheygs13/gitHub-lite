const timeSince = (date) => {
  let seconds = Math.floor((new Date() - new Date(date)) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) {
    return `${Math.floor(interval)} years ago`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)} years ago`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)} years ago`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)} years ago`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} years ago`;
  }
  return `${Math.floor(interval)} years ago`;
};

const getRandomColor = (function () {
  const colors = {
    JavaScript: 'gold',
  };

  return function (language = '') {
    if (!language) {
      return (
        '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
      );
    }
    if (colors[language]) return colors[language];
    let color =
      '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
    colors[language] = color;
    return color;
  };
})();

export { getRandomColor, timeSince };
