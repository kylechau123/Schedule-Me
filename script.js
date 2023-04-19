$(function () {
  var currentTime = dayjs().hour();
  var currentDate = dayjs().format('MMM/DD/YYYY');
  $('#currentDay').text(currentDate);
  console.log(currentTime);

  $('.description').each(function (i, timeEl) {
    var blockTime = $(this).parent().attr('id').split('-')[1];
    console.log(blockTime);
    
    if (currentTime == blockTime) {
      $(this).addClass('present')
      $(this).removeClass('past')
      $(this).removeClass('future')
    } else if (currentTime > blockTime) {
      $(this).addClass('past')
      $(this).removeClass('present')  
      $(this).removeClass('future')
    } else {
      $(this).addClass('future')
      $(this).removeClass('present')
      $(this).removeClass('past')
    };

    var data = JSON.parse(localStorage.getItem('saveData'))||{};
    $(this).val(data['hour-' + blockTime]);
  });

  $('.saveBtn').each(function (i, btnEl) {
    $(this).on('click', function(event) {
      var textToSave = $(event.target).siblings('textarea').val();
      var blockTime = $(event.target).parent().attr('id');
      var data = JSON.parse(localStorage.getItem('saveData'))||{};
      data[blockTime] = textToSave;
      localStorage.setItem('saveData', JSON.stringify(data));
    });
  });
});
