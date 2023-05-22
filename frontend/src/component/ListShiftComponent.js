import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Shiftservice from '../service/Shiftservice';


const ListShiftComponent = () => {
  const [dataArray, setDataArray] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterShiftType, setFilterShiftType] = useState('All');
  const [filterMonth, setFilterMonth] = useState('All');
  const [filterDay, setFilterDay] = useState('All');
  const [filterYear, setFilterYear] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            data.start.toLowerCase().includes(searchQuery.toLowerCase()) ||
            data.end.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      })
      .catch(e => console.log(e));
  }

  function deleteData(e, id) {
    e.preventDefault();
    Shiftservice.deleteData(id)
      .then(() => getAllData())
      .catch(e => console.log(e));
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

  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = [...selectedCheckboxes];
    updatedCheckboxes[index] = !updatedCheckboxes[index];
    setSelectedCheckboxes(updatedCheckboxes);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
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


        <Link to={"/add-shift"} className='btn btn-primary mb-2 mt-3 add' id='addbttn'>
          <label className="button-text">Add Shift</label>
        </Link>
      </div>
      <table className='table table-bordered table striped'>
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
                <input
                  type="checkbox"
                  checked={selectedCheckboxes[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
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

      {isModalOpen && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Filters</h5>
                <button type="button" className="close" onClick={handleModalClose}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="filter-form">
                  <div className="form-group">
                    <label htmlFor="filterMonth">Month</label>
                    <select id="filterMonth" className="form-control" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
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
                    <select id="filterDay" className="form-control" value={filterDay} onChange={(e) => setFilterDay(e.target.value)}>
                      <option value="All">All Days</option>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="filterYear">Year</label>
                    <select id="filterYear" className="form-control" value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
                      <option value="All">All Years</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="filterShiftType">Shift Type</label>
                    <select id="filterShiftType" className="form-control" value={filterShiftType} onChange={(e) => setFilterShiftType(e.target.value)}>
                      <option value="All">All Types</option>
                      <option value="4 Hours Shifting">4 Hours Shifting</option>
                      <option value="8 Hours Shifting">8 Hours Shifting</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="filterStatus">Status</label>
                    <select id="filterStatus" className="form-control" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
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
                <button type="button" className="btn btn-secondary" onClick={clearFilters}>Clear Filters</button>
                <button type="button" className="btn btn-primary" onClick={handleModalClose}>Done</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ListShiftComponent;
