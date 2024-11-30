import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  return (
    <>
      <div><Header /></div>
      <div className="flex h-screen gap-0">
        {/* Sidebar */}
        <div className="w-1/6 p-4 bg-gray-100 overflow-y-auto sidebar" >
        <Sidebar/>
        </div>

        {/* Main Content (Home) */}
        <div className="w-5/6 p-4 overflow-y-auto"
         style={{
          backgroundImage: 'url(https://img.freepik.com/free-photo/blood-test-tubes-beige-surface_53876-94995.jpg?t=st=1732857711~exp=1732861311~hmac=b7c619e8370544a5eafa1fca14a57e38781b6be9136da2b22b30048d8adbc871&w=996)', // Replace with your image path
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
        }}>
          {/* Add main content here */}
          {children}
        </div>
      </div>

    </>
  )
}

export default Layout
