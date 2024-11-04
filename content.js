const repoName = document.querySelector('strong[itemprop="name"] a');
const cloneButton = document.createElement('button');
cloneButton.innerText = "Clone Repository";
cloneButton.style.position = "absolute";
cloneButton.style.top = "20px";
cloneButton.style.right = "20px";
cloneButton.style.zIndex = "9999";

if (repoName) {
    const repoUrl = `https://github.com${repoName.getAttribute('href')}.git`;

    cloneButton.onclick = () => {
        chrome.runtime.sendMessage({action: "clone", repoUrl: repoUrl}, (response) => {
            console.log(response.status);
        });
    };

    document.body.appendChild(cloneButton);
}