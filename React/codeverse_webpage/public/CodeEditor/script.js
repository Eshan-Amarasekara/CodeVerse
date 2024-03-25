const html_code = document.querySelector('.html-code textarea');
const result = document.querySelector('#result');

// Fetch data from Flask route
fetch('http://127.0.0.1:8000/me')
    .then(response => response.json())
    .then(data => {
        // Clear existing HTML content
        html_code.value = '';

        for (let i = 0; i < data.me.length; i++) {
            // Assuming 'me' is an array with HTML strings
            const htmlString = data.me[i];
        
            // Convert the HTML string into a well-formed HTML structure
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, 'text/html');
        
            // Update textarea values with fetched data
            html_code.value += htmlString + '\n';
        }
        
        // Call run() outside the loop to ensure it runs after the loop completes
        run();

    })
    .catch(error => console.error('Error fetching data:', error));

function run() {
    // Storing data in Local Storage
    localStorage.setItem('html_code', html_code.value);

    // Executing HTML, CSS & JS code
    result.contentDocument.body.innerHTML = localStorage.html_code;
}

// Checking if the user is typing anything in the input field
html_code.onkeyup = () => run();

// Accessing data stored in Local Storage. To make it more advanced you could check if there is any data stored in Local Storage.
html_code.value = localStorage.html_code;
