var tab_title = '';
function display_h1 (results){
  h1=results;
  document.querySelector("#id1").innerHTML = "<p>Página: " + tab_title + "</p><p>Consulta: " + h1 + "</p>";
}
chrome.tabs.query({active: true}, function(tabs) {
  var tab = tabs[0];
  tab_title = tab.title;
  chrome.tabs.executeScript(tab.id, {
    code: 'document.querySelector("#data-result > div > div.table-responsive").innerText'
  }, display_h1);
});
