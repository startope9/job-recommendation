# Job Recommendation Service

## Overview
This project is a job recommendation service built using Flask for the backend and React for the frontend. It matches user profiles with job postings based on various criteria such as experience level, desired roles, locations, job types, and required skills.

## Assumption
- Job postings are present in database.


## Technologies Used
- **Backend**: Python-Flask
- **Frontend**: React

## Installation

### Prerequisites
- Ensure that MongoDB is running and accessible at `localhost:27017`.

### Backend Setup
1. Clone the repository:
    ```bash
    git clone <your-repo-url>
    cd jobs
    ```

3. Install the required packages:
    ```bash
    pip install -r requirements.txt
    ```

4. Run the Flask application:
    ```bash
    python app.py
    ```

### Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd client
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the React application:
    ```bash
    npm start
    ```

## Recommendation Logic
The recommendation logic is based on a scoring system that evaluates the compatibility of user profiles with job postings. Each factor contributes to a total score, which determines the relevance of a job posting to the user.

### Matching Algorithm
1. **Experience Level**: High preference is given to matching experience levels, contributing a significant score.
2. **Desired Roles**: If the job title matches one of the user's desired roles, a small score is added.
3. **Location**: The location of the job must match the user's preferences to add to the score.
4. **Job Type**: The job type must also match to contribute to the score.
5. **Skills Overlap**: The algorithm calculates the overlap between the user's skills and the job's required skills, adding to the score based on the number of matching skills.

### Assumptions and Design Decisions
- User profiles and job postings are stored in a MongoDB database.
- The application assumes that users will provide complete and accurate information in their profiles.

## Challenges Encountered
- **Database Connectivity**: Handling connections and ensuring the database is running before executing queries.
- **Error Handling**: Implementing error handling to provide meaningful messages in case of failures.


# job-recommendation
# job-recommendation
