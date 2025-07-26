from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import logging
import time

logging.getLogger('selenium').setLevel(logging.CRITICAL)

def fetch_article_content(url):
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")
    options.add_argument("--disable-blink-features=AutomationControlled")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    try:
        driver.get(url)
        time.sleep(3)

        soup = BeautifulSoup(driver.page_source, "html.parser")
        title = soup.title.string.strip() if soup.title else "No title found"
        paragraphs = soup.find_all("p")
        content = " ".join(p.get_text().strip() for p in paragraphs if len(p.get_text().strip()) > 30)

        return title, content if content else None
    except Exception as e:
        print("❌ Error:", e)
        return None, None
    finally:
        driver.quit()
