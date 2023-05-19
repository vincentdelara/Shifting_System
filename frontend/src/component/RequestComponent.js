//vincentdelara
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Shiftservice from '../service/Shiftservice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './line.css';

const RequestComponent = () => {
    const [data, setData] = useState(null);
    const [reqdate, setreqdate] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

   

    useEffect(() => {
        Shiftservice.getDataById(id)
            .then(res => {
                setData(res.data);
            })
            .catch(e => console.log(e));
    }, [id]);



    const Line = () => {
        return <div className="line"></div>;
    };


    function saveData(e) {
        e.preventDefault();

        if (reqdate !== '') {
            const updatedShiftData = {
                ...data,
                reqday: reqdate // Assuming the column name is reqday
            };

            Shiftservice.updateData(id, updatedShiftData)
                .then(() => navigate("/shifts"))
                .catch((e) => console.log(e));

        } else {
            alert("Please select a date");
        }
    }

    function formatDate(date) {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }

    return (
        <div className='container mt-5'>
            {data &&
                <div className='row'>
                    <div className='card col-md-6 offset-md-3'>
                        <nav className='navbar navbar-expand-md loob'>
                            <h2 className='text-center'>Request Leave</h2>
                        </nav>

                        <Line />
                        <div className='card-body'>
                            <table className="table table-centered">
                                <tr>
                                    <td className='bold'>Render Time:</td>
                                    <td>{data.overtime !== data.otime
                                        ? formatDate(data.overtime) + ' to ' + formatDate(data.otime)
                                        : formatDate(data.overtime)}</td>
                                </tr>
                                <tr>
                                    <td className='bold'>Start Time:</td>
                                    <td>{new Date(`2000-01-01T${data.start}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</td>
                                </tr>
                                <tr>
                                    <td className='bold'>End Time:</td>
                                    <td>{new Date(`2000-01-01T${data.end}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</td>
                                </tr>
                                <tr>
                                    <td className='bold'>Expiration Date:</td>
                                    <td>{new Date(data.xpire).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</td>
                                </tr>
                                <tr>
                                    <td className='bold'>Shift Type:</td>
                                    <td>{data.shifttype}</td>
                                </tr>
                                <tr>
                                    <td className='bold'>Project:</td>
                                    <td>{data.proj}</td>
                                </tr>
                                <tr>
                                    <td className='bold'>Remarks:</td>
                                    <td>{data.remarks}</td>
                                </tr>

                            </table><div className='dateusagecontainer'>
                                <label> Date Usage</label>
                                <div className='dateusage'>
                                    <DatePicker
                                        selected={reqdate}
                                        onChange={setreqdate}
                                        dateFormat="MMMM d, yyyy"
                                        className="form-control"
                                        placeholderText='Set Date Usage'
                                        minDate={new Date()} // Minimum selectable date is today
                                        maxDate={new Date(data.xpire)} // Maximum selectable date is the value of xpire
                                    />
                                </div>
                            </div>
                            <div className='submitcancel'>
                                <Link to='/shifts' className='btn btn-danger ml-2'>Cancel</Link>
                                <button className='btn btn-success' onClick={saveData}>Submit</button>

                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )

}

export default RequestComponent

