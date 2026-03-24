// ============================================
// PASTE THIS CODE IN GOOGLE APPS SCRIPT EDITOR
// (Extensions > Apps Script in your Google Sheet)
// ============================================

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var data = JSON.parse(e.postData.contents);

  if (data.type === 'booking') {
    var bookingsSheet = sheet.getSheetByName('Bookings');
    bookingsSheet.appendRow([
      new Date().toLocaleString(),
      data.name,
      data.phone,
      data.service,
      data.date,
      data.time,
      data.notes
    ]);
    return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Booking saved' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (data.type === 'review') {
    var reviewsSheet = sheet.getSheetByName('Reviews');
    reviewsSheet.appendRow([
      new Date().toLocaleString(),
      data.name,
      data.detail,
      data.rating,
      data.text
    ]);
    return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Review saved' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Unknown type' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var reviewsSheet = sheet.getSheetByName('Reviews');
  var data = reviewsSheet.getDataRange().getValues();
  var reviews = [];

  for (var i = 1; i < data.length; i++) {
    reviews.push({
      name: data[i][1],
      detail: data[i][2],
      rating: data[i][3],
      text: data[i][4]
    });
  }

  return ContentService.createTextOutput(JSON.stringify({ status: 'success', reviews: reviews }))
    .setMimeType(ContentService.MimeType.JSON);
}
