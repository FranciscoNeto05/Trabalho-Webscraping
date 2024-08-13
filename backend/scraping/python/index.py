from flask import Flask, jsonify
from scraping import *

app = Flask(__name__)

@app.route('/<string:item_id>', methods=['GET'])
def get_data(item_id):
    try:
        execute_scraping(item_id)
        data = clean_data()
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
