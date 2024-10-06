import React from 'react';

export default function Display({ jobsref = [] }) {
    if (!jobsref.length) {
        return <p>No job listings available.</p>; // Handle the case when jobsref is empty
    }

    return (
        <div>
            {jobsref.map((job, index) => (
                <div key={index}>
                    <div><b>Job Title: </b>{job.job_title}</div>
                    <div><b>Company:</b> {job.company}</div>
                    <div><b>Location:</b> {job.location}</div>
                    <div><b>Job Type:</b> {job.job_type}</div>
                    <div><b>Required_skills:</b> {job.required_skills.join(', ')}</div>
                    <div><b>Experience_level:</b> {job.experience_level}</div>
                    < br />
                </div>
            ))}
        </div>
    );
}
