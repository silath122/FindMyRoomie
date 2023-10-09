import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";


function SurveyForm() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        grade: '',
        major: '',
        bio: '',
        cleanliness: 0,
        friendliness: 0,
        studyAmount: 0,
        bedtime: 0,
        wakeup: 0,
        workhours: 0,
        closeness: 0,
        roommateamount: 0,

    });
    const [formComplete, setFormComplete] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

       setFormComplete(true)
    };

    const handleFormSubmit = (data) => {
        setFormComplete(true);
    };

    useEffect(() => {

        if (formComplete) navigate("/home");

    }, [formComplete]);

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text"
                       name="name"
                       value={formData.name}
                       onChange={handleChange} />
            </div>
            <div>
                <label>Age:</label>
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange} />
            </div>
            <div>
                <label>email:</label>
                <input
                    type="text"
                    name="age"
                    value={formData.email}
                    onChange={(event)=>{
                    const value = event.target.value;
                    setFormData({
                        ...formData,
                        email: value})
                }} />
            </div>
            <div>
                <label>year in school:</label>
                <input
                    type="text"
                    name="age"
                    value={formData.grade}
                       onChange={(event)=>{
                           const value = event.target.value;
                           setFormData({
                               ...formData,
                               grade: value})
                       }}
                />
            </div>
            <div>
                <label>tell us about yourself:</label>
                <input
                    type="text"
                    name="age"
                    value={formData.bio}
                       onChange={(event)=>{
                           const value = event.target.value;
                           setFormData({
                               ...formData,
                               bio: value})
                       }} />
            </div>
            <div>
                <label>How clean are you?</label>
                <select name="cleanliness" value={formData.cleanliness}
                        onChange={(event)=>{
                            const value = event.target.value;
                            setFormData({
                                ...formData,
                                cleanliness: value})
                        }}>
                    <option value="0">Not at all</option>
                    <option value="1">Slightly</option>
                    <option value="2">Moderately</option>
                    <option value="3">Very</option>
                    <option value="4">Extremely</option>
                </select>
            </div>
            <div>
                <label>How extroverted are you?</label>
                <select name="friendliness" value={formData.friendliness}
                        onChange={(event)=>{
                            const value = event.target.value;
                            setFormData({
                                ...formData,
                                friendliness: value})
                        }}>
                    <option value="0">Not at all</option>
                    <option value="1">Slightly</option>
                    <option value="2">Moderately</option>
                    <option value="3">Very</option>
                    <option value="4">Extremely</option>
                </select>
            </div>
            <div>
                <label>How much do you study a day?</label>
                <select name="friendliness" value={formData.studyAmount}
                        onChange={(event)=>{
                            const value = event.target.value;
                            setFormData({
                                ...formData,
                                studyAmount: value})
                        }}>
                    <option value="0">0-1 hours</option>
                    <option value="1">2 hours</option>
                    <option value="2">3 hours</option>
                    <option value="3">4+ hours</option>
                </select>
            </div>
            <div>
                <label>What time to you go to sleep?</label>
                <select name="friendliness" value={formData.bedtime}
                        onChange={(event)=>{
                            const value = event.target.value;
                            setFormData({
                                ...formData,
                                bedtime: value})
                        }}>
                    <option value="0">before 10</option>
                    <option value="1">10-11 pm</option>
                    <option value="2">around midnight</option>
                    <option value="3">after midnight</option>
                </select>
            </div>
            <div>
                <label>What time do you wake up?</label>
                <select name="friendliness" value={formData.wakeup}
                        onChange={(event)=>{
                            const value = event.target.value;
                            setFormData({
                                ...formData,
                                wakeup: value})
                        }}>
                    <option value="0">before 6</option>
                    <option value="1">7-8</option>
                    <option value="2">9-10</option>
                    <option value="3">11 or later</option>
                </select>
            </div>
            <div>
                <label>How much do you work a week?</label>
                <select name="friendliness" value={formData.workhours}
                        onChange={(event)=>{
                            const value = event.target.value;
                            setFormData({
                                ...formData,
                                workhours: value})
                        }}>
                    <option value="0">I don't work</option>
                    <option value="1">5-10 hours</option>
                    <option value="2">10-15 hours</option>
                    <option value="3">20- 25 hours</option>
                    <option value="4"> 25+ hours</option>
                </select>
            </div>
            <div>
                <label>How close do you want to be with your roommate/s?</label>
                <select name="friendliness" value={formData.closeness}
                        onChange={(event)=>{
                            const value = event.target.value;
                            setFormData({
                                ...formData,
                                closeness: value})
                        }}>
                    <option value="0">just roommates</option>
                    <option value="1">friendly</option>
                    <option value="2">best friends!</option>
                </select>
            </div>
            <div>
                <label>how many roommates do you want</label>
                <select name="friendliness" value={formData.roommateamount}
                        onChange={(event)=>{
                            const value = event.target.value;
                            setFormData({
                                ...formData,
                                roommateamount: value})
                        }}>
                    <option value="0">1</option>
                    <option value="1">2</option>
                    <option value="2">3</option>
                    <option value="3">4 or more</option>
                </select>
            </div>
            <button type="submit"
                    onSubmit={handleFormSubmit}>Submit</button>
        </form>
    );
}

function Dashboard() {
    const [formCompleted, setFormCompleted] = useState(false);

    const handleFormSubmit = (data) => {
        // Send the form data to your server or update the user's profile
        // After successful submission, set formCompleted to true
        setFormCompleted(true);
    };

    return (
        <div>
            {formCompleted ? (

                <div></div>
            ) : (

                <SurveyForm onSubmit={handleFormSubmit} />
            )}
        </div>
    );
}

export default SurveyForm;
