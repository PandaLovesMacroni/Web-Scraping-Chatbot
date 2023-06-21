
# Web Scraping Chatbot - Chrome Extension

Designed a chatbot inside a Chrome extension using plain JS that uses a FastAPI python backend . The bot scrape the current active page and return the text as a downloadable file .Implemented text search over all article contents from the bot using Postgres with Supabase whose results are snippets from the articles which have a match


## Tech Stack

**Client:** HTML, CSS, Javascript

**Server:** Python(FastAPI), Uvicorn, Postgres(Supabase)



## Features

- Scraping the current active web page and return the scraped text as downloadable file.
- Doing text search to find all the snippets of "query" in all article content of the bot and return them in json format in downloadable text file.


## User Guide

- Activate the chrome extension by clicking on the extension's icon in your browser
- If the user enters "scrape" (Case Insensitive), current active tab's url is sent to server and scraped text is return in file named "ScrapedWebPage.txt" 
- Else, for any other input text search is implemeted and server returns the snippets and associated webpages url in json format in file named "TextSearchResults.txt".


## Run Web Scraping Chatbot Extension Locally

Clone the project

```bash
  git clone https://github.com/PandaLovesMacroni/Web-Scraping-Chatbot
```



Installing extension on your Chrome browser

- Open "Manage Extensions" in your chrome browser 
- Turn on developer mode on top right section 
- Click on "Load Unpacked" button on top left corner and open the folder "Web-Scraping-Chatbot/Chrome-Extension-JS"
- To activate the extension by clicking on extension's icon in the Chrome toolbar



## Run Server Locally

Clone the project

```bash
  git clone https://github.com/PandaLovesMacroni/Web-Scraping-Chatbot
```

Go to the project directory

```bash
  cd Web-Scraping-Chatbot/FastAPI
```

Install dependencies

```bash
  pip install pipenv
  pipenv install fastapi
  pipenv install supabase
```

Start the uvicorn server

```bash
  python main.py
```


## Config Variables

To run this project, you will need to add the following environment variables to your config.py. 

`Supabase_Project_URL`

`Supabase_API_KEY`


## Demo Video

[Web Scraping Chatbot Extension Demo Video](https://drive.google.com/drive/folders/18HuNqpqqKV0LVVdvfrFL3ukPvDptueJq?usp=sharing)


## API Reference

- [Postman Collection](https://lunar-escape-436725.postman.co/workspace/New-Team-Workspace~e362cd01-c203-489c-9881-fc4657843a81/collection/28110640-f51c9357-725a-487e-871c-d8b7b2c95841?action=share&creator=28110640)
- [Postman API Documentation](https://documenter.getpostman.com/view/28110640/2s93z3gRix)
## Support

For support, email anushkaa.work@gmail.com.

