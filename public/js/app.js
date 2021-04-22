console.log('app.js is alive');

$('#addNewTip').hide();

$('#addBtn').on('click', function () {
  $('#addNewTip').toggle();
  $('#addBtn').hide();
});

// $('#updateForm').hide();

// $('#updateBtn').on('click', function () {
//   $('#updateForm').toggle();
// });

$('#1,#2,#3,#4,#5,#6,#7,#8,#9,#10').hide();
