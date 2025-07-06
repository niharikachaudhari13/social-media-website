from flask import Flask, request, jsonify
from flask_cors import CORS
from post_generator import generate_post
from few_shot import FewShotPosts
import os

app = Flask(__name__)

# CORS configuration for production
if os.environ.get('FLASK_ENV') == 'production':
    CORS(app, supports_credentials=True, origins=[
        "https://your-frontend-app.onrender.com",
        "https://your-backend-app.onrender.com"
    ])
else:
    CORS(app, supports_credentials=True)

@app.route('/')
def home():
    return "Hello from Flask!"

@app.route('/health')
def health():
    return jsonify({"status": "OK", "message": "Post Generator API is running"})

@app.route('/generate_post', methods=['POST'])
def generate_post_api():
    data = request.get_json()
    selected_length = data.get('length')
    selected_language = data.get('language')
    selected_tag = data.get('tag')

    if not all([selected_length, selected_language, selected_tag]):
        return jsonify({"error": "Missing parameters"}), 400

    try:
        post = generate_post(selected_length, selected_language, selected_tag)
        return jsonify({"post": post})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/tags', methods=['GET'])
def get_tags_api():
    fs = FewShotPosts()
    tags = fs.get_tags()
    return jsonify({"tags": tags})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)
