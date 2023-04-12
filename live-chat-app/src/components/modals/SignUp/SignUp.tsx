import React from 'react'
import './SignUp.scss'
import logo_white from '../../../../public/logo-white.png';

export default function SignUp() {


  return (
    <div>
            <div className='modal-back-drop'>
            </div>
            <div className='sign-up-frame'>
                <div>
                    <img src={logo_white} alt="logo-white" />
                </div>
                <input placeholder='ID' type="text" />
                <input placeholder='Password' type="password" />
                <div>
                   
                </div>
            </div>
        </div>
  )
}
