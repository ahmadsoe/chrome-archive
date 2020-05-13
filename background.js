chrome.runtime.onInstalled.addListener(function() {
  var title = chrome.i18n.getMessage('title');
  chrome.contextMenus.create({
    id: 'archive',
    enabled: true,
    title: title + ' %s',
    contexts: ['page', 'selection', 'link']
  }, function(e) {
    console.log('called', e);
  });
});

chrome.contextMenus.onClicked.addListener(onClickHandler);

function onClickHandler(info) {
  var url = info.pageUrl;
  var archiveUrl = 'https://web.archive.org/web/*/';

  if (info.selectionText) {
    url = info.selectionText.trim();

    if (/(https?:\/\/).*/.test(url) === false) {
      url = 'http://' + url;
    }
  }

  if (info.linkUrl) {
    url = info.linkUrl;
  }

  try {
    url = new URL(url);
    chrome.tabs.create({ url: archiveUrl + url });
  } catch(e) {}
}
