from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
from supabase import create_client
from fastapi.middleware.cors import CORSMiddleware

from webScraping import scrapeUrlContent
from getSnippets import findAllIndexes , getSnippetFromArticle
from config import url, key
 
# Creating new Supabase client
supabase1 = create_client(url, key)

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model to store the url 
class URL(BaseModel):
    url: str
    
# Home route
@app.get("/")
def read_root():
    return {"greetings": "Welcome to Web Scraping Chatbot "}

#Searching the input text in all articles in database
@app.get("/textsearch/{text_s}")
def search_scrape(text_s : str):
  query = text_s
  myquery = "%" + query + "%"

  # Searching in DB using case-insensitive query
  data=  supabase1.table("MyScrapeData").select("url", "scrapedText").ilike("scrapedText",myquery).execute()

  # Code to extract snippets from the resultant articles containing input text
  data = dict(data)
  snippets = []
  
  for result in data['data']:
    url = result['url']
    text = result['scrapedText']
    # Getting all indexes from text matching query 
    indexes = findAllIndexes(text.lower(), query.lower())
  
    n = len(text)
    if(len(indexes) > 0 ):
      
      for i in range(len(indexes)):
        #Extracting and storing snippets from the article
        snippet = getSnippetFromArticle(text, indexes[i], n , query)
        mysnippet = {"url": url , "snippet": snippet}
        snippets.append(mysnippet)
    
    
  return snippets

# Scraping web page text content
@app.post("/url")
def post_scrape(text : URL):
  url = text.url
  text_content = scrapeUrlContent(url)
  
  data=  supabase1.table("MyScrapeData").insert(dict({"url":url , "scrapedText": text_content})).execute()

  return data



if __name__ == "__main__":
    config = uvicorn.Config(
        app=app,
        host="0.0.0.0",
        port=8081
    )
    server = uvicorn.Server(config=config)
    server.run()
