import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import NavBar from './NavBar';

import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import {    MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, 
            MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';

const StudentsList = () => {

    const [liststudents, setListstudents] = useState([]);

    const [name, setName] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [profile, setProfile] = useState('')

    const {id} = useParams()

    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);

    useEffect(() => {
        axios.get('http://localhost:8000/api/students', { withCredentials: true })
            .then((result) => {
                console.log("StudentList", result.data.result)
                setName(result.data.name)
                setBirthdate(result.data.birthdate)
                setProfile(result.data.profile)
                setListstudents(result.data.result)
            })
            .catch((error) => {
                console.log("Algo salió mal - StudentList -", error.response.data.message)
            })
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/students/${id}/student`,  {
            name,
            birthdate,
            profile
        })
            .then((result) => {
                console.log("Students Notes", result.data.result)
            })
            .catch((error) => {
                console.log("Algo salió mal - Notes", error.response.data.message)
                
            })
    }

    return (
        <div>
            <div>
                <NavBar />
            </div>

            <div className="container-md">
                <div>
                    <Link to={'/students/new'} className="btn btn-outline-primary">New Students</Link>
                </div>

                <MDBTable align='middle'>
                    <MDBTableHead>
                        <tr>
                            <th scope='col'>Student Name</th>
                            <th scope='col'>General Average</th>
                            <th scope='col'>Actions</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {liststudents.map((student) => (
                            <tr key={student._id}>
                                <td>
                                    <div className='d-flex align-items-center'>
                                        <img
                                            src={student.Profi}
                                            alt=''
                                            style={{ width: '60px', height: '60px' }}
                                            className='rounded-circle'
                                        />
                                        <div className='ms-3'>
                                            <p className='fw-bold mb-1'>{student.Student}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p className='fw-normal mb-1'>{student.Avg}</p>
                                </td>
                                <td>
                                    <div className="">
                                        <MDBBtn color='link' rounded size='sm'>
                                            <Link to={`/students/${student._id}`} className="btn btn-success">Notes by subject</Link>
                                        </MDBBtn>
                                        <MDBBtn color='link' rounded size='sm'>
                                        <MDBBtn className="btn btn-success" onClick={toggleShow}>Edit</MDBBtn>
                                            {/* <Link to={`/students/${student._id}/students`} className="btn btn-success" onClick={toggleShow}>Edit</Link> */}
                                        </MDBBtn>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </MDBTableBody>
                </MDBTable>

                <>
                <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                    <MDBModalDialog>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Edit Students</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                                <MDBInput className='mb-4' type='text' label='Name ' value={name} onChange={(e)=>setName(e.target.value)}/>
                                <MDBInput className='mb-4' type='text' label='Birthdate' value={birthdate} onChange={(e)=>setBirthdate(e.target.value)}/>
                                <MDBInput className='mb-4' type='text' id='form7Example2' label='Img' value={profile} onChange={(e)=>setProfile(e.target.value)}/>
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
            </div>
        </div>
    )
}

export default StudentsList
