//render the chat templetes to the DOM
class ChatUI {
    constructor(list){
        this.list = list;
    }
    render(data){
        const html = `
           <li class ="list-group-item">
              <span class = "username">${data.username}</span>
              <span class = "message">${data.message}</span>
              <div class = "time">${data.created_at.toDate()}</div>
           </li>
        `;

        this.list.innerHtml += html;
    }
}

//clear the list of all chats(when the room changes)