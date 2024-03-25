import React, { useState } from 'react'

import "../styles/Register.scss"

const RegisterPage = () => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileImage: null,

    })

    const handleChange = (e) => {
        const { name, value, files } = e.target
        setFormData({
            ...formData,
            [name]: value,
            [name]: name === "profileImage" ? files[0] : value
        })
    }

    console.log(formData)

    return (
        <div className='register'>
            <div className='register_content'>
                <form className='register_content_form'>
                    <input
                        placeholder='First Name'
                        name='firstName'
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                    />
                    <input
                        placeholder='Last Name'
                        name='lastName'
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        placeholder='Email'
                        name='email'
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        placeholder='Password'
                        name='password'
                        type='password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        type='password'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='file'
                        name='profileImage'
                        accept='image/*'
                        onChange={handleChange}
                        style={{ display: 'none' }}
                        required
                    />
                    <label>
                        <img src="assets/addImage.png" alt="add profile photo" />
                        <p>Upload Your Photo</p>
                    </label>
                    <button type='submit'>Register</button>
                </form>
                <a href='/login'>Already have an account? Log in Here</a>
            </div>
        </div>
    )
}

export default RegisterPage