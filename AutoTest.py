import joblib
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time
import logging

# Load the trained model pipeline
model = joblib.load("fake_news_model.pkl")

# Suppress selenium and webdriver_manager logs
logging.getLogger('selenium').setLevel(logging.CRITICAL)
logging.getLogger('webdriver_manager').setLevel(logging.CRITICAL)

# Setup headless browser options
def setup_driver():
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")
    options.add_argument("--disable-blink-features=AutomationControlled")
    service = Service(ChromeDriverManager().install())
    return webdriver.Chrome(service=service, options=options)

# Extract title and content from an article
def fetch_article_content(url):
    driver = setup_driver()
    try:
        driver.get(url)
        time.sleep(3)
        soup = BeautifulSoup(driver.page_source, "html.parser")
        title = soup.title.string.strip() if soup.title else "No title"
        paragraphs = soup.find_all("p")
        content = " ".join(p.get_text().strip() for p in paragraphs if len(p.get_text().strip()) > 30)
        return title, content if content else None
    except Exception as e:
        print(f"❌ Error fetching {url}: {e}")
        return None, None
    finally:
        driver.quit()

# Predict using the model
def predict_fake_news(text):
    label = model.predict([text])[0]
    confidence = model.predict_proba([text])[0].max()
    return label, confidence

# URLs to test
real_news_urls = [
    "https://www.bbc.com/sport/football/articles/cvg47498gnro",
    "https://www.bbc.com/news/articles/clylyegq4q4o",
    "https://www.bbc.com/news/articles/cly1598d8yyo",
    "https://www.bbc.com/news/articles/cdeze706jw8o",
    "https://www.bbc.com/news/articles/cqjq51vvello"
]

fake_news_urls = [
    "https://realrawnews.com/2025/07/jag-convicts-and-executes-former-fda-offical-who-wanted-to-infect-america-with-bird-flu/",
    "https://realrawnews.com/2025/07/in-persuit-of-obama/",
    "https://realrawnews.com/2025/07/deep-state-detainee-dies-in-gitmo-cell/",
    "https://realrawnews.com/2025/07/white-hats-see-more-signs-potus-has-been-replaced-or-is-drugged-by-deep-state/",
    "https://realrawnews.com/2025/07/weather-warfare-committee-takes-action-against-geoengineering/"
]

# --- Run Tests ---
print("🧪 Starting fake news detection on test URLs...\n")

for category, urls in [("REAL", real_news_urls), ("FAKE", fake_news_urls)]:
    print(f"\n🔍 Testing {category} news sources:")
    for url in urls:
        title, content = fetch_article_content(url)
        if not content:
            print(f"❌ Skipped (no content): {url}")
            continue
        label, confidence = predict_fake_news(content)
        print(f"📄 Title: {title}")
        print(f"🔗 URL: {url}")
        print(f"📢 Prediction: {label.upper()} ({confidence*100:.2f}% confidence)")
        print("-" * 80)
