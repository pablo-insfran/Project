import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import NavBar from './NavBar';

import {    MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, 
            MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';

const StundentsNote = () => {

    const [student, setStudent] = useState({})
    const [notes, setNotes] = useState([])
    const [subject_name, setSubject_name] = useState({})
    const [note, setNote] = useState('')

    const { id } = useParams()
    const navigate = useNavigate()

    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/students/${id}`, { withCredentials: true })
            .then((result) => {
                console.log(" => Component StudentsNotes <=", result.data.result.moviesreview)
                setStudent(result.data.result)
                setNotes(result.data.result.subject)
            })
            .catch((error) => { console.log("Algo salió mal  => Component MoviesView - MoviesView <=", error.response.data.message) })
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/students/${id}/subject`, {
            subject_name,
            note
        })
            .then((result) => {
                console.log("Students Notes", result.data.result)
                navigate(`/students/${id}`)
                toggleShow()
            })
            .catch((error) => {
                console.log("Algo salió mal - Movies Review", error.response.data.message)
                // setDanger(error.response.data.error.errors)
            })
    }

    return (
        <>
            {/* Estructura Listado de Materias */}
            <div>
                <NavBar />
                <div className="container-md">
                    <h3>Notes of {student.name}</h3>
                    <br />
                    <div>
                        <table className="table table-bordered" >
                            <thead>
                                <tr>
                                    <th scope="col">Subject</th>
                                    <th scope="col">Note</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notes.map((notes) => (
                                    <tr key={notes._id}>
                                        <td>{notes.subject_name}</td>
                                        <td>{notes.note}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Estructura Modal */}
            <>
                <MDBBtn onClick={toggleShow}>Add Notes</MDBBtn>
                <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                    <MDBModalDialog>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>New Subject</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                                <MDBInput className='mb-4' type='text' label='Name Subject' onChange={(e) => setSubject_name(e.target.value)}/>
                                <MDBInput className='mb-4' type='text' id='form7Example2' label='Note Subject' onChange={(e) => setNote(e.target.value)}/>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color='secondary' onClick={toggleShow}>
                                    Close
                                </MDBBtn>
                                <MDBBtn onClick={submitHandler}>Save changes</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            </>
        </>
    )
}

export default StundentsNote
