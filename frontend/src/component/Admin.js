import React, { useEffect, useState } from 'react';
import Shiftservice from '../service/Shiftservice';
import UserService from '../service/Userservice';
import "../Admin.css";
import { format } from 'date-fns';
import ExcelJS from 'exceljs';

const Admin = () => {
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

      // Retrieve first name and last name for each user
      const usersWithNames = await Promise.all(
        data.map(async (user) => {
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

  function formatTimeRange(overtime, otime) {
    if (overtime === otime) {
      return formatDate(overtime);
    } else {
      return formatDate(overtime) + " to " + formatDate(otime);
    }
  }

  const handlePrintExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Pending Leave Requests');

    // Add table headers
    worksheet.addRow([
      'Name (username)',
      'Render Time',
      'From',
      'To',
      'Expiration Date',
      'Request Leave Date',
      'Shift Type',
      'Status',
      'Approver Name'
    ]);

    // Add table data
    pendingUsers.forEach((user) => {
      worksheet.addRow([
        `${user.firstName} ${user.lastName} (${user.username})`,
        formatTimeRange(user.overtime, user.otime),
        new Date(`2000-01-01T${user.start}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        }),
        new Date(`2000-01-01T${user.end}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        }),
        new Date(user.xpire).toLocaleDateString('en-US', {
          month: 'long',
          day: '2-digit',
          year: 'numeric'
        }),
        format(new Date(user.reqday), 'MMMM dd, yyyy'),
        user.shifttype,
        user.status,
        user.approvername
      ]);
    });

    // Generate the Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'pending_leave_requests.xlsx';
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className='container admin'>
        <div className='printer'>
        <button className="btn btn-primary print" onClick={handlePrintExcel}>
        Print
      </button>
      </div>
      <div className='table01'>
        <table className='table table-bordered table striped table table-hover haha'>
          <thead className='rowcolor'>
            <tr>
              <th>Name (username)</th>
              <th className='gilid'>Render Time</th>
              <th>From</th>
              <th>To</th>
              <th>Expiration Date</th>
              <th>Request Leave Date</th>
              <th>Shift Type</th>
              <th>Status</th>
              <th>Approver Name</th>
            </tr>
          </thead>
          <tbody>
  {pendingUsers.map((user) => (
    <tr className='laman' key={user.id}>
      <td>{user.firstName} {user.lastName} ({user.username})</td>
      <td className='gilid'>{formatTimeRange(user.overtime, user.otime)}</td>
      <td>{new Date(`2000-01-01T${user.start}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })}</td>
      <td>{new Date(`2000-01-01T${user.end}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })}</td>
      <td>{new Date(user.xpire).toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
      })}</td>
      <td>{format(new Date(user.reqday), 'MMMM dd, yyyy')}</td>
      <td>{user.shifttype}</td>
      <td>
        {user.status === "Unused" && (
          <span className="badge bg-success rounded-pill">Unused</span>
        )}
        {user.status === "Pending" && (
          <span className="badge bg-warning rounded-pill">Pending</span>
        )}
        {user.status === "Approved" && (
          <span className="badge custom-bg rounded-pill">Approved</span>
        )}
        {user.status === "Expired" && (
          <span className="badge bg-danger rounded-pill">Expired</span>
        )}
      </td>
      <td><td>{user.approvername}</td></td>
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

export default Admin;
