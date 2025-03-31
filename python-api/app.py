from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

@app.route('/score', methods=['POST'])
def calculate_score():
    try:
        data = request.json
        resume_text = data.get('resume', '')
        job_description = data.get('description', '')

        if not resume_text or not job_description:
            return jsonify({"error": "Resume text and job description are required"}), 400

        # Vectorizing using TF-IDF
        vectorizer = TfidfVectorizer().fit_transform([resume_text, job_description])
        similarity_score = cosine_similarity(vectorizer[0], vectorizer[1])[0][0]

        # Convert score to percentage
        score = round(similarity_score * 100, 2)

        return jsonify({"score": score})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)
 