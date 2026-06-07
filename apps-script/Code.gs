// Bradley Family Trip — Shopping List API
// Deploy as a Web App: Execute as Me, Access: Anyone

const SHEET_NAME = 'Shopping List';

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['ID', 'Name', 'Category', 'Checked', 'Qty']);
    sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
  }
  return sheet;
}

function doGet(e) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);

  const items = rows
    .filter(r => r[0] !== '')
    .map(r => ({
      id:       String(r[0]),
      name:     r[1],
      category: r[2] || 'Other',
      checked:  r[3] === true || r[3] === 'TRUE',
      qty:      r[4] || ''
    }));

  const response = {
    items,
    sheetUrl: SpreadsheetApp.getActiveSpreadsheet().getUrl()
  };

  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  const sheet = getSheet();
  let result = {};

  if (body.action === 'add') {
    const id = String(Date.now());
    sheet.appendRow([id, body.name, body.category || 'Other', false, body.qty || '']);
    result = { ok: true, id };

  } else if (body.action === 'toggle') {
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]) === String(body.id)) {
        sheet.getRange(i + 1, 4).setValue(body.checked);
        break;
      }
    }
    result = { ok: true };

  } else if (body.action === 'delete') {
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]) === String(body.id)) {
        sheet.deleteRow(i + 1);
        break;
      }
    }
    result = { ok: true };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
