const chatform = document.getElementById('chat-form')
const chatmessages = document.getElementById('chat-messages')
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

const socket = io();

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  

socket.emit('joinRoom', { username, room });

socket.on('message', massage => {
    console.log(massage)
    outputMessage(massage);
})

socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

chatform.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    socket.emit('chatMessage', msg)

    // Clear target

    chatmessages.scrollTo = chatmessages.scrollHeight;

    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username;
    p.innerHTML += `<span>${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
  }

  function outputRoomName(room){
   roomName.innerText=room;
  }

  function outputUsers(users) {
    console.log(users)
    userList.innerHTML = ''
    users.forEach((user) => {
      const li = document.createElement('li');
      li.innerText = user.username;
      userList.appendChild(li);
    });
  }


 