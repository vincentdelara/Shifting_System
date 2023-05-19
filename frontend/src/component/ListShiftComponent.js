import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Shiftservice from '../service/Shiftservice';

const ListShiftComponent = () => {
  const [dataArray, setDataArray] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const loggedInUser = localStorage.getItem('loggedInUser');

  useEffect(() => {
    getAllData();
  }, []);

  function getAllData() {
    Shiftservice.getAllData()
      .then(res => {
        // Filter the data array based on the logged-in user
        const filteredData = res.data.filter(data => data.username === loggedInUser);
        setDataArray(filteredData);
        setSelectedCheckboxes(new Array(filteredData.length).fill(false));
      })
      .catch(e => console.log(e));
  }

  function deleteData(e, id) {
    e.preventDefault();
    Shiftservice.deleteData(id)
      .then(() => getAllData())
      .catch(e => console.log(e));
  }

  function formatTimeRange(overtime, otime) {
    if (overtime === otime) {
      return formatDate(overtime);
    } else {
      return formatDate(overtime) + " to " + formatDate(otime);
    }
  }

  function formatDate(date) {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = [...selectedCheckboxes];
    updatedCheckboxes[index] = !updatedCheckboxes[index];
    setSelectedCheckboxes(updatedCheckboxes);
  };

  return (
    <div className='container'>
      <div className='wow'>
        <Link to={"/add-shift"} className='btn btn-primary mb-2 mt-3' id='addbttn' href="">
          Add Shift
        </Link>
      </div>
      <table className='table table-bordered table striped'>
        <thead className='rowcolor'>
          <tr><th className='tsek'></th>
            <th className='gilid'>Render Time</th>
            <th>From</th>
            <th>To</th>
            <th>Expiration Date</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataArray.map((data, index) => (
            <tr className='laman' key={data.id}>
              <td><input
                    type="checkbox"
                    checked={selectedCheckboxes[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  </td>
              <td className='gilid'>{formatTimeRange(data.overtime, data.otime)}</td>
              <td>{new Date(`2000-01-01T${data.start}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</td>
              <td>{new Date(`2000-01-01T${data.end}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</td>
              <td>{new Date(data.xpire).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</td>
              <td>{data.shifttype}</td>
              <td>{data.status}</td>
              <td>
                <div className='updel'>
                  <Link to={`/request/${data.id}`} className='btn btn-info req' href="">Request</Link>
                  <Link to={`/add-shift/${data.id}`} className='btn btn-info edit' href="">Update</Link>
                  <a onClick={(e) => deleteData(e, data.id)} className='btn btn-danger list'>
                    <img src="./assets/deleteicn.svg" alt="Delete" className='icon' />
                  </a>                  
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListShiftComponent;

