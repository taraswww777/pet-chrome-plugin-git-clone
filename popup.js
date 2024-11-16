function copyToClipboard(writeText) {
  return navigator.clipboard.writeText(writeText);
}

/** Вычисляем постояянную часть пути до репозитория */
const calcRepoPath = url => {
  // Извлечение имени репозитория из URL
  const repoMatch = url.match(/github\.com\/([^\/]+)\/([^\/]+)(\/.*)?/);

  if (repoMatch) {
    const user = repoMatch[1];
    const repo = repoMatch[2];

    return `${user}/${repo}`;
  }

  return '';
};

const genCopiedItem = value => {
  const newItem = document.createElement('div');
  newItem.className = 'copiedItem';

  const newItemValue = document.createElement('a');
  newItemValue.className = 'copiedValue';
  newItemValue.innerText = value;
  newItemValue.href = value;
  newItemValue.target = '__blank';

  const newItemButton = document.createElement('button');
  newItemButton.className = 'copiedButton';
  newItemButton.addEventListener('click', () => {
    copyToClipboard(value).finally(() => {
      newItemButton.className = 'copiedButton copiedButton--copied';

      setTimeout(() => {
        newItemButton.className = 'copiedButton';
      }, 2000);
    });
  });

  newItem.appendChild(newItemValue);
  newItem.appendChild(newItemButton);

  return newItem;
};

// const copyHttpButtonElement = document.querySelector('#copy_http button');

chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  const repoPath = calcRepoPath(tabs[0].url);

  const copiedListElement = document.querySelector('#copiedList');

  const strings = [
    `git clone https://github.com/${repoPath}.git`,
    `git clone git@github.com:${repoPath}.git`,
    `https://github.com/${repoPath}/pulls`,
    `https://github.com/${repoPath}`,
  ];

  strings.forEach(itemValue => {
    const newCopiedItemEl = genCopiedItem(itemValue);

    copiedListElement.appendChild(newCopiedItemEl);
  });
});
