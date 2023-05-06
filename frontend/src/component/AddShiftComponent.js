//vincentdelara
import React, { useState, useEffect } from 'react';
import Shiftservice from "../service/Shiftservice";
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import './line.css';

const AddShiftComponent = () => {
    const [overtime, setovertime] = useState(new Date());
    const [otime, setotime] = useState(new Date());
    const [start, setstart] = useState('');
    const [end, setend] = useState('');
    const [xpire, setxpire] = useState('');
    const [shifttype, setshifttype] = useState('');
    const [status, setstatus] = useState('unused');
    const navigate = useNavigate();
    const { id } = useParams();

    const shiftData = { overtime, otime, start, end, xpire, shifttype, status };

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
            shiftData.xpire !== ""
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
                shiftData.shifttype = "8 Hour Shifting";
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
              setxpire(res.data.xpire);
              setshifttype(res.data.shifttype);
              setstatus(res.data.status);
            })
            .catch(e => console.log(e));
        } else {
          if (overtime && otime) {
            const lastDayOfYear = new Date(overtime.getFullYear(), 11, 31);
            setxpire(lastDayOfYear.toLocaleDateString('en-CA').split('/').reverse().join('-'));
          }
        }
      }, [id, overtime, otime]);

    return (
        <div>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3'>
                        <h2 className='text-center'>{tile()}</h2>
                        <Line />
                        <div className='card-body'>
                            <form>
                                <div>
                                    Start Date
                                    <DatePicker
                                        selected={overtime}
                                        onChange={setovertime}
                                        dateFormat="MMMM d, yyyy"
                                        maxDate={new Date()}
                                        className="form-control"
                                    />
                                </div>
                                <div>
                                    End Date
                                    <DatePicker
                                        selected={otime}
                                        onChange={setotime}
                                        dateFormat="MMMM d, yyyy"
                                        maxDate={new Date()}
                                        className="form-control"
                                    />
                                </div>
                                <div>
                                    Start Time
                                    <TimePicker
                                        value={start}
                                        onChange={setstart}
                                        showSecond={false}
                                        format="h:mm A"
                                        use12Hours
                                        className="form-control"
                                        placeholder={start}
                                    />
                                </div>
                                <div>
                                    End Time
                                    <TimePicker
                                        value={end}
                                        onChange={setend}
                                        showSecond={false}
                                        format="h:mm A"
                                        use12Hours
                                        className="form-control"
                                    />
                                </div>

                                <button className='btn btn-success' onClick={saveData}>Save</button>
                                <Link to='/shifts' className='btn btn-danger ml-2'>Cancel</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AddShiftComponent
