import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './user.css'
import Display from './Display';

const User = () => {
    const [userProfile, setUserProfile] = useState({
        name: '',
        skills: [],
        experience_level: '',
        preferences: {
            desired_roles: [],
            locations: [],
            job_type: ''
        }
    });

    const [res, setres] = useState({})

    const skillOptions = ['Python', 'Django', 'REST APIs', 'JavaScript', 'React', 'Node.js'];
    const experienceOptions = ['Junior', 'Intermediate', 'Advanced'];
    const roleOptions = ['Backend Developer', 'Frontend Developer', 'Software Engineer', 'Full-Stack Developer'];
    const locationOptions = ['Remote', 'New York', 'San Francisco', 'London'];
    const jobTypeOptions = ['Full-Time', 'Part-Time', 'Internship'];

    const handleMultiSelectChange = (e, name) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);

        if (name === 'skills') {
            setUserProfile(prevState => ({
                ...prevState,
                skills: [...new Set([...prevState.skills, ...selectedOptions])]
            }));
        } else if (name === 'desired_roles') {
            setUserProfile(prevState => ({
                ...prevState,
                preferences: {
                    ...prevState.preferences,
                    desired_roles: [...new Set([...prevState.preferences.desired_roles, ...selectedOptions])]
                }
            }));
        } else if (name === 'locations') {
            setUserProfile(prevState => ({
                ...prevState,
                preferences: {
                    ...prevState.preferences,
                    locations: [...new Set([...prevState.preferences.locations, ...selectedOptions])]
                }
            }));
        }
    };

    const handleSelectChange = (e, name) => {
        const value = e.target.value;
        if (name === 'experience_level') {
            setUserProfile(prevState => ({
                ...prevState,
                experience_level: value
            }));
        } else if (name === 'job_type') {
            setUserProfile(prevState => ({
                ...prevState,
                preferences: {
                    ...prevState.preferences,
                    job_type: value
                }
            }));
        }
    };


    // Handle removing a selected skill/role/location
    const handleRemoveSelection = (name, value) => {
        if (name === 'skills') {
            setUserProfile(prevState => ({
                ...prevState,
                skills: prevState.skills.filter(skill => skill !== value)
            }));
        } else if (name === 'desired_roles') {
            setUserProfile(prevState => ({
                ...prevState,
                preferences: {
                    ...prevState.preferences,
                    desired_roles: prevState.preferences.desired_roles.filter(role => role !== value)
                }
            }));
        } else if (name === 'locations') {
            setUserProfile(prevState => ({
                ...prevState,
                preferences: {
                    ...prevState.preferences,
                    locations: prevState.preferences.locations.filter(location => location !== value)
                }
            }));
        }
    };


    const handleSubmit = e => {
        e.preventDefault();
        console.log(userProfile);

        (async () => {
            await fetch('http://localhost:5000/recommend_jobs', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    'user_info': userProfile
                })
            })
                .then(async res => {
                    if (!res.ok) {
                        const errdata = await res.json();
                        throw new Error(`${res.status}: ${errdata.error}`);
                    }
                    return res.json();
                })
                .then((res) => {
                    console.log(res);
                    setres(res)
                })
                .catch((err) => {
                    console.error('Error:', err.message);
                    alert(`Error: ${err.message}`);
                })
        })();

    };

    return (
        <div>
            <Container className="mt-5">
                <h2 className="text-center mb-4">User Profile Form</h2>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formName">
                                <Form.Label>Name <span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your name"
                                    value={userProfile.name}
                                    onChange={e => setUserProfile({ ...userProfile, name: e.target.value })}
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="formExperience">
                                <Form.Label>Experience Level</Form.Label>
                                <Form.Select
                                    value={userProfile.experience_level}
                                    onChange={e => handleSelectChange(e, 'experience_level')}
                                >
                                    <option value="" disabled>Select experience level</option>
                                    {experienceOptions.map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formSkills">
                                <Form.Label>Skills (Select multiple)</Form.Label>
                                <Form.Select

                                    value={userProfile.skills}
                                    onChange={e => handleMultiSelectChange(e, 'skills')}
                                >
                                    <option value="" disabled>Select Skills</option>
                                    {skillOptions.map(skill => (
                                        <option key={skill} value={skill}>{skill}</option>
                                    ))}
                                </Form.Select>
                                <Form.Text className="text-muted">
                                    <div>
                                        Selected Skills:{" "}
                                        {userProfile.skills.map(skill => (
                                            <span key={skill} style={{ marginRight: '10px' }}>
                                                {skill} <button type="button" className='close-button' onClick={() => handleRemoveSelection('skills', skill)}>x</button>
                                            </span>
                                        ))}
                                    </div>
                                </Form.Text>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="formJobType">
                                <Form.Label>Job Type</Form.Label>
                                <Form.Select
                                    value={userProfile.preferences.job_type}
                                    onChange={e => handleSelectChange(e, 'job_type')}
                                >
                                    <option value="" disabled>Select job type</option>
                                    {jobTypeOptions.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formDesiredRoles">
                                <Form.Label>Desired Roles (Select multiple)</Form.Label>
                                <Form.Select

                                    value={userProfile.preferences.desired_roles}
                                    onChange={e => handleMultiSelectChange(e, 'desired_roles')}
                                >
                                    <option value="" disabled>Select Roles</option>
                                    {roleOptions.map(role => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </Form.Select>
                                <Form.Text className="text-muted">
                                    <div>
                                        Selected Roles:{" "}
                                        {userProfile.preferences.desired_roles.map(role => (
                                            <span key={role} style={{ marginRight: '10px' }}>
                                                {role} <button type="button" className='close-button' onClick={() => handleRemoveSelection('desired_roles', role)}>x</button>
                                            </span>
                                        ))}
                                    </div>
                                </Form.Text>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="formLocations">
                                <Form.Label>Locations (Select multiple)</Form.Label>
                                <Form.Select

                                    value={userProfile.preferences.locations}
                                    onChange={e => handleMultiSelectChange(e, 'locations')}
                                >
                                    <option value="" disabled>Select Location</option>
                                    {locationOptions.map(location => (
                                        <option key={location} value={location}>{location}</option>
                                    ))}
                                </Form.Select>
                                <Form.Text className="text-muted">
                                    <div>
                                        Selected Locations:{" "}
                                        {userProfile.preferences.locations.map(location => (
                                            <span key={location} style={{ marginRight: '2px' }}>
                                                {location} <button className='close-button' type="button" onClick={() => handleRemoveSelection('locations', location)}>&times;</button>
                                            </span>
                                        ))}
                                    </div>
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="text-center">
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
                <Display jobsref={res} />

            </Container>

        </div>
    );
};

export default User;
