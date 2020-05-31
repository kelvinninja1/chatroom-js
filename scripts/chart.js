//adding new chat documents

class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("chat");
    this.unsub;
  }

  async addChat(message) {
    //format a chat objet
    const now = new Date();

    const chat = {
      message,
      room: this.room,
      username: this.username,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    };

    const response = await this.chats.add(chat);
    return response;
  }
  //setting up real-time listener t0 get new chats
  getChats(callback){
      this.unsub = this.chats
          .where('room', '==', this.room)
          .orderBy('created_at')
          .onSnapshot(snapshot =>{
            snapshot.docChanges().forEach(change =>{
                if(change.type === 'added'){
                    //console.log(change)
                    callback(change.doc.data());
                }
            })
        })
  }

  updateUsername(username){
    this.username = username;
  }

  updateRoom(room){
    this.room = room;
    console.log('room update')
    if(this.unsub){
      this.unsub();
    }

  }
  
}

const chatroom = new Chatroom("general", "rio");

setTimeout(()=>{
  chatroom.updateRoom('gaming');
  chatroom.updateUsername('tracy');

  chatroom.getChats((data)=>{
    console.log(data)
  });
  chatroom.getChats('hello');

}, 3000)
//upadating the user
//updating the room
