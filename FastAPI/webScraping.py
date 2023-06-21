from bs4 import BeautifulSoup
import requests

# Scrapping the webPage using the url
def scrapeUrlContent(url):
    urlResponse = requests.get(url)
    urlHtmlContent = urlResponse.content
  
    soup = BeautifulSoup(urlHtmlContent, 'html.parser')
    for html in soup(['style', 'script']):
        html.extract()

    scrapedText = soup.get_text(separator='')
    scrapedText = ' '.join(scrapedText.split()) 

    return scrapedText.strip()