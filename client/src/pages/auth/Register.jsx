import React from 'react'
import Form from '../../components/shared/form/Form'

const Register = () => {
  return (
    <div>
        <div
        className="container-fluid p-0 d-flex "
        style={{
          backgroundImage: "url('https://img.freepik.com/free-photo/coronavirus-assortment-with-blood-samples-vaccine_23-2149107287.jpg?t=st=1731784543~exp=1731788143~hmac=949465e102413629c8035c14631c1f06264e1d6abc0b66cf9d58adfd611d7fcb&w=996')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100vw",
        }}
      > 
       <div
          className="card bg-black/50 py-5 w-full sm:w-1/2"
          style={{
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "absolute",
            left: "5%", // Align to the left side
            top: "50%", // Vertically center
            transform: "translateY(-50%)", // Adjust for centering
          }}
        >
            <Form FormTitle={'Register Page'} SubmitBtn={'Register'} FormType={'register'}/>
        </div>
     
      </div>
    </div>
  )
}

export default Register
