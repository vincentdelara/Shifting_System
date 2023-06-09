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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await Shiftservice.getAllData();
      const data = response.data;
      const usersWithPartnerId = data.filter((item) => item.partnerId !== null);

      // Retrieve first name and last name for each user
      const usersWithNames = await Promise.all(
        usersWithPartnerId.map(async (user) => {
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

  const handleApprove = async (userId) => {
    try {
      // Find the user with the matching userId
      const user = pendingUsers.find((user) => user.id === userId);
      if (!user) return;
  
      // Retrieve the partnerId of the selected user
      const partnerId = user.partnerId;
  
      // Find all rows with the same partnerId and update their status and approvername
      const partnerRows = pendingUsers.filter((user) => user.partnerId === partnerId);
      await Promise.all(
        partnerRows.map(async (row) => {
          const updatedData = {
            ...row,
            status: "Approved",
            approvername: localStorage.getItem("loggedInUser") // Set approvername as the username from local storage
          };
          await Shiftservice.updateData(row.id, updatedData);
        })
      );
  
      // Refresh the data to reflect the updated status
      fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleDisapprove = async (userId) => {
    try {
      // Find the user with the matching userId
      const user = pendingUsers.find((user) => user.id === userId);
      if (!user) return;
  
      // Retrieve the partnerId of the selected user
      const partnerId = user.partnerId;
  
      // Find all rows with the same partnerId and update their status and approvername
      const partnerRows = pendingUsers.filter((user) => user.partnerId === partnerId);
      await Promise.all(
        partnerRows.map(async (row) => {
          const updatedData = {
            ...row,
            status: "Disapproved",
            approvername: localStorage.getItem("loggedInUser") // Set approvername as the username from local storage
          };
          await Shiftservice.updateData(row.id, updatedData);
        })
      );
  
      // Refresh the data to reflect the updated status
      fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  return (
    <div className='container'>
      <h2 className='tit'>Requests Leave </h2>
      <div className='table01'>
        <table className='table table-bordered table striped table table-hover haha'>
          <thead className='rowcolor'>
            <tr>
              <th>Name</th>
              <th>Request Leave Date</th>
              <th>Status</th>
              <th>View</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.reduce((uniqueUsers, user) => {
              if (!uniqueUsers.find((u) => u.partnerId === user.partnerId)) {
                uniqueUsers.push(user);
              }
              return uniqueUsers;
            }, []).map((user) => (
              <tr className='laman' key={user.id}>
                <td>{user.firstName} {user.lastName} ({user.username})</td>
                <td>{format(new Date(user.reqday), 'MMMM dd, yyyy')}</td>
                <td>{user.status}</td>
                <td>
                  <button
                    className='btn btn-info'
                    onClick={() => handleModalOpenview(user.partnerId)}
                  >
                    View
                  </button>
                </td>
                <td>
                  <button
                    className='btn btn-success'
                    onClick={() => handleApprove(user.id)}
                  >
                    Approved
                  </button>

                  <button
                    className='btn btn-danger dis'
                    onClick={() => handleDisapprove(user.id)}
                  >
                    Disapproved
                  </button>
                </td>
          
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
                <h5 className="modal-title">Shift Leave Request</h5>
              </div>
              <div className="modal-body2">
                <div className="d-flex justify-content-center">
                  <div className="row">
                    <div className="modal-body2">
                      {selectedPartnerId !== null ? (
                        <div>
                          {/* Fetch and display shift info for the selected partnerId */}
                          <div className={`shift-info-container ${selectedRowsData.length === 1 ? 'center' : ''}`}>
                            {selectedRowsData.map((rowData, index) => (
                              <div className="shift-info" key={index}>
                                <p>
                                  <strong>Render Time:</strong>{' '}
                                  {rowData.overtime !== rowData.otime
                                    ? `${formatDate(rowData.overtime)} to ${formatDate(rowData.otime)}`
                                    : formatDate(rowData.overtime)}
                                </p>
                                <p>
                                  <strong>Start Time:</strong> {formatTime(rowData.start)}
                                </p>
                                <p>
                                  <strong>End Time:</strong> {formatTime(rowData.end)}
                                </p>
                                <p>
                                  <strong>Expiration Date:</strong> {formatDate(rowData.xpire)}
                                </p>
                                <p>
                                  <strong>Shift Type:</strong> {rowData.shifttype}
                                </p>
                                <p>
                                  <strong>Project:</strong> {rowData.proj}
                                </p>
                                <p>
                                  <strong>Remarks:</strong> {rowData.remarks}
                                </p>
                                <p>
                                  <strong>Request Date Usage:</strong> {formatDate(rowData.reqday)}
                                </p>
                              </div>
                            ))}
                          </div>
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
