		(function () {
			const socket = io();
        	var user;

			getNameText = () => {
				var $message_input;
		        $message_input = $('.name_input');
		        return $message_input.val();
		    };
		    sendName = (text) => {
		    	if (text.trim() === '') {
		            return;
		        }
		        $('.name_input').val('');		        
		    	socket.emit('setUsername', text);
		    };

		    $('.send_name').click( (e) => {
		    	sendName(getNameText());
		    });

		    socket.on('userExists', (data) => {
        		// $('#error-container').append(data);
        		console.log(data);
          	});

			socket.on('userSet', (data) => {
				user = data.username;
				$('.login').hide();
		    	$('.title').text('Chat | Mionix | ' + user);
		    	$('.chat').show();
			});

			// function sendMessage(){
	  //         var msg = document.getElementById('message').value;
	  //         if(msg){
	  //           socket.emit('msg', {message: msg, user: user})
	  //         }
	  //       }

		    var Message;
		    Message = function (arg) {
		        this.user = arg.user, this.text = arg.text, this.message_side = arg.message_side;
		        this.draw = function (_this) {
		            return function () {
		                var $message;
		                $message = $($('.message_template').clone().html());
		                $message.addClass(_this.message_side).find('.text').html(_this.text);
		                $message.addClass(_this.user).find('.avatar').attr({ title: _this.user });

		                $('.messages').append($message);
		                return setTimeout(function () {
		                    return $message.addClass('appeared');
		                }, 0);
		            };
		        }(this);
		        return this;
		    };
		    $(function () {
		        var getMessageText, message_side, sendMessage;
		        message_side = 'right';
		        getMessageText = function () {
		            var $message_input;
		            $message_input = $('.message_input');
		            return $message_input.val();
		        };
		        sendMessage = function (text) {
		            if (text.trim() === '') {
		                return;
		            }
		            $('.message_input').val('');
		            socket.emit('msg', {message: text, user: user});		            
		        };
		        $('.send_message').click(function (e) {
		            return sendMessage(getMessageText());           
		        });

		        socket.on('newmsg', (data) => {
		          if(user){
		            var $messages, message;
		            $messages = $('.messages');
		            message_side = message_side ===  'left' ? 'left' : 'right';
		            message = new Message({
		            	user: data.user,
		                text: data.message,
		                message_side: message_side
		            });
		            message.draw();
		            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);

		          }
		        })


		        $('.message_input').keyup(function (e) {
		            if (e.which === 13) {
		                return sendMessage(getMessageText());
		            }
		        });
		        // sendMessage('Hello Philip! :)');
		        // setTimeout(function () {
		        //     return sendMessage('Hi Sandy! How are you?');
		        // }, 1000);
		        // return setTimeout(function () {
		        //     return sendMessage('I\'m fine, thank you!');
		        // }, 2000);
		    });




		}.call(this));






