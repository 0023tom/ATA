document.querySelector('.send__button').addEventListener('click', function() {
    var messageInput = document.querySelector('.message-input');
    var message = messageInput.value.trim(); // Trim leading and trailing whitespace

    if (message !== '') {
        // Add the user's message to the chatbox
        addMessage('User', message);
        
        // Send the message to the server
        fetch('/send_message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'message=' + encodeURIComponent(message)
        })
        .then(response => response.json())
        .then(data => {
            // Display the bot's response in the chatbox
            addMessage('Bot', data.chatbot_response);
            
            // Optionally, display the bot's response alongside the user's message
            // addMessage('Bot', data.bot_response);
        })
        .catch(error => console.error('Error:', error));
        
        // Clear the input after sending the message
        messageInput.value = '';
    }
});

// Function to add a message to the chatbox
function addMessage(sender, message) {
    const chatboxMessages = document.querySelector('.chatbox__messages');
    const newMessage = document.createElement('div');
    newMessage.classList.add('message');
    newMessage.textContent = `${sender}: ${message}`;
    chatboxMessages.appendChild(newMessage);
}
