chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "clone") {
    const repoUrl = request.repoUrl;
    // Здесь вы можете вставить код для выполнения git clone
    // Например, открыть терминал или использовать другие методы
    console.log(`Clone command for: ${repoUrl}`);
    sendResponse({ status: "cloning", url: repoUrl });
  }
});
