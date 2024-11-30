import React from 'react';
import Form from '../../components/shared/form/Form';

const Login = () => {
  return (
    <>
      <div
        className="container-fluid p-0 d-flex "
        style={{
          backgroundImage: "url('https://img.freepik.com/free-photo/nurse-holding-blood-test-tube_53876-139594.jpg?t=st=1731932613~exp=1731936213~hmac=56e192e74d935c6bc4830d0caf3c1b50dcb101b83a821158ba2a27ac0ad17b0a&w=996')",
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
          <Form FormTitle={'Login Page'} SubmitBtn={'Login'} FormType={'login'}/>

        </div>

      </div>
    </>
  );
};

export default Login;
