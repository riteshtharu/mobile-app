const jokeTextElement = document.getElementById('joke-text');
const newJokeButton = document.getElementById('new-joke-button');
const container = document.getElementById('container');

// Event listener to fetch a new joke when the button is clicked
newJokeButton.addEventListener('click', generateJoke);

// Event listener for double-click on container to show laughing emoji
container.addEventListener('dblclick', showLaughingEmoji);

// Function to fetch and display the joke
async function generateJoke() {
    try {
        // Fetch joke from the API
        let response = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json'
            }
        });

        // Check if the response is ok (status code 200)
        if (!response.ok) {
            throw new Error(`Failed to fetch jokes: ${response.status}`);
        }

        // Parse the response as JSON
        let data = await response.json();

        // Log the data to the console for debugging
        console.log(data);

        // Display the joke text on the page
        jokeTextElement.textContent = data.joke;

        // Optionally, show the laughing emoji after a delay
        setTimeout(showLaughingEmoji, 5000);

    } catch (error) {
        // Handle any errors that occur during the fetch
        console.error('Error:', error);
        jokeTextElement.textContent = 'Sorry, something went wrong. Please try again.';
    }
}

// Function to show the laughing emoji when the container is double-clicked or after 5 seconds
function showLaughingEmoji() {
    const emoji = document.createElement('div');
    emoji.classList.add('emoji');
    emoji.textContent = '😂'; // Laughing emoji

    // Append the emoji to the container
    container.appendChild(emoji);

    // Remove the emoji after the animation ends
    emoji.addEventListener('animationend', () => {
        emoji.remove();
    });
}
