//vincentdelara
import React, { useState, useEffect } from 'react';
import Shiftservice from "../service/Shiftservice";
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import './line.css';

const AddShiftComponent = () => {
    const [overtime, setovertime] = useState(new Date());
    const [otime, setotime] = useState(new Date());
    const [start, setstart] = useState(null);
    const [end, setend] = useState(null);
    const [xpire, setxpire] = useState('');
    const [shifttype, setshifttype] = useState('');
    const [status, setstatus] = useState('Unused');
    const [proj, setproj] = useState('');
    const [remarks, setremarks] = useState('');
    const [username, setUsername] = useState('');    
    const navigate = useNavigate();
    const { id } = useParams();

    const shiftData = { overtime, otime, start, end, xpire, shifttype, status, proj, remarks, username };

    useEffect(() => {
        const storedUsername = localStorage.getItem('loggedInUser');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleDateChange = (date) => {
        setovertime(date);
    };

    const handleDateChange2 = (date) => {
        setotime(date);
    };

    const handleProjChange = (event) => {
        setproj(event.target.value);
    };

    const handleRemarksChange = (event) => {
        setremarks(event.target.value);
    };


    const Line = () => {
        return <div className="line"></div>;
    };

    function saveData(e) {
        e.preventDefault();

        if (
            shiftData.overtime !== "" &&
            shiftData.otime !== "" &&
            shiftData.start !== "" &&
            shiftData.end !== "" &&
            shiftData.xpire !== "" &&
            shiftData.proj !== "" &&
            shiftData.remarks !== "" 
        ) {
            const start = new Date(shiftData.start);
            const end = new Date(shiftData.end);

            // Add 24 hours to end time if it's before start time
            if (end.getTime() < start.getTime()) {
                end.setDate(end.getDate() + 1);
            }

            const shiftDuration = (end - start) / (1000 * 60 * 60);

            // Set shifttype based on shift duration
            if (shiftDuration < 4) {
                alert("Shift hours must be at least 4 hours!");
                return;
            } else if (shiftDuration < 8) {
                shiftData.shifttype = "4 Hours Shifting";
            } else {
                shiftData.shifttype = "8 Hours Shifting";
            }


           

              
            // Format start and end times
            const formattedStart = start.toLocaleTimeString("en-US", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });
            const formattedEnd = end.toLocaleTimeString("en-US", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });

            // Update shiftData with formatted start and end times
            shiftData.start = formattedStart;
            shiftData.end = formattedEnd;

            if (id) {
                Shiftservice.updateData(id, shiftData)
                    .then(navigate("/shifts"))
                    .catch((e) => console.log(e));
            } else {
                Shiftservice.saveData(shiftData)
                    .then(navigate("/shifts"))
                    .catch((e) => console.log(e));
            }
        } else {
            alert("Please, fill in all inputs");
        }
    }


    function tile() {
        if (id) {
            return "Update Shifting Record";
        } else {
            return "Add New Shifting Record";
        }
    }

    useEffect(() => {
        if (id) {
          Shiftservice.getDataById(id)
            .then(res => {
              setovertime(new Date(res.data.overtime));
              setotime(new Date(res.data.otime));
              setstart(moment(`2000-01-01T${res.data.start}`)); // Convert to moment object
              setend(moment(`2000-01-01T${res.data.end}`)); // Convert to moment object
              setxpire(res.data.xpire);
              setshifttype(res.data.shifttype);
              setstatus(res.data.status);
              setproj(res.data.proj);
              setremarks(res.data.remarks);
            })
            .catch(e => console.log(e));
        } else {
          if (overtime && otime) {
            const lastDayOfYear = new Date(overtime.getFullYear(), 11, 31);
            setxpire(lastDayOfYear.toLocaleDateString('en-CA').split('/').reverse().join('-'));
          }
        }
      }, [id]);

    return (
        <div>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3'>
                        <nav className='navbar navbar-expand-md loob'>
                            <h2 className='text-center'>{tile()}</h2>
                        </nav>
                        <div className='card-body'>

                            <form>
                                <table className="table table-centered table-spacing">
                                    <tr>
                                        
                                        <td className='td1'>
                                            
                                            <div className="form-control outline" >
                                    <label>Start Date</label>
                                    <DatePicker
                                        selected={overtime}
                                        onChange={handleDateChange}
                                        dateFormat="MMMM d, yyyy"
                                        className="form-control rd"
                                        maxDate={new Date(new Date().setDate(new Date().getDate() - 1))}
                                    />
                                    <label>End Date</label>
                                    <DatePicker
                                        selected={otime}
                                        onChange={handleDateChange2}
                                        dateFormat="MMMM d, yyyy"
                                        className="form-control rd"
                                        maxDate={new Date(new Date().setDate(new Date().getDate() - 1))}/>
                                </div></td>
                                
                                <td className='td2'>
                                <div className="form-control outline">
                                <label>Start Time</label>
                                    <TimePicker
                                        value={start}
                                        onChange={setstart}
                                        showSecond={false}
                                        format="h:mm A"
                                        use12Hours
                                        className="form-control"/>
                                    <label>End Time</label>
                                    <TimePicker
                                        value={end}
                                        onChange={setend}
                                        showSecond={false}
                                        format="h:mm A"
                                        use12Hours
                                        className="form-control" />
                                </div>
                                </td>
                                </tr>
                                </table>
                                <div className="form-control outline">
                                    <label >Project</label>
                                    <input
                                        type="text"
                                        id="projectInput"
                                        className="form-control"
                                        value={proj}
                                        onChange={handleProjChange}
                                    />
                                    <label>Remarks</label>
                                    <input
                                        type="text"
                                        id="remarksInput"
                                        className="form-control"
                                        value={remarks}
                                        onChange={handleRemarksChange}
                                    />
                                </div>
                                <div className='submitcancel'>
                                
                                <Link to='/shifts' className='btn btn-danger ml-2'>Cancel</Link>
                                <button className='btn btn-success' onClick={saveData}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AddShiftComponent
