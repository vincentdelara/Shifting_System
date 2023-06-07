import React, { useEffect, useState } from 'react';
import Shiftservice from '../service/Shiftservice';
import UserService from '../service/Userservice';
import "../ApproverComponent.css";
import { format } from 'date-fns';


const ApproverComponent = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [isModalOpenview, setIsModalOpenview] = useState(false);
  const [selectedRowsData, setSelectedRowsData] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await Shiftservice.getAllData();
      const data = response.data;
      const pendingUsers = data.filter((item) => item.status === 'Pending');

      // Retrieve first name and last name for each user
      const usersWithNames = await Promise.all(
        pendingUsers.map(async (user) => {
          const userDataResponse = await UserService.getUserByUsername(user.username);
          const userData = userDataResponse.data;
          const firstName = userData.firstname;
          const lastName = userData.lastname;

          return { ...user, firstName, lastName };
        })
      );

      setPendingUsers(usersWithNames);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleModalCloseview = () => {
    setIsModalOpenview(false);
  };

  const handleModalOpenview = (selectedRows) => {
    setIsModalOpenview(true);
    setSelectedRowsData(selectedRows);
  };

  const formatDate = (date) => {
    return format(new Date(date), 'MMMM dd, yyyy');
  };

  
  function formatTime(time) {
    const formattedTime = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    return formattedTime;
  }

  const addLeaveDate = () => {
    // Implement your logic for adding leave date here
  };

  return (
    <div className='container'>
      <h2>Pending Leave Requests</h2>
      <div className='table01'>
        <table className='table table-bordered table striped table table-hover haha'>
          <thead className='rowcolor'>
            <tr>
              <th>Name</th>
              <th>Request Leave Date</th>
              <th>View</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.map((user) => (
              <tr className='laman' key={user.id}>
                <td>{user.firstName} {user.lastName} ({user.username})</td>
                <td>{format(new Date(user.reqday), 'MMMM dd, yyyy')}</td>
                <td>
                  <button
                    className='btn btn-info'
                    onClick={() => handleModalOpenview([user])}
                  >
                    View
                  </button>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpenview && (
        <div className="modal req" style={{ display: 'block' }}>
          <div className="modal-dialog2">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Request Leave</h5>
              </div>
              <div className="modal-body2">
                <div className="d-flex justify-content-center">
                  <div className="row">
                    {selectedRowsData.map((row, index) => (
                      <div className="col" key={index}>
                        <td className="selected">
                          <p>
                            <strong>Render Time:</strong> {row.overtime !== row.otime ? `${formatDate(row.overtime)} to ${formatDate(row.otime)}` : formatDate(row.overtime)}
                          </p>
                          <p><strong>Start Time:</strong> {formatTime(row.start)}</p>
                          <p><strong>End Time:</strong> {formatTime(row.end)}</p>
                          <p><strong>Expiration Date:</strong> {formatDate(row.xpire)}</p>
                          <p><strong>Shift Type:</strong> {row.shifttype}</p>
                          <p><strong>Project:</strong> {row.proj}</p>
                          <p><strong>Remarks:</strong> {row.remarks}</p>
                          <p><strong>Request Date</strong> {format(new Date(row.reqday), 'MMMM dd, yyyy')}</p>
                        </td>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="subcel">
                <button className='btn btn-info cancel' onClick={handleModalCloseview}>
                  Cancel
                </button>
                <button className="btn btn-info submit" onClick={addLeaveDate}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApproverComponent;
