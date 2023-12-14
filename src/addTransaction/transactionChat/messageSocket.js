class EventMessage {
    constructor(sender, message) {
        this.sender = sender;
        this.message = message;
    }
}


class messageSender {
    events = [];
    handlers = [];
    current_user = null;

    constructor() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        this.socket.onopen = (event) => {
            this.receiveEvent(new EventMessage('TEST',  'connected'));
        };
        this.socket.onclose = (event) => {
            this.receiveEvent(new EventMessage('TEST',  'disconnected' ));
        };
        this.socket.onmessage = async (msg) => {
            console.log('received: ', msg.data);
            try {
                const event = JSON.parse(await msg.data);
                this.receiveEvent(event);
            } catch {}
        }
    }

    getCurrentUser() {
        this.current_user = localStorage.getItem('userName');
    }

    broadcastEvent(from, value) {
        console.log('broadcastEvent: ', from, value)
        const event = new EventMessage(from, value);
        this.socket.send(JSON.stringify(event));
    }

    addHandler(handler) {
        console.log('addHandler got called: ', handler)
        this.handlers.push(handler);
    }

    removeHandler(handler) {
        this.handlers.filter((h) => h !== handler);
    }

    removeHandler(handler) {
        this.handlers.filter((h) => h !== handler);
    }

    receiveEvent(event) {
        this.events.push(event);

        this.events.forEach((e) => {
            this.handlers.forEach((handler) => {
                handler(e);
            });
        });
    }

    async sendMessage(message) {
        console.log('this is message: ', message)
        await this.getCurrentUser();
        // const messageObj = {
        //     user: this.current_user,
        //     message: message,
        // }
        const messageObj = new EventMessage(this.current_user, message);
        const messageObjString = JSON.stringify(messageObj);
        this.socket.send(messageObjString);
    }

}

const MessageSender = new messageSender();
export { MessageSender };
