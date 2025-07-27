from newspaper import Article

def fetch_article_content(url):
    try:
        article = Article(url)
        article.download()
        article.parse()

        title = article.title.strip() if article.title else "No title found"
        content = article.text.strip()

        return title, content if content else None
    except Exception as e:
        print("Error extracting article:", e)
        return None, None
