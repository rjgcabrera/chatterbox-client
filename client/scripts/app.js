var app = {
  //set: new Set(),
  friends: [],
  rooms: [],
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages'
};



app.init = function() {
    app.fetch();
    // add other methods
    $('#send').submit(app.handleSubmit);
    $('#chats').on('click', '.username', app.handleUsernameClick);
    $('#roomSelect').change(function(){
       var selectedRoom = $('#roomSelect option:selected').text();
       console.log(selectedRoom);
    //  if (!$('.message').hasClass(selectedRoom)) {

    //  }
       //$(`.message:not(.${selectedRoom})`).toggle();
       $('.message').show();
       $(`.message:not(.${selectedRoom})`).toggle();
       //$(`.${selectedRoom}`).toggle();
    });
    //$('.username').on('click', app.handleUsernameClick);
    
};

app.send = function(message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: app.server,
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
};



app.fetch = function() {
    $.ajax({
        // always use this url
        url: app.server,
        type: 'GET',
        data: 'order=-createdAt',
        datatype: 'json',
        contentType: 'application/json',
        success: function(data) {
            console.log(data);
             _.each(data.results, function(item) {
                 app.renderMessage(item);
                });
            // });
        },
        error: function (data) {
            console.error('chatterbox: Failed to send message');
        }
    });
};


app.clearMessages = function(){
  $('#chats').children().remove();
};

app.renderMessage = function(item) {
    // var node = document.createElement('div')
  var $message = $('<div></div>');
  $message.addClass('message');
  //if statement
  var room = item.roomname;
  if(!room) {
      room = "undefined";
  }
  $message.addClass(room);
  $message.append('<p class="username">' + _.escape(item.username) + '</p>');
  $message.append('<p>' + _.escape(item.text) + '</p>');
  $message.append('<p>' + _.escape(item.createdAt) + '</p>');
  app.renderRoom(room);
  $('#chats').append($message);

};

app.renderRoom = function(room) {
    if (!app.rooms.includes(room)) {
      var $room = $('<option></option>');
      app.rooms.push(room);
      $room.append(room);
      $('#roomSelect').append($room);
    }
};

app.handleSubmit = function(event) {
    var message = {};
    message.text =  $("#message").val();
    message.username = window.location.search.substring(10);
    message.roomname = $("#chatroom").val();
    app.send(message);
    $("#message").val('');
    $("#chatroom").val('');
    event.preventDefault();
};

app.handleUsernameClick = (event) => {
    if(!app.friends.includes($(event.target).text())) {
        app.friends.push($(event.target).text());
        var $friend = $('<div></div>');
        console.log('yooo');
        $friend.append($(event.target).text());
        $('#friends').append($friend);
    }
    // for (var i = 0; i < app.friends.length; i++) {
    //     if($(".message").html().includes(app.friends[i])) {
    //         this.addClass('isFriend')
    //         $(".isFriend").css('font-weight', 'bold')
    //     }
    // }
    var $messages = Array.from($('.message'));
    for (var i = 0; i < $messages.length; i++) {
        for (var j = 0; j < app.friends.length; j++) {
            if ($messages[i].innerHTML.includes(`<p class="username">${app.friends[j]}</p>`)) {
                $messages[i].style.fontWeight = 'bold';
            }
        }
    }

};

$(document).ready(function() {
    app.init();
    //setInterval(app.init, 3000);
    // $('.username').on(click, function() {app.set.add($(this).text());});
});

//(var )

//$('#send .submit').trigger('submit');

//var access_token = " "
//$.get()
