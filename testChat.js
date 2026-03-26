const axios = require('axios'); // Import axios

const testChat = async () => {
  const url = 'https://portfolio-bot-6kls.onrender.com/chat'; // Your API endpoint

  // Data you want to send in the POST request
  const data = {
    question: 'Tell me about her project Skintelligent', // Replace with your query
  };

  try {
    // Send the POST request
    console.log('Sending request...');
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
    });

    // Log the response data
    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);
  } catch (error) {
    // Handle errors (e.g., network errors or non-2xx responses)
    console.error('Error occurred:', error.response ? error.response.data : error.message);
  }
};

testChat(); // Run the function to send the test request
