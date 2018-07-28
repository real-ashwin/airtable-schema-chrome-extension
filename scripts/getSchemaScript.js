function getSchema() {
  var tables = application.tables;

  // Delete sampleRows
  for (var i =0; i < tables.length; i++) {
    var table = tables[i];
    delete table.sampleRows;
  }

  // table.foreignTable causes "Converting circular structure to JSON" error
  // so get rid of it
  for (var i = 0; i < tables.length; i++) {
    var table = tables[i];
    var columns = table.columns;
    for (var j = 0; j < columns.length; j++) {
      var column = columns[j];
      if (column.foreignTable) {
        column.foreignTableId = column.foreignTable.id;
        delete column.foreignTable;        
      }
      
    }
  }

  return JSON.stringify(tables, null, 4);
  
}

function sendSchemaToExtension() {
  var data = getSchema();

  var evt = document.createEvent("CustomEvent");
  evt.initCustomEvent('retreived-schema', true, true, data);
  document.dispatchEvent(evt);
}


var serializedFn = '(' + getSchema + ' ' + sendSchemaToExtension + sendSchemaToExtension() + ')()';
