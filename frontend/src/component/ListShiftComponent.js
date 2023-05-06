//vincentdelara
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Shiftservice from '../service/Shiftservice';

const ListShiftComponent = () => {
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  function getAllData() {
    Shiftservice.getAllData()
      .then(res => { setDataArray(res.data); console.log(res) })
      .catch(e => console.log(e));
  }

  function deleteData(e, id) {
    e.preventDefault()
    Shiftservice.deleteData(id).then(getAllData()).catch(e => console.log(e));
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

  return (
    <div className='container'>
      <div className='wow'>
        <Link to={"/add-shift"} className='btn btn-primary mb-2 mt-3' id='addbttn' href="">
          Add Shift
        </Link>
      </div>
      <table className='table table-bordered table striped'>
        <thead className='rowcolor'>
          <tr>
            <th>Render Time</th>
            <th>From</th>
            <th>To</th>
            <th>Expiration Date</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataArray.map(data =>
            <tr className='laman' id={data.id}>
              <td>{formatTimeRange(data.overtime, data.otime)}</td>
              <td>{new Date(`2000-01-01T${data.start}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</td>
              <td>{new Date(`2000-01-01T${data.end}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</td>
              <td>{new Date(data.xpire).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</td>
              <td>{data.shifttype}</td>
              <td>{data.status}</td>
              <td>
                <div className='updel'>
                  <Link to={`/request/${data.id}`} className='btn btn-info' href="">Request</Link>
                  <Link to={`/add-shift/${data.id}`} className='btn btn-info' href="">Update</Link>
                  <a onClick={(e) => deleteData(e, data.id)} className='btn btn-danger'>Delete</a>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListShiftComponent;
