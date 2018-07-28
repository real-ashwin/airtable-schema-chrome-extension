var schema;

function getSchemaFromContentScript() {
  // This code sends "getSchema" message to "contentScript" which returns the schema
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var url = tabs && tabs[0] && tabs[0].url;
    url = url || '';
    if (!url.includes('airtable.com/app')) {
      var textarea = document.getElementById('schema');
      textarea.value = 'Could not find schema.This extension has to be run from airtable.com/api';
      return;
    }
      chrome.tabs.sendMessage(tabs[0].id, { type: "getSchema" }, function(schemaFromContentScript) {
        schema = schemaFromContentScript;

        var textarea = document.getElementById('schema');
        textarea.value = schema;
      });
  });
  
}

getSchemaFromContentScript();
