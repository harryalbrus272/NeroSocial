module.exports.chatSockets = function(socketServer){
    //We will be following the Observer - subscriber pattern of commumnication

    let io = require('socket.io')(socketServer,{
        cors:{
            origin: 'http://localhost:800',
            credentials:true
        }
    });


    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);
        socket.on('disconnect', function(){
            console.log('socket disconnected');
        });

        socket.on('join_room', function (data){
            console.log('joining request received', data);
            socket.join(data.chatroom);

            
        //Other people who have joined the chatroom should get an notification

        io.in(data.chatroom).emit('user_joined', data);

        });

        //detect send message and broadcast to everyone in the room
        socket.on('send_message', (data => {
            io.in(data.chatroom).emit('receive_message',data);
        }));
    });
}