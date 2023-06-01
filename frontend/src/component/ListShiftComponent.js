//vincent de lara
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Shiftservice from '../service/Shiftservice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../ListShiftComponent.css";
import "../AddshiftModal.css";
import "../modal2request.css";
import { Form } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import AddShiftComponent from './AddShiftComponent';
import { FaExclamationTriangle } from 'react-icons/fa';




const ListShiftComponent = () => {
  const [dataArray, setDataArray] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterShiftType, setFilterShiftType] = useState('All');
  const [filterMonth, setFilterMonth] = useState('All');
  const [filterDay, setFilterDay] = useState('All');
  const [filterYear, setFilterYear] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [leaveDate, setLeaveDate] = useState('');
  const [partnerId, setPartnerId] = useState('');
  const [data, setData] = useState([]);
  const [dateError, setDateError] = useState('');
  const [selectedRowsData, setSelectedRowsData] = useState([]);
  const [deleteItemId, setDeleteItemId] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  

  const loggedInUser = localStorage.getItem('loggedInUser');

  useEffect(() => {
    getAllData();
  }, [searchQuery, filterStatus, filterShiftType, filterMonth, filterDay, filterYear]);


  function getAllData() {
    Shiftservice.getAllData()
      .then(res => {
        const filteredData = res.data.filter(data =>
          data.username === loggedInUser &&
          (searchQuery === '' ||
            formatDate(data.overtime, { month: 'long', day: 'numeric', year: 'numeric' }).toLowerCase().includes(searchQuery.toLowerCase()) ||
            formatDate(data.otime, { month: 'long', day: 'numeric', year: 'numeric' }).toLowerCase().includes(searchQuery.toLowerCase()) ||
            formatTime(data.start).toLowerCase().includes(searchQuery.toLowerCase()) ||
            formatTime(data.end).toLowerCase().includes(searchQuery.toLowerCase()) ||
            formatDate(data.xpire, { month: 'long', day: 'numeric', year: 'numeric' }).toLowerCase().includes(searchQuery.toLowerCase()) ||
            data.shifttype.toLowerCase().includes(searchQuery.toLowerCase()) ||
            data.status.toLowerCase().includes(searchQuery.toLowerCase())) &&
          (filterStatus === 'All' || data.status === filterStatus) &&
          (filterShiftType === 'All' || data.shifttype === filterShiftType) &&
          (filterMonth === 'All' || new Date(data.overtime).getMonth() + 1 === parseInt(filterMonth)) &&
          (filterDay === 'All' || new Date(data.overtime).getDate() === parseInt(filterDay)) &&
          (filterYear === 'All' || new Date(data.overtime).getFullYear() === parseInt(filterYear))
        );
        setDataArray(filteredData);
        setSelectedCheckboxes(new Array(res.data.length).fill(false));
        setData(res.data); // Set the retrieved data to the data state
      })
      .catch(e => console.log(e));
  }


  //format time search
  function formatTime(time) {
    const formattedTime = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    return formattedTime;
  }




  //clear filter button
  function clearFilters() {
    setFilterStatus('All');
    setFilterShiftType('All');
    setFilterMonth('All');
    setFilterDay('All');
    setFilterYear('All');
  }


  //search format date
  function formatDate(date, format) {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleString('en-US', format);
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

  function handleCheckboxChange(index) {
    const updatedSelectedCheckboxes = [...selectedCheckboxes];
    updatedSelectedCheckboxes[index] = !updatedSelectedCheckboxes[index];

    const selectedCount = updatedSelectedCheckboxes.filter((checkbox) => checkbox).length;

    if (selectedCount > 2) {
      return; // Ignore checkbox change if the maximum limit is reached
    }

    setSelectedCheckboxes(updatedSelectedCheckboxes);
  }

  function deleteData(e, id) {
    e.preventDefault();
    setDeleteItemId(id); // Set the ID of the item to be deleted
    setIsDeleteModalOpen(true); // Open the delete modal
  }

  function confirmDelete() {
    Shiftservice.deleteData(deleteItemId)
      .then(() => {
        getAllData();
        setIsDeleteModalOpen(false); // Close the delete modal after deleting the item
      })
      .catch(e => console.log(e));
  }




  // partner two 4 shift hours to request leave
  function addLeaveDate() {
    if (!leaveDate) {
      setDateError("Please select a date"); // error when no date selected
    } else if (selectedRowsData.length === 2) {
      const partnerId = selectedRowsData.map(row => row.id).join(''); // partner 2 id of 2 rows
      setPartnerId(partnerId);

      const updatedRows = selectedRowsData.map(row => {
        const updatedRow = {
          ...row,
          reqday: leaveDate, //  save date usge
          partnerId: partnerId, // set partner id using combination of 2 rows id
          status: "Pending" // Set status to "Pending"
        };
        Shiftservice.updateData(row.id, updatedRow)
          .then(() => getAllData()) // save date usage
          .then(() => handleModalClose2()) // Close the modal after saving the data
          .catch(e => console.log(e));
        return updatedRow;
      });
      setDataArray(prevDataArray => [...prevDataArray, ...updatedRows]);
    } else {
      alert('Please select exactly two rows.');
    }
  }


  const handleModalClose3 = () => {
    setIsModalOpen3(false);
  };
  
  const handleModalOpen3 = () => {
    setIsModalOpen3(true);
  };



  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalClose2 = () => {
    setIsModalOpen2(false);
  };

  const handleModalOpen2 = () => {
    setIsModalOpen2(true);
    const selectedRows = selectedCheckboxes.reduce((selected, isSelected, index) => {
      if (isSelected) {
        selected.push(data[index]);
      }
      return selected;
    }, []);
    setSelectedRowsData(selectedRows);
  };


  return (
    <div className='container'>

      <div className='wow'>
        <div className='search-container'>
          <input className='search-hover'
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
          />
          <img src="./assets/search.svg" alt="Search" className='search-icon' />
        </div>
        <button className='btn btn-primary mb-2 mt-3 fill' onClick={handleModalOpen}>
          <label className="filtext">Filters</label>
          <img src="./assets/filter.png" alt="Filter" className='filter-icon' />
        </button>
        
        
        <button className="btn btn-primary mb-2 mt-3 add" onClick={handleModalOpen3}>
      <label className="button-text addshift">Add Shift</label>
    </button>

      </div>
      <div className='table01'>
        <table className='table table-bordered table striped table table-hover' >
          <thead className='rowcolor'>
            <tr>
              <th className='tsek'></th>
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
                <td>
                  {data.shifttype !== '8 Hours Shifting' && data.reqday == null && (
                    <Form.Check
                      type="checkbox"
                      checked={selectedCheckboxes[index]}
                      onChange={() => handleCheckboxChange(index)}
                      className="text-success"
                    />
                  )}
                </td>
                <td className='gilid'>{formatTimeRange(data.overtime, data.otime)}</td>
                <td>{new Date(`2000-01-01T${data.start}`).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
                })}</td>
                <td>{new Date(`2000-01-01T${data.end}`).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
                })}</td>
                <td>{new Date(data.xpire).toLocaleDateString('en-US', {
                  month: 'long',
                  day: '2-digit',
                  year: 'numeric'
                })}</td>
                <td>{data.shifttype}</td>
                <td>
                  {data.status === "Unused" && (
                    <span className="badge bg-success rounded-pill">Unused</span>
                  )}
                  {data.status === "Pending" && (
                    <span className="badge bg-warning rounded-pill">Pending</span>
                  )}
                  {data.status === "Approved" && (
                    <span className="badge custom-bg rounded-pill">Approved</span>
                  )}
                  {data.status === "Expired" && (
                    <span className="badge bg-danger rounded-pill">Expired</span>
                  )}

                </td>
                <td>

                  <div className='updel'>
                    {data.shifttype === '8 Hours Shifting' && ( //show button if 8 hours shift
                      <Tooltip
                        title={
                          data.status === 'Unused'
                            ? "Request Leave"
                            : data.status === 'Pending'
                              ? "You've already Requested, waiting for Approval"
                              : data.status === 'Approved'
                                ? "Shift already used"
                                : data.status === 'Expired'
                                  ? "Expired"
                                  : ""
                        }
                        followCursor
                      >
                        <Box>
                          <Link
                            to={`/request/${data.id}`}
                            className={`btn btn-info req ${data.reqday ? 'disabled' : ''}`}
                            href=''
                            disabled={data.reqday ? true : false}
                          >
                            Request
                          </Link>
                        </Box>
                      </Tooltip>
                    )}



                    {data.shifttype === '4 Hours Shifting' && ( //show button if 4 hours shift
                      <Tooltip
                        title={
                          data.status === 'Unused'
                            ? "Select 4-hour Shift for Partner 2 by checking the box on the left"
                            : data.status === 'Pending'
                              ? "You've already Requested, waiting for Approval"
                              : data.status === 'Approved'
                                ? "Shift already used"
                                : data.status === 'Expired'
                                  ? "Expired"
                                  : ""
                        }
                        followCursor
                      >
                        <Box>
                          <button
                            className="btn btn-info req"
                            onClick={handleModalOpen2}
                            disabled={
                              !selectedCheckboxes[index] ||
                              data.shifttype !== '4 Hours Shifting' ||
                              selectedCheckboxes.filter((checkbox) => checkbox).length !== 2
                            }
                          >
                            Request
                          </button>
                        </Box>
                      </Tooltip>
                    )}


                    <Tooltip
                      title={
                        data.status === 'Unused'
                          ? "Update Shift"
                          : data.status === 'Pending'
                            ? "Update unavailable: Pending approval"
                            : data.status === 'Approved'
                              ? "Shift already used"
                              : data.status === 'Expired'
                                ? "Expired"
                                : ""
                      }
                      followCursor
                    >
                      <Box>
                        <Link
                          to={`/add-shift/${data.id}`}
                          className={`btn btn-info edit ${data.reqday !== null ? 'disabled' : ''}`} // Add the disabled class if reqday is not empty
                          href=""
                        >
                          Update
                        </Link>
                      </Box>
                    </Tooltip>


                    <Tooltip
                      title={
                        data.status === 'Unused'
                          ? "Delete Shift"
                          : data.status === 'Pending'
                            ? "Delete unavailable: Pending approval"
                            : data.status === 'Approved'
                              ? "Shift already used"
                              : data.status === 'Expired'
                                ? "Expired"
                                : ""
                      }
                      followCursor
                    >
                      <Box>
                        <a
                          onClick={(e) => deleteData(e, data.id)}
                          className={`btn btn-danger list ${data.reqday !== null ? 'disabled' : ''}`} // Add the disabled class if reqday is not empty
                        >
                          <img src="./assets/deleteicn.svg" alt="Delete" className='icon' />
                        </a>

                      </Box>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <div className="modal" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Filters</h5>
                </div>
                <div className="modal-body">
                  <form className="filter-form">
                    <div className="form-group">
                      <label htmlFor="filterMonth">Month</label>
                      <select id="filterMonth" className="form-control rc" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
                        <option value="All">All Months</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="filterDay">Day</label>
                      <select id="filterDay" className="form-control rc" value={filterDay} onChange={(e) => setFilterDay(e.target.value)}>
                        <option value="All">All Days</option>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="filterYear">Year</label>
                      <select id="filterYear" className="form-control rc" value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
                        <option value="All">All Years</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="filterShiftType">Shift Type</label>
                      <select id="filterShiftType" className="form-control rc" value={filterShiftType} onChange={(e) => setFilterShiftType(e.target.value)}>
                        <option value="All">All Types</option>
                        <option value="4 Hours Shifting">4 Hours Shifting</option>
                        <option value="8 Hours Shifting">8 Hours Shifting</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="filterStatus">Status</label>
                      <select id="filterStatus" className="form-control rc" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Unused">Unused</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Expired">Expired</option>
                      </select>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-info cancel" onClick={clearFilters}>Clear Filters</button>
                  <button type="button" className="btn btn-info submit" onClick={handleModalClose}>Done</button>
                </div>
              </div>
            </div>
          </div>
        )}


        {isModalOpen2 && (
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
                          </td>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 d-flex align-items-center">
                    <label className="rd ttl">Date Usage</label>
                    <div style={{ flex: '1' }}>
                      <DatePicker
                        selected={leaveDate}
                        onChange={(date) => setLeaveDate(date)}
                        dateFormat="MMMM d, yyyy"
                        className={`form-control rc ${dateError ? 'is-invalid' : ''}`}
                        placeholderText={dateError ? dateError : 'Set Date Usage'}
                        id="leaveDate"
                        minDate={new Date()}
                        maxDate={new Date(selectedRowsData[0].xpire)} // Assuming both selected rows have the same xpire value
                      />
                    </div>
                  </div>
                </div>

                <div className="subcel">
                  <button className='btn btn-info cancel' onClick={handleModalClose2}>
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



{isDeleteModalOpen && (
  <div className="modal" style={{ display: 'block' }}>
    <div className="modal-dialog delete">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title confirmwarning ">
            <FaExclamationTriangle style={{ marginRight: '0.5rem' }} className='confirmwarning'/>
            Confirmation
          </h5>
        </div>
        <div className="modal-body">
          <p className='warning'>
            <strong >Warning: </strong> Are you absolutely certain you wish to delete this item?
          </p>
          
        </div>
        <div className="candel">
          <button className="btn btn-secondary canmodal" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </button>
          <button className="btn btn-danger delmodal" onClick={confirmDelete}>
            <strong>Delete</strong>
          </button>
        </div>
      </div>
    </div>
  </div>
)}

{isModalOpen3 && (
      <div className="modal" style={{ display: 'block' }}>
       
            <div className="modal-body add">
            <AddShiftComponent handleModalClose3={handleModalClose3} />
            </div>
       
      </div>
    )}
      </div>
    </div>
  );
};

export default ListShiftComponent;



/**Line: 228     <Link to={"/add-shift"} className='btn btn-primary mb-2 mt-3 add' id='addbttn'>
          <label className="button-text">Add Shift</label>
        </Link> */