document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');

    // The URL of your backend API endpoint
    /*
    const apiUrl = 'http://localhost:5000/api/chat';

    chatForm.addEventListener('submit', async (e) => {
        // Prevent the default form submission which reloads the page
        e.preventDefault();

        const messageText = userInput.value.trim();

        // Don't send empty messages
        if (!messageText) {
            return;
        }

        // Add user's message to the chatbox
        appendMessage('user',messageText);

        // Clear the input field and set focus
        userInput.value = '';
        userInput.focus();

        try {
            // Simulasi dummy balasan bot (placeholder)
            setTimeout(() => {
              appendMessage('bot', 'Gemini is thinking... (this is dummy response)');
            }, 1000);

            // Send the user's message to the backend
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: messageText }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // Add Gemini's response to the chatbox
            appendMessage('bot',data.reply);

        } catch (error) {
            console.log('Error fetching from API:', error);
            appendMessage('Sorry, something went wrong. Please try again.', 'bot-error');
        }
    });
    */
    const apiUrl = 'http://localhost:5000/api/chat';
    chatForm.addEventListener('submit', function (e) {
      e.preventDefault();

      

       try {
            const userMessage = userInput.value.trim();
            if (!userMessage) return;

            appendMessage('user', userMessage);
            userInput.value = '';
            userInput.focus;
            // Send the user's message to the backend

            setTimeout(() => {
              appendMessage('bot', 'Gemini is thinking... (this is dummy response)');
            }, 1000);
            /*
            !async function(){
            let data = await fetch(apiUrl,{
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ prompt: userMessage }),
                })
                .then((response) => {
                  if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                  }
                  response.json();
                })
                .then(res => = )
                .catch(error => {
                    console.error(error);
                });
                //appendMessage('bot', res.reply);
                
            }();
            */
           fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                prompt: userMessage
              })
            })
            .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
              })
            .then(data => appendMessage('bot', data.reply))
            .catch(error => console.error('Error:', error));

            //appendMessage('bot', data.reply);
            /*
            const response =  fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: userMessage }),
            });
            *
            //const data =  response.JSON();
            console.log(response.status);
            */
            /*
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }*/

            //const data =  response.json();
             // Add Gemini's response to the chatbox
            //appendMessage('bot', data.reply);

        } catch (error) {
             console.error('Error fetching from API:', error);
             appendMessage('Sorry, something went wrong. Please try again.', 'bot-error');
        }



      // Simulasi dummy balasan bot (placeholder)
      /*setTimeout(() => {
        appendMessage('bot', 'Gemini is thinking... (this is dummy response)');
      }, 1000);*/
      
    });

    function appendMessage(sender, text) {
      const msg = document.createElement('div');
      msg.classList.add('message', sender);
      msg.textContent = text;
      chatBox.appendChild(msg);
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    /*
    function appendMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        
        const messageContent = document.createElement('p');
        messageContent.textContent = text;

        messageElement.appendChild(messageContent);
        chatBox.appendChild(messageElement);
        // Scroll to the latest message
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    */
});

