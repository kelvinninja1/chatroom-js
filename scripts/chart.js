//adding new chat documents

class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("chat");
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
}

const chatroom = new Chatroom("gaming", "rio");
chatroom
  .addChat("Hello everyone")
  .then(() => console.log("chat added"))
  .catch((err) => console.log(err));

//setting up real-time listener t0 get new chats
//upadating the user
//updating the room
