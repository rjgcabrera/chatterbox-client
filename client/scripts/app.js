
$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.sfm6.hackreactor.com/',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
});



$.ajax({
    // always use this url
    url: 'http://parse.sfm6.hackreactor.com/',
    type: 'GET',
    data: 'order=-createdAt',
    contentType: 'application/json',
    success: function (data) {
        _.each(data.results, function(item){
            $('#messages').append('<li>'+item.text+'</li>');
        });
    },
    error: function (data) {
        console.error('chatterbox: Failed to send message');
    }
});


//var access_token = " "
//$.get()


