function copyToClipboard(writeText) {
  return navigator.clipboard.writeText(writeText);
}

const cloneButtonEl = document.getElementById('cloneButton');
const messagesEl = document.getElementById('messages');

cloneButtonEl.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const url = tabs[0].url;
    const cloneMethod = document.querySelector('input[name="cloneMethod"]:checked').value;

    // Извлечение имени репозитория из URL
    const repoMatch = url.match(/github\.com\/([^\/]+)\/([^\/]+)(\/.*)?/);

    if (repoMatch) {
      const user = repoMatch[1];
      const repo = repoMatch[2];
      const repoPath = `${user}/${repo}`;
      let cloneUrl;

      if (cloneMethod === 'http') {
        cloneUrl = `https://github.com/${repoPath}.git`;
      } else {
        cloneUrl = `git@github.com:${repoPath}.git`;
      }

      const copiedText = `git clone ${cloneUrl}`;

      copyToClipboard(copiedText);

      messagesEl.innerHTML = `Copied to clipboard:<br/>${copiedText}`;

      setTimeout(() => {
        messagesEl.innerHTML = '';
      }, 3000);

      chrome.runtime.sendMessage({ action: 'clone', repoUrl: cloneUrl }, response => {
        console.log('response:', response);
      });
    } else {
      alert('Unable to determine the repository from the URL.');
    }
  });
});
