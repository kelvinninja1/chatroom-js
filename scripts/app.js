// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');

//add a new chat
newChatForm.addEventListener('submit', e =>{
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
      .then(() => newChatForm.reset())
      .catch(err => console.log(err));
});

//update username
newNameForm.addEventListener('submit', e =>{
    e.preventDefault();

    const newName = newNameForm.name.value.trim();

    chatroom.updateUsername(newName);

    updateMssg.innerText =  `You updated your name to: ${newName}`;

    newNameForm.reset();

    setTimeout(()=>updateMssg.innerText = '', 3000);
});

//check local storage for username
const username = localStorage.username ? localStorage.username : 'anon';

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('gaming', username);

// get chats & render
chatroom.getChats(data => chatUI.render(data));
