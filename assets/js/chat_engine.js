class ChatEngine{
    constructor(chatBoxId, userEmail) {
         this.chatBox = $(`#${chatBoxId}`);
         this.userEmail = userEmail;
        //io is global variable given to us by sockets.io
        this.socket = io.connect('http://localhost:5050');

        if(this.userEmail){
            this.connectionHandler();
        }

    }

    connectionHandler(){

        let self =this;

        this.socket.on('connect', function(){
            console.log('Connection established using the sockets...');
            
            //join_room isthe name of the event
            self.socket.emit('join_room', { 
                user_email : self.userEmail,
                //room which I want to join
                chatroom : 'NeroSocial'
            });

            self.socket.on('user_joined', function(data){
                console.log('User joined',data);
            });
        });
        // on pressing send button
        $('#send-message').click(()=>{
            let msg = $('#chat-message-input').val();

            if(msg != ''){
                self.socket.emit('send_message', {
                    message:msg,
                    user_email: self.userEmail,
                    chatroom: 'NeroSocial'
                });
            }
        });

        //if socket callback is occuring 
        self.socket.on('receive_message', (data) => {
            console.log('message received' ,data. message);
            
            let newMessage = $('<li>');

            let messageType = 'other-message';
            if(data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>',{
                'html' : data.message
            }));
            newMessage.append($('<sub>', {
                'html' : data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);

        });

    }
}