import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../components/shared/layout/Layout';
import Spinner from '../components/shared/Spinner';
import Model from '../components/shared/model/Model';
import API from '../services/API';

const Home = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);

  // Fetch function
  const getBloodRecords = async () => {
    try {
      const response = await API.get('/inventory/get-inventory');
      if (response?.data?.success) {
        setData(response.data.data); // Correctly accessing the inventory data
        // console.log("Fetched Data:", response.data.data);
      } else {
        console.warn("API response does not indicate success.");
        setData([]); // Fallback to empty data
      }
    } catch (error) {
      console.error("Error fetching inventory records:", error);
      setData([]); // Handle errors gracefully
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  const handleAddInventoryClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <Layout>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h4
            className="text-lg text-red-400"
            style={{ cursor: 'pointer', fontSize: '30px' }}
            onClick={handleAddInventoryClick}
          >
            <i className="fa-solid fa-plus text-success text-green-900"></i>
            Add Inventory
          </h4>

          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-600 text-left">
                  <th className="py-2 px-4 border-b">Blood Group</th>
                  <th className="py-2 px-4 border-b">Inventory Type</th>
                  <th className="py-2 px-4 border-b">Quantity</th>
                  <th className="py-2 px-4 border-b">DonerEmail</th>
                  <th className="py-2 px-4 border-b">Time & Date</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((record) => (
                  <tr className="hover:bg-gray-100" key={record._id}>
                    <td className="py-2 px-4 border-b">{record.bloodGroup}</td>
                    <td className="py-2 px-4 border-b">{record.inventoryType}</td>
                    <td className="py-2 px-4 border-b">{record.quantity}(ML)</td>
                    <td className="py-2 px-4 border-b">{record.email}</td>
                    <td className="py-2 px-4 border-b">
                      {new Date(record.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isModalOpen && <Model onClose={closeModal} />}
        </>
      )}
    </Layout>
  );
};

export default Home;
