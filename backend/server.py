from flask import Flask, jsonify, request
import pymongo
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)


@app.route('/', methods=['GET'])
def home():
    return "Hello World"


def calculate_match_score(user_profile, job_posting):
    score = 0

    if user_profile["experience_level"] == job_posting["experience_level"]: #give high preference to experience_level
        score += 1000
    if job_posting["job_title"] in user_profile["preferences"]["desired_roles"]:
        score += 20
    if job_posting["location"] in user_profile["preferences"]["locations"]:
        score += 20
    if job_posting["job_type"] == user_profile["preferences"]["job_type"]:
        score += 20


    user_skills = set(user_profile["skills"])
    job_skills = set(job_posting["required_skills"])
    skill_overlap = len(user_skills & job_skills)
    if skill_overlap > 0:
        score += skill_overlap * 5  

    return score


def convert_objectid_to_str(doc):
    if '_id' in doc:
        doc['_id'] = str(doc['_id'])
    return doc



@app.route('/recommend_jobs', methods=['POST'])
def recommend_jobs():

    user_profile = request.get_json()['user_info']

    if not user_profile:
        return jsonify({'error':'Invalid input / Request body is empty'}), 400

    try: 
        myclient = pymongo.MongoClient('mongodb://localhost:27017/')
        mydb = myclient['recommend']
    except:
        return jsonify({'error':'failed to connect to database'}), 500
    mycoll = mydb['job_posting']

    print("user:\n", user_profile)

    # job_postings = list(mycoll.find({}))
    try:
        mydb['user_profile'].insert_one(user_profile)
    # Pre-filter job postings using MongoDB query
        job_postings = list(mycoll.find({
            "experience_level": user_profile["experience_level"],
            "job_title": {"$in": user_profile["preferences"]["desired_roles"]},
            "location": {"$in": user_profile["preferences"]["locations"]},
            "job_type": user_profile["preferences"]["job_type"]
        }))
    except:
        return jsonify({'error':'database query failed'}), 500

    recommendations = []
    for job in job_postings:
        score = calculate_match_score(user_profile, job)
        recommendations.append((job, score))
    
    recommendations.sort(key=lambda x: x[1], reverse=True)
    top_jobs = [convert_objectid_to_str(job) for job, _ in recommendations[:5]]  # Return top 5 recommendations
    return jsonify(top_jobs)



if __name__ == '__main__':
    app.run(debug=True, port=5000)