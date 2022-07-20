import React from 'react'
import {Route,Routes,Redirect,useParams,Navigate,useNavigate } from 'react-router-dom'

export default function AboutMe() {
const navigate = useNavigate();
  return (
            <div className='about-me'>
                <div className='about-me-text'>
                     <h2>Hi I am aditya, this is my submission for the front-end task for Volopay.
                     The backend is deployed at <a href="https://volo-server-nkxye02vr-sevenpmdread.vercel.app/" id="linktovercel" style={{color:'white'}}>Vercel</a>
                     ,    <a href="https://github.com/sevenpmdread/VoloServer" id="linktovercel" style={{color:'white'}}>Github</a>
                     </h2>
                     <p style={{marginTop:24,fontSize:24,marginBottom:24}}>
                     The deployement is pretty straightforward, I have added a dropdown for your tab section, so you can switch between different users and see what cards are asssocated with each
                     user, and I used philosphers names as random user names cause I love philosophy.
                     Hope you like this implementation.

                     </p>
                     <button className='createcard-button' onClick={()=>navigate(`/home/all`)}>
                      Proced to implementation
                     </button>
                </div>
            </div>
  )
}
