const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-input');
const form = document.getElementById('chat-form');

async function sendMessage() {
    const userMessage = userInput.value.trim(); // Trim whitespace
    if (!userMessage) return; // Prevent sending empty messages
    userInput.value = ''; // Clear input field
    chatHistory.innerHTML += `<div class="user-message">${userMessage}</div>`; // Show user message

    const loader = document.getElementById('loader');
    loader.style.display = 'block'; // Show loader

    try {
        const response = await fetch('https://sweedney101.onrender.com/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userInput: userMessage }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const botMessage = data.response;

        // Add bot message to chat history
        chatHistory.innerHTML += `<div class="bot-message">${botMessage}</div>`;

        // Scroll to the bottom of the chat history
        chatHistory.scrollTop = chatHistory.scrollHeight;
    } catch (error) {
        console.error('Error:', error);
        chatHistory.innerHTML += `<div class="error-message">Error: ${error.message}</div>`;
    } finally {
        loader.style.display = 'none'; // Hide loader after the message is sent
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission
    sendMessage(); // Call the sendMessage function
});
