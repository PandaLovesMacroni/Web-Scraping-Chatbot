// Function send the msg to the content.js for searching the input text in all articles stored in database.
async function searchAllArticles(message) 
{
  chrome.tabs.query(
    { 
      active: true, 
      currentWindow: true }, 
      (allTabs) =>{chrome.tabs.sendMessage(allTabs[0].id, message, ()=> {});}
    );
    
}

// Function send the msg to the content.js for scraping and downloading the current web page.
async function scrapeWebPage(message) 
{
    chrome.tabs.query(
      { 
        active: true, 
        currentWindow: true },
        (tabs) =>{chrome.tabs.sendMessage(tabs[0].id, message, ()=> {});}
      );
      
}


// Calling different fns like sraping the web page or searching the text acc to the input provided
async function handleUserInput(message) {

      const msg = message.toLowerCase();

      if (msg === 'scrape') {
        await scrapeWebPage(msg);
        return "Scraped successfully !! Download will begin shortly";
      } 
      else
      {
        await searchAllArticles(message);
        return "Searched successfully !! Download will begin shortly";
      }
      
}

// Extracting user input 

let getUserInput = document.getElementById('userInput');
let getChatDisplay = document.getElementById('chatDisplay');


// Event gets triggered when user enters some text

getUserInput.addEventListener('keypress', async function (event) {
    if (event.key === 'Enter') 
    {
      const userInput = getUserInput.value; 

      if(userInput !== '') 
      {
        const botResponse = await handleUserInput(userInput);

        // Appending the query of user and bot response to the chat Diplay screen
        const message = document.createElement('p');
        message.innerHTML = '<strong>User: </strong>' + userInput;
        getChatDisplay.appendChild(message);
        const response = document.createElement('p');
        response.innerHTML = '<strong>Bot: </strong>' + botResponse;
        getChatDisplay.appendChild(response);

        getUserInput.value = '';
      }
    }
});