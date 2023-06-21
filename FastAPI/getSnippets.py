# Finding all indexes of query in text
def findAllIndexes(text, query):
    ptr = 0
    allIndexes = []
    while (1):
        indx = text.find(query, ptr)
        if indx != -1:
            ptr = indx + 1
            allIndexes.append(indx)
        else:
          break 
    return allIndexes
# Extracting snippet of query from text
def getSnippetFromArticle(text,i,n,query):
  x = 100//2
  start = max(0, i - x)
  end = min(n, i + len(query) + x )
  snippet = text[start:end]
  return snippet 