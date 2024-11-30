import React, { useState } from 'react'
import InputType from './InputType'
import { Link, useNavigate } from 'react-router-dom'
import { handleLogin, handleRegister } from '../../../services/authService'

const Form = ({ SubmitBtn, FormTitle, FormType }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("doner")
  const [name, setName] = useState("")
  const [organisationName, setOrganisationName] = useState("")
  const [hospitalName, setHospitalName] = useState("")
  const [website, setWebsite] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response;
    if (FormType === 'login') {
      response = await handleLogin(e, email, password, role)
    } else if (FormType === 'register') {
      try {
        const response = await handleRegister(
          e,
          name,
          role,
          email,
          password,
          organisationName,
          hospitalName,
          website,
          address,
          phone
        );
        console.log('Registration successful:', response);
        // Navigate to login if registration is successful
        navigate('/login');
      } catch (error) {
        console.error('Error during registration:', error);
      }
    }

    // If registration is successful, navigate to login and clear form fields

  }

  return (
    <div >
      <form onSubmit={handleSubmit}>
        <h1 className='text-center text-lg text-white'>{FormTitle}</h1>
        <hr className='my-4 ' />
        <div className="flex space-x-4 p-4">
          <div className="flex items-center">
            <input
              type="radio"
              name="role"
              id="donarRadio1"
              value={"doner"}
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
              className="w-4 h-4 "
            />
            <label htmlFor="donarRadio" className="ml-2 text-white">Doner</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="role"
              id="AdminRadio"
              value={"admin"}
              onChange={(e) => setRole(e.target.value)}
              className="w-4 h-4"
            />
            <label htmlFor="AdminRadio" className="ml-2 text-white">Admin</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="role"
              id="hospitalRadio"
              value={"hospital"}
              onChange={(e) => setRole(e.target.value)}
              className="w-4 h-4"
            />
            <label htmlFor="hospitalRadio" className="ml-2 text-white">Hospital</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="role"
              id="organisationRadio"
              value={"organisation"}
              onChange={(e) => setRole(e.target.value)}
              className="w-4 h-4"
            />
            <label htmlFor="organisationRadio" className="ml-2 text-white">Organisation</label>
          </div>
        </div>


        {/* Switch Statement */}
        {(() => {
          switch (true) {
            case FormType === 'login':
              {
                return (
                  <>
                    <InputType
                      labelText={'Email'}
                      labelFor={'forEmail'}
                      inputType={'email'}
                      name={'email'}
                      value={email}
                      onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <InputType
                      labelText={'Password'}
                      labelFor={'forPassword'}
                      inputType={'password'}
                      name={'password'}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value) }}
                    />
                  </>
                )
              }
            case FormType === 'register': {
              return (
                <>
                  {(role === 'admin' || role === 'doner') && (
                    <InputType
                      labelText={'Name'}
                      labelFor={'forName'}
                      inputType={'text'}
                      name={'name'}
                      value={name}
                      onChange={(e) => { setName(e.target.value) }}
                    />
                  )}
                  {(role === 'organisation') && (
                    <InputType
                      labelText={'organisation Name'}
                      labelFor={'fororganisationName'}
                      inputType={'text'}
                      name={'organisationName'}
                      value={organisationName}
                      onChange={(e) => { setOrganisationName(e.target.value) }}
                    />
                  )}
                  {(role === 'hospital') && (
                    <InputType
                      labelText={'HospitalName'}
                      labelFor={'forHospitalName'}
                      inputType={'text'}
                      name={'hospitalName'}
                      value={hospitalName}
                      onChange={(e) => { setHospitalName(e.target.value) }}
                    />
                  )}

                  <InputType
                    labelText={'Email'}
                    labelFor={'forEmail'}
                    inputType={'email'}
                    name={'email'}
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                  />
                  <InputType
                    labelText={'Password'}
                    labelFor={'forPassword'}
                    inputType={'password'}
                    name={'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                  />
                  <InputType
                    labelText={'Phone'}
                    labelFor={'forPhone'}
                    inputType={'text'}
                    name={'phone'}
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value) }}
                  />
                  <InputType
                    labelText={'Website'}
                    labelFor={'forWebsite'}
                    inputType={'text'}
                    name={'website'}
                    value={website}
                    onChange={(e) => { setWebsite(e.target.value) }}
                  />
                  <InputType
                    labelText={'Address'}
                    labelFor={'forAddress'}
                    inputType={'password'}
                    name={'address'}
                    value={address}
                    onChange={(e) => { setAddress(e.target.value) }}
                  />

                </>
              )
            }
          }
        })()}


        <div className='flex justify-between '>
          {FormType === 'login' ? (
            <p>Not Registered yet?
              <span className='text-blue-700'><Link to="/register"> Register Here!</Link></span>

            </p>
          ) : (
            <p>Already User? Please
              <span className='text-blue-700'><Link to="/login"> login!</Link></span>
            </p>
          )}
          <button
            type="submit"
            className=" bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 mr-0"
          >
            {SubmitBtn}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Form
