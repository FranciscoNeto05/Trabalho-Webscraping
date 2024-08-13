import subprocess
from bs4 import BeautifulSoup

def execute_scraping(param):
    subprocess.run(['bash', 'python/scraping.sh', param], check=True)

def clean_data():
    with open('index.html', 'r', encoding='utf-8') as file:
        content = file.read()
    soup = BeautifulSoup(content, 'html.parser')

    price_elements = soup.find_all('span', class_='andes-money-amount__fraction')
    prices = [price_element.text.replace('\xa0', ' ').strip() for price_element in price_elements]

    description_elements = soup.find_all('h2', class_='ui-search-item__title')
    descriptions = [description_element.text.strip() for description_element in description_elements]

    pairs = [{'preco': price, 'descricao': description} for price, description in zip(prices, descriptions)]
    
    return pairs