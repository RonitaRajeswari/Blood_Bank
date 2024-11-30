import React, { useState } from 'react';
import API from './../../../services/API'
import { useSelector } from 'react-redux';

const Model = ({ onClose }) => {
  const [inventoryType, setInventoryType] = useState('in');
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [donerEmail, setDonerEmail] = useState("");
  const { user } = useSelector(state => state.auth);

  const handleModelSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
        if (!bloodGroup || quantity <= 0) {
            return alert('Please provide valid blood group and quantity');
        }

        const payload = {
            donerEmail, // Donor email from input
            email: user?.email, // Email of the logged-in user
            organisations: user?._id, // User's organisation ID
            inventoryType,
            bloodGroup,
            quantity: parseInt(quantity, 10), // Ensure quantity is a number
        };

        const { data } = await API.post('/inventory/create-inventory', payload);

        if (data?.success) {
            alert(data.message);
            window.location.reload();
        } else {
            alert(data.message || 'Failed to update inventory');
        }
    } catch (error) {
        console.error('Error submitting inventory data:', error);
        alert('An error occurred. Please try again.');
    }
};


  return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 md:w-1/3 w-full rounded shadow-lg">
              <div className='flex justify-end'>
                  <i className="fa-solid fa-xmark cursor-pointer" onClick={onClose}></i>
              </div>
              <h2 className="text-lg font-bold mb-4">Manage Blood Record</h2>
              <hr />
              <form className='py-4'>
                  <div className='flex mb-4'>
                      <p className="mr-4">Blood Type:</p>
                      <label className='mr-4'>
                          <input
                              type="radio"
                              name='inventoryType'
                              value="in"
                              onChange={() => setInventoryType('in')}
                              checked={inventoryType === 'in'}
                          />
                          IN
                      </label>
                      <label>
                          <input
                              type="radio"
                              name='inventoryType'
                              value="out"
                              onChange={() => setInventoryType('out')}
                              checked={inventoryType === 'out'}
                          />
                          OUT
                      </label>
                  </div>

                  <div className='mb-4'>
                      <label className="block mb-1">Select Blood Group:</label>
                      <select
                          className="block w-full p-2 border border-gray-300 rounded"
                          onChange={(e) => setBloodGroup(e.target.value)}
                          value={bloodGroup}
                      >
                          <option value="">Open this Select Menu</option>
                          <option value={'O+'}>O+</option>
                          <option value={'O-'}>O-</option>
                          <option value={'AB+'}>AB+</option>
                          <option value={'AB-'}>AB-</option>
                          <option value={'A+'}>A+</option>
                          <option value={'A-'}>A-</option>
                          <option value={'B+'}>B+</option>
                          <option value={'B-'}>B-</option>
                      </select>
                  </div>

                  <div className='mb-4'>
                      <label className="block mb-1">Quantity:</label>
                      <input
                          type='number'
                          placeholder='Enter quantity in ml'
                          className='w-full p-2 border border-gray-300 rounded'
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                      />
                  </div>

                  <div className='mb-4'>
                      <label className="block mb-1">Donor Email:</label>
                      <input
                          type='email'
                          placeholder='Enter donor email'
                          className='w-full p-2 border border-gray-300 rounded'
                          value={donerEmail}
                          onChange={(e) => setDonerEmail(e.target.value)}
                      />
                  </div>

                  <hr />
                  <div className="flex justify-end pt-4">
                      <button
                          type="button"
                          className="mr-2 bg-gray-300 p-2 rounded hover:bg-gray-400"
                          onClick={onClose}
                      >
                          Close
                      </button>
                      <button
                          type="submit"
                          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                          onClick={handleModelSubmit}
                      >
                          Submit
                      </button>
                  </div>
              </form>
          </div>
      </div>
  );
};

export default Model;
