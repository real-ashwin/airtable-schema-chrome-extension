var schema = '';

// This listener is to get data from "getSchemaScript" to "contentScript"
function addSchemaRetrievedListener() {
  document.addEventListener('retreived-schema', function (e) {
    var data = e.detail;
    schema = data;
  });
}

//
// This listener is to send data from "contentScript" to "popup"
//
// https://stackoverflow.com/questions/31111721/pass-a-variable-from-content-script-to-popup
function addSendSchemaToPopupListener() {
  chrome.runtime.onMessage.addListener(
      function(message, sender, sendResponse) {
          switch(message.type) {
              case "getSchema":
                sendResponse(schema);
                break;
              default:
                console.error("Unrecognised message: ", message);
          }
      }
  );
}

function injectGetSchemaScript() {
  // https://stackoverflow.com/questions/9515704/insert-code-into-the-page-context-using-a-content-script/9517879#9517879

  var s = document.createElement('script');
  s.id="ashwinscript';"
  // TODO: add "script.js" to web_accessible_resources in manifest.json
  s.src = chrome.extension.getURL('scripts/getSchemaScript.js');
  // s.onload = function() {
  //     this.remove();
  // };
  (document.head || document.documentElement).appendChild(s);

}

addSendSchemaToPopupListener();
addSchemaRetrievedListener();
injectGetSchemaScript();