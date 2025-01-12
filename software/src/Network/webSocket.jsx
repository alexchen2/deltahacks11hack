import { url } from "../data/constants";

const wsConnect = () => {
    // Connect to WebSocket server
    const websocket = new WebSocket(url);
    
    // Assign callbacks to server
    websocket.onopen = (evt) => { onOpen(evt) };
    websocket.onclose = (evt) => { onClose(evt) };
    websocket.onmessage = (evt) => { onMessage(evt) };
    websocket.onerror = (evt) => { onError(evt) };

    return websocket
}

// Called when a WebSocket connection is established with the server
function onOpen(evt) {
    // Log connection state
    console.log("Connected");
}

// Called when the WebSocket connection is closed
function onClose(evt) {

    // Log disconnection state
    console.log("Disconnected");
    
    // Try to reconnect after a few seconds
    setTimeout(function() { wsConnect(url) }, 2000);
}

// Called when a message is received from the server

// WIP: Work for 
function onMessage(evt) {
    // Print out our received message
    console.log("Received: " + evt.data);
    
    // Update circle graphic with LED state
    switch(evt.data) {
        case "0":
            console.log("LED is off");
            context.fillStyle = "black";
            context.fill();
            break;
        case "1":
            console.log("LED is on");
            context.fillStyle = "red";
            context.fill();
            break;
        default:
            break;
    }
}

// Called when a WebSocket error occurs
function onError(evt) {
    console.log("ERROR: " + evt.data);
}

// Sends a message to the server (and prints it to the console)
function doSend(message, websocket) {
    console.log("Sending: " + message);
    websocket.send(message);
}

// Called whenever the HTML button is pressed
function onPress() {
    doSend("toggleLED", websocket);
    doSend("getLEDState", websocket);
}

export { wsConnect, doSend };