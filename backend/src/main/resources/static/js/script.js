'use strict'

let stompClient
let username
let pin

const connect = (event) => {
    event.preventDefault()
    username = document.querySelector('#username').value.trim()

    if(!pin){
        const status = document.querySelector('#status')
        status.innerHTML = 'Get pin first!'
        status.style.color = 'red'
        return;
    }

    if (username) {
        const login = document.querySelector('#login')
        login.classList.add('hide')

        const chatPage = document.querySelector('#chat-page')
        chatPage.classList.remove('hide')

        const socket = new SockJS('/chat-example')
        stompClient = Stomp.over(socket)
        stompClient.connect({}, onConnected, onError)
    }
}

const onConnected = () => {
    stompClient.subscribe(`/topic/public/${pin}`, onMessageReceived)
    stompClient.send(`/app/chat/${pin}.newUser`,
        {},
        JSON.stringify({sender: username, type: 'CONNECT'})
    )
    const status = document.querySelector('#status')
    status.className = 'hide'
}

const onError = (error) => {
    const status = document.querySelector('#status')
    status.innerHTML = 'Could not find the connection you were looking for. Move along. Or, Refresh the page!'
    status.style.color = 'red'
}

const sendMessage = (event) => {
    event.preventDefault();
    const messageInput = document.querySelector('#message')
    const messageContent = messageInput.value.trim()

    if (messageContent === "start" && stompClient){
        const chatMessage = {
            sender: username,
            content: messageInput.value,
            type: 'START_GAME',
            time: moment().calendar()
        }
        stompClient.send(`/app/chat/${pin}.startGame`, {}, JSON.stringify(chatMessage))
        messageInput.value = ''
        return
    }

    if (messageContent && stompClient) {
        const chatMessage = {
            sender: username,
            content: messageInput.value,
            type: 'CHAT',
            time: moment().calendar()
        }
        stompClient.send(`/app/chat/${pin}.send`, {}, JSON.stringify(chatMessage))
        messageInput.value = ''
    }
}


const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);

    const chatCard = document.createElement('div')
    chatCard.className = 'card-body'

    const flexBox = document.createElement('div')
    flexBox.className = 'd-flex justify-content-end mb-4'
    chatCard.appendChild(flexBox)

    const messageElement = document.createElement('div')
    messageElement.className = 'msg_container_send'

    flexBox.appendChild(messageElement)

    if (message.type === 'CONNECT') {
        messageElement.classList.add('event-message')
        message.content = message.sender + ' connected!'
    } else if (message.type === 'DISCONNECT') {
        messageElement.classList.add('event-message')
        message.content = message.sender + ' left!'
    } else {
        messageElement.classList.add('chat-message')

        const avatarContainer = document.createElement('div')
        avatarContainer.className = 'img_cont_msg'
        const avatarElement = document.createElement('div')
        avatarElement.className = 'circle user_img_msg'
        const avatarText = document.createTextNode(message.sender[0])
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor(message.sender)
        avatarContainer.appendChild(avatarElement)

        messageElement.style['background-color'] = getAvatarColor(message.sender)

        flexBox.appendChild(avatarContainer)

        const time = document.createElement('span')
        time.className = 'msg_time_send'
        time.innerHTML = message.time
        messageElement.appendChild(time)

    }

    messageElement.innerHTML = message.content

    const chat = document.querySelector('#chat')
    chat.appendChild(flexBox)
    chat.scrollTop = chat.scrollHeight
}

const hashCode = (str) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    return hash
}


const getAvatarColor = (messageSender) => {
    const colours = ['#2196F3', '#32c787', '#1BC6B4', '#A1B4C4']
    const index = Math.abs(hashCode(messageSender) % colours.length)
    return colours[index]
}

const getPin = (async (event) =>{
    event.preventDefault();
    let gameId = document.querySelector('#gameId').value.trim()
    if(gameId === ""){
        return
    }
    pin = await axios.post(`/api/v1/games/new/${gameId}`).then(function (response) {
            console.log(response);
            const status = document.querySelector('#status');
            status.innerHTML = response.data.pin;
            status.style.color = 'green';
            return response.data.pin;
    })
});

const newGameForm = document.querySelector('#new-game-form')
newGameForm.addEventListener('submit', getPin, true)
const loginForm = document.querySelector('#login-form')
loginForm.addEventListener('submit', connect, true)
const messageControls = document.querySelector('#message-controls')
messageControls.addEventListener('submit', sendMessage, true)