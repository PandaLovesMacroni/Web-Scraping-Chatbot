// Function to download the file 
async function downloadFile(text, filename) 
{
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// Caling the post API to post the url to be scraped
// Downloading the scraped text in txt format
const postToBeScrapedUrl = (text) => {

  options = {
    method:"POST",
    body: JSON.stringify(text),
    headers : {
      
    "Content-type": "application/json"
    }
  }


  return fetch("https://fast--anushka11090000.repl.co/url", options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error posting the scraped text");
      }
    })
    .then((data) => {
      
      let myscrapetext = data['data']['0']['scrapedText'];
      downloadFile(myscrapetext, "ScrapedWebPage.txt")
      return data;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};

// Calling get API for getting search results'snippets from all articles stored
// Downloading the text search results

const getSearchResults = (query) => {

  url = "https://fast--anushka11090000.repl.co/textsearch/" + query
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error retrieving search results");
      }
    })
    .then((data) => {
      data = JSON.stringify(data)
      downloadFile(data,"TextSearchResults.txt" )
      return data;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};



// Listening for the the message from "content.js"
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    
      if (message == "scrape")
      {
        await postToBeScrapedUrl({url : document.URL})
      }
      else
      {
        await getSearchResults(message);
      }

  });








