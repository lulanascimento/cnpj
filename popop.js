var tab_title = '';
function display_h1 (results){
  h1=results;
  document.querySelector("#id1").innerHTML = "<p>tab title: " + tab_title + "</p><p>dom h1: " + h1 + "</p>";
}
chrome.tabs.query({active: true}, function(tabs) {
  var tab = tabs[0];
  tab_title = tab.title;
  chrome.tabs.executeScript(tab.id, {
    code: 'document.querySelector("#section1 > div > div > div > div > div > div > div:nth-child(1) > div.jumbotron.mt-5 > h4").innerText'
  }, display_h1);
});