import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './deleteuser.css';

const DeleteUser = () => {

    const [state, setState] = useState({uniqueID: ''});
    const {location} = useNavigate();

    async function deleteData(data) {
        await fetch('http://localhost:7788/deleteone', {
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
        },
        'Accept': "application/json",
            body: JSON.stringify(data),
        });
    }

    const handleChange = (event) => {
        setState({uniqueID: event.target.value});
        console.log("Current state: ",state);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Deleting user data with string id ${state.uniqueID}`);
        const userIDDelete = {
            uniqueID: state.uniqueID,
        };
        deleteData(userIDDelete)
            .then((data) => {
                console.log(data);
                window.alert("User data deleted");
            });
    }

    return (
        <div className="main-delete-user-container">
            <div className="delete-user-container">
                <h1 className="delete-header">Delete User</h1>
                <form onSubmit={handleSubmit} className="form-delete">
                    <label className="delete-label">Please fill in your User ID</label>
                    <input className="delete-input" type='text' onChange={handleChange} required/>
                    <div className="button-container">
                        <button className="delete-user-button">Delete</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DeleteUser;