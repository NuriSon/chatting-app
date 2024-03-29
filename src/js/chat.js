"use strict"

const socket = io();

const nickname = document.querySelector("#nickname")
const chatList = document.querySelector(".chatting-list")
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");//scroll

chatInput.addEventListener("keypress", (event)=> { //send chat by pressing enter
    if(event.keyCode === 13){   
        send()
    }

})

function send(){
    const param = {
        name: nickname.value, 
        msg: chatInput.value
    }
    chatInput.value = ''; //clear input
    socket.emit("chattingID", param);
    
}


sendButton.addEventListener("click", send) 
 



socket.on("chattingID", (data)=> {
    const {name, msg, time} = data;
    const item = new LiModel(name, msg, time);
    item.makeLi()
    displayContainer.scrollTo(0, displayContainer.scrollHeight)//read current top of the scroll and move the scroll there
})

function LiModel(name, msg, time) {
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = () => {
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent" : "received")
        const dom = `<span class="profile">
            <span class="user">${this.name}</span>
            <img class="image" src="https://placeimg.com/200/50/any" alt="any">
        </span>
        <span class="message">${this.msg}</span>
        <span class="time">${this.time}</span>`;
        li.innerHTML = dom;
        chatList.appendChild(li)
    }
}
