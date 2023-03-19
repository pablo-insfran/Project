import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'
import NavBar from './NavBar'

const StudentsNew = () => {

    const [name, setName] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [profile, setProfile] = useState('')
    const [subject_name, setSubject_name] = useState('')
    const [note, setNote] = useState('')

    const [danger, setDanger] = useState({})

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/students/new', {
            name,
            birthdate,
            profile,
            subject: {
                subject_name,
                note
            }
        })
            .then((result) => {
                console.log("=> StudentNew <=", result)
                navigate('/students')
            })
            .catch((error) => {
                console.log("Algo salió mal => Component StudentNew <=", error)
                setDanger(error.response.data.error.errors)
            })
    }

    return (
        <div >
            <NavBar />
            <div className="container-md needs-validation">
                <h3>New Students</h3>
                <form onSubmit={submitHandler} className="form-control">
                    <div>
                        <label htmlFor="" className="form-label">Student Name</label>
                        <input className="form-control" type="text" onChange={(e) => setName(e.target.value)} />
                        {danger.name ? <span className='text-danger'>{danger.name.message}</span> : null} <br />
                        <div className="invalid-feedback">
                        </div>
                    </div>
                    <div>
                        <label htmlFor="">Birthdate</label>
                        <input className="form-control" type="text" onChange={(e) => setBirthdate(e.target.value)} />
                        <div className="invalid-feedback">
                            {danger.birthdate ? <span className='text-danger'>{danger.birthdate.message}</span> : null} <br />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="">Img</label>
                        <input className="form-control" type="text" onChange={(e) => setProfile(e.target.value)} />
                        {/* <div className="invalid-feedback">
                            {danger.birthdate ? <span className='text-danger'>{danger.birthdate.message}</span> : null} <br />
                        </div> */}
                    </div>
                    <div>
                        <label htmlFor="">Your Name</label>
                        <input className="form-control" type="text" onChange={(e) => setSubject_name(e.target.value)} />
                    </div>
                    <div >
                        <label htmlFor="">Rating </label>
                        <select className="form-select" onChange={(e) => setNote(e.target.value)}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <br></br>
                    <div>
                        <button type="submit" className="btn btn-success">Submit</button>
                        <Link to={'/students/'} className="btn btn-danger">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default StudentsNew
