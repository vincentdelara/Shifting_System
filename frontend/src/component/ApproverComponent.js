import React, { useEffect, useState } from 'react';
import Shiftservice from '../service/Shiftservice';
import UserService from '../service/Userservice';
import "../ApproverComponent.css";
import { format } from 'date-fns';


const ApproverComponent = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [isModalOpenview, setIsModalOpenview] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState(null);
  const [selectedRowsData, setSelectedRowsData] = useState([]);
  const [View1RowData, setView1RowData] = useState([]);

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


  const handleModalOpenview1 = (userId) => {
    setSelectedPartnerId(userId);
    setIsModalOpenview(true);
    // Set the selectedRowsData based on the userId
    if (userId !== null) {
      const rowData = pendingUsers.find((user) => user.id === userId);
      setSelectedRowsData(rowData ? [rowData] : []);
    } else {
      setSelectedRowsData([]);
    }
  };



  const handleModalOpenview = (partnerId) => {
    setSelectedPartnerId(partnerId);
    setIsModalOpenview(true);
    // Set the selectedRowsData based on the partnerId
    if (partnerId !== null) {
      const rowsData = pendingUsers.filter((user) => user.partnerId === partnerId);
      setSelectedRowsData(rowsData);
    } else {
      setSelectedRowsData([]);
    }
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
                {user.partnerId !== null ? (
                  <>
                    <td>
                      <button
                        className='btn btn-info'
                        onClick={() => handleModalOpenview(user.partnerId)}
                      >
                        View
                      </button>
                    </td>
                    <td></td>
                  </>
                ) : (
                  <>
                    <td><button
                      className='btn btn-info'
                      onClick={() => handleModalOpenview1(user.id)} // Update this line
                    >
                      View
                    </button>
                    </td>
                    <td></td>
                  </>
                )}
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
                    <div className="modal-body2">
                      {selectedPartnerId !== null ? (
                        <div>
                          <h5>Shift Info {selectedPartnerId}</h5>
                          {/* Fetch and display shift info for the selected partnerId */}
                          {selectedRowsData.map((rowData) => (
                            <div key={rowData.id}>
                              <p>
                                <strong>Render Time:</strong> {rowData.overtime !== rowData.otime ? `${formatDate(rowData.overtime)} to ${formatDate(rowData.otime)}` : formatDate(rowData.overtime)}
                              </p>
                              <p><strong>Start Time:</strong> {formatTime(rowData.start)}</p>
                              <p><strong>End Time:</strong> {formatTime(rowData.end)}</p>
                              <p><strong>Expiration Date:</strong> {formatDate(rowData.xpire)}</p>
                              <p><strong>Shift Type:</strong> {rowData.shifttype}</p>
                              <p><strong>Project:</strong> {rowData.proj}</p>
                              <p><strong>Remarks:</strong> {rowData.remarks}</p>
                              <p><strong>Request Date Usage:</strong> {formatDate(rowData.reqday)}</p>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="subcel">
                <button className="btn btn-info submit" onClick={() => {
                  setSelectedPartnerId(null);
                  handleModalCloseview();
                }}>
                  Done
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
