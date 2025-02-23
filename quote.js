// Person object that holds data about the person
const person = {
    name: "John Doe",
    age: 30,
    profession: "Software Developer",
    hobbies: ["Reading", "Cycling", "Traveling"],
    hometown: "New York",
    favoriteColor: "Blue",
};

// Function to display messages in the chatbox
function displayMessage(message, sender) {
    const chatbox = document.getElementById('chatbox');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerText = message;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
}

// Function to process user input and respond
function processMessage() {
    const userInput = document.getElementById('user-input').value.toLowerCase();
    const response = getResponse(userInput);

    // Display the user's message
    displayMessage(`You: ${userInput}`, 'user-message');

    // Display the bot's response
    displayMessage(`Bot: ${response}`, 'bot-message');

    // Clear input field
    document.getElementById('user-input').value = '';
}

// Function to generate a response based on the user's question
function getResponse(input) {
    if (input.includes("name")) {
        return `My name is ${person.name}.`;
    } else if (input.includes("age")) {
        return `I am ${person.age} years old.`;
    } else if (input.includes("profession") || input.includes("job")) {
        return `I work as a ${person.profession}.`;
    } else if (input.includes("hobbies") || input.includes("like")) {
        return `I enjoy ${person.hobbies.join(", ")}.`;
    } else if (input.includes("hometown") || input.includes("from")) {
        return `I am from ${person.hometown}.`;
    } else if (input.includes("favorite color") || input.includes("color")) {
        return `My favorite color is ${person.favoriteColor}.`;
    } else {
        return `Sorry, I don't understand that question. Can you ask about something else?`;
    }
}
