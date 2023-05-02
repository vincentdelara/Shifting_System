    import React, { useState, useEffect } from 'react';
    import Shiftservice from "../service/Shiftservice";
    import { Link, useNavigate, useParams } from 'react-router-dom';
    import DatePicker from 'react-datepicker';
    import 'react-datepicker/dist/react-datepicker.css';
    import './line.css';

    const AddShiftComponent = () => {
        const [overtime, setovertime] = useState(new Date());
        const [otime, setotime] = useState(new Date());
        const [start, setstart] = useState('');
        const [end, setend] = useState('');
        const [xpire, setxpire] = useState('');
        const [shifttype, setshifttype] = useState('');
        const [status, setstatus] = useState('unused');
        const [hours, setHours] = useState(0);
        const navigate = useNavigate();
        const { id } = useParams();

        const shiftData = { overtime, otime, start, end, xpire, shifttype, status };

        const handleDateChange = (date) => {
            setovertime(date);
        };

        const handleDateChange2 = (date) => {
            setotime(date);
        };


        const handleStartTimeChange = (e) => {
            const startTime = e.target.value + ":00";
            setstart(startTime);
        };

        const Line = () => {
            return <div className="line"></div>;
          };

        const handleEndTimeChange = (e) => {
            const endTime = e.target.value + ":00";
            setend(endTime);

            const startHour = parseInt(start.split(":")[0]);
            const startMinute = parseInt(start.split(":")[1]);
            const endHour = parseInt(endTime.split(":")[0]);
            const endMinute = parseInt(endTime.split(":")[1]);

            let totalMinutes = 0;

            if (endHour > startHour) {
                totalMinutes = (endHour - startHour) * 60 + (endMinute - startMinute);
            } else if (endHour === startHour) {
                totalMinutes = endMinute - startMinute;
            } else {
                totalMinutes = (24 - startHour + endHour) * 60 + (endMinute - startMinute);
            }

            const decimalHours = totalMinutes / 60;
            setHours(decimalHours);


            if (decimalHours < 4) {
                alert("Shift must be at least 4 hours long");
                setshifttype("");
            } else if (decimalHours >= 4 && decimalHours < 8) {
                setshifttype("4 Hours Shifting");
            } else {
                setshifttype("8 Hours Shifting");
            }
        };

        function saveData(e) {
            e.preventDefault();

            if (shiftData.overtime !== "" && shiftData.otime !== "" && shiftData.start !== "" && shiftData.end !== "" && shiftData.xpire !== "") {

                if (id) {
                    Shiftservice.updateData(id, shiftData)
                        .then(navigate("/shifts"))
                        .catch(e => console.log(e));
                } else {
                    Shiftservice.saveData(shiftData)
                        .then(navigate("/shifts"))
                        .catch(e => console.log(e));
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
                        setstart(res.data.start);
                        setend(res.data.end);
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
        }, []);

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
                                            onChange={handleDateChange}
                                            dateFormat="MMMM d, yyyy"
                                            maxDate={new Date()}
                                            className="form-control"
                                        />
                                    </div>
                                    <div>
                                        End Date
                                        <DatePicker
                                            selected={otime}
                                            onChange={handleDateChange2}
                                            dateFormat="MMMM d, yyyy"
                                            maxDate={new Date()}
                                            className="form-control"
                                        />
                                    </div>
                                    
                                    <div className='form-group'>
                                        <label>Start Time:</label>
                                        <input type='time' className='form-control'
                                            value={start}
                                            onChange={handleStartTimeChange} />
                                    </div>
                                    <div className='form-group'>
                                        <label>End Time:</label>
                                        <input type='time' className='form-control'
                                            value={end}
                                            onChange={handleEndTimeChange} />
                                    </div>
                                    <button className='btn btn-success' onClick={saveData} disabled={hours < 4} >Save</button>
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

