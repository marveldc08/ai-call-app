"use client"
import React,{useEffect, useState} from 'react'
import Link from 'next/link'
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Header from '../../components/Header'
import { PieChart } from '@mui/x-charts/PieChart';
import { useLocalStorageObject } from '../../hooks/useLocalStorage';
import Image from "next/image";



const uData = [3000, 3460, 3200, 2780, 1490, 2390, 3490];
const pData = [2400, 1398, 4800, 3908, 4800, 3800, 4300];
const amtData = [2100, 2210, 2340, 2400, 2481, 2500, 2300];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];



export default function DashboardPage() {
    const [user, setUser] = useLocalStorageObject("user", null);
    const [token, setToken] = useLocalStorageObject("token", null);
    const [collapsed, setCollapsed] = useLocalStorageObject("collapsed", null);
    const [userName, setUserName] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showCallModal, setShowCallModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [isCollapsed, setIsCollapsed] = useState(false);
   
    // useEffect(() => {
    //   if (user) {
    //     setUserName(`${user.firstName} ${user.lastName}`);
    //   } else {
    //     console.log("No user data found.");
    //   }
    // }, [user]);

      useEffect(() => {
        const stored = localStorage.getItem("collapsed");
        if (stored === "true") {
            setIsCollapsed(true);
        } else {
            setIsCollapsed(false);
        }
        
      }, []);


     const [schedules, setSchedules] = useState<{ interval: string }[]>([
        { interval: "" },
      ]);

      const addSchedule = (e: React.FormEvent) => {
        e.preventDefault();
        setSchedules([...schedules, { interval: "" }]);
      };

      const updateSchedule = (index: number, value: string) => {
        const newSchedules = [...schedules];
        newSchedules[index].interval = value;
        setSchedules(newSchedules);
      };

      const removeSchedule = (index: number) => {
        setSchedules(schedules.filter((_, i) => i !== index));
      };

    const handleUploadFile = (file: File | null) => {
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      // Simulate an API call
      setTimeout(() => {
        console.log("File uploaded:", file.name);
        setLoading(false);
      }, 2000);
    }

  return (
    <div className={` page-container `}>
      <Header pageName="Dashboard" moduleName="Dashboard" userName={userName} />
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <div className="container-fluid">
              <div className="row">&nbsp;</div>

              {/* Row of Cards */}
              <div className="row no-gutters">
                {[
                  {
                    title: "Total Uploaded",
                    value: 10000,
                    border: "primary",
                    icon: "upload",
                    text: "text-primary",
                  },
                  {
                    title: "Total Valid Contacts",
                    value: 70,
                    border: "success",
                    icon: "user-circle",
                    text: "text-success",
                  },
                  {
                    title: "Contacts Reached",
                    value: 900,
                    border: "info",
                    icon: "headphones",
                    text: "text-info",
                    isProgress: false,
                  },
                  {
                    title: "Number of Confirmed",
                    value: 50,
                    border: "warning",
                    icon: "check",
                    text: "text-warning",
                  },
                  {
                    title: "Average Minute Per Call",
                    value: "1.02 Mins",
                    border: "warning",
                    icon: "clock-o",
                    text: "text-warning",
                  },
                   {
                    title: "Total Valid Contacts",
                    value: "20% valid",
                    border: "info",
                    icon: "phone",
                    text: "text-info",
                  },
                  {
                    title: "Contacts Reached",
                    value: "90%",
                    border: "success",
                    icon: "headphones",
                    text: "text-success",
                    isProgress: false,
                  },
                  {
                    title: "Number of Confirmed",
                    value: "50%",
                    border: "primary",
                    icon: "check",
                    text: "text-primary",
                  },
                  {
                    title: "Total Calls",
                    value: 600,
                    border: "success",
                    icon: "phone",
                    text: "text-success",
                  },
                  {
                    title: "Total Call Time",
                    value: "6,000",
                    border: "primary",
                    icon: "clock-o",
                    text: "text-primary",
                  },
                  {
                    title: "Average Call Time per person",
                    value: "30 Minutes",
                    border: "info",
                    icon: "clock-o",
                    text: "text-info",
                  },
                  {
                    title: "Total Cost",
                    value: "$18,000",
                    border: "warning",
                    icon: "dollar",
                    text: "text-warning",
                  },
                  {
                    title: "Total Voice Calls",
                    value: "180",
                    border: "warning",
                    icon: "phone",
                    text: "text-warning",
                  },

                  {
                    title: "Total Confirmed Calls",
                    value: "1,000",
                    border: "primary",
                    icon: "upload",
                    text: "text-primary",
                  },
                  {
                    title: " Average Voice Calls Confirmed",
                    value: "1,000",
                    border: "success",
                    icon: "check",
                    text: "text-success",
                  },
                  {
                    title: "Total Cost",
                    value: "$1,000",
                    border: "info",
                    icon: "dollar",
                    text: "text-info",
                  },
                 

                ].map((card, index) => (
                  <div key={index} className="col-xl-3 col-md-6 mb-2">
                    <div
                      className={`card border-left-${card.border} shadow h-100 mx-1`}
                    >
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div
                              className={`text-xs font-weight-bold ${card.text} text-uppercase mb-1`}
                            >
                              {card.title}
                            </div>
                            {!card.isProgress ? (
                              <div className="h6 mb-0 text-[7px] font-weight-bold text-gray-800">
                                {card.value}
                              </div>
                            ) : (
                              <div className="row no-gutters align-items-center">
                                <div className="col-auto">
                                  <div className="h5 mb-0  font-weight-bold text-gray-800">
                                    {card.value}
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="progress progress-sm mx-4 ">
                                    <div
                                      className="progress-bar bg-info"
                                      role="progressbar"
                                      style={{ width: "50%",borderRadius: "5px" }}
                                      aria-valuenow={50}
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="col-auto">
                            <i
                              className={`fa fa-${card.icon} fa-2x text-gray-300`}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className='row mt-4'>
                <div className='col-12'>
                    <div className="form-row">
                        <div className="col-md-3 mb-3">&nbsp;</div>
                        <div className="col-md-3 mb-3">&nbsp;</div>
                        <div className="col-md-3 mb-3">
                            <button className="btn btn-primary btn-block" style={{height: "4rem"}} type="submit" onClick={()=>setShowModal(true)}>
                                <i className="fa fa-upload"></i> Upload Contacts
                            </button>
                            
                        </div>
                        <div className="col-md-3 mb-3">
                            <button className="btn btn-success btn-block" style={{height: "4rem"}} type="submit" onClick={()=>setShowCallModal(true)}>
                                <i className="fa fa-clock-o"></i> Schedule Calls
                            </button>
                            
                        </div>
                        
                    </div>
                </div>
              </div>

              

              <div className="row">
                {/* Timeline area */}
                <div className="col-xl-12 col-ml-12 col-lg-12 mt-5">
                  <div className="card border-left-primary">
                    <div className="card-body">
                      <h4 className="header-title">Call Records</h4>
                      <form className="needs-validation" noValidate>
                        <div className="form-row">                          
                          <div className="col-md-3 mb-3">
                            <button className="btn btn-outline-primary btn-block"type="submit">
                              <i className="fa fa-check"></i> Contact Reached
                            </button>
                          </div>
                          <div className="col-md-3 mb-3">
                            <button
                              className="btn btn-outline-danger btn-block"
                              type="reset"
                            >
                              <i className="fa fa-times"></i> Contact Not Reached
                            </button>
                          </div>
                          <div className="col-md-3 mb-3">&nbsp;</div>
                         <div className="col-md-3 mb-3">&nbsp;</div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-3 mb-3">&nbsp;</div>
                           <div className="col-md-3 mb-3">&nbsp;</div>
                           <div className="col-md-3 mb-3">&nbsp;</div>
                          <div className="col-md-3 mb-3">
                            <label><i className="fa fa-filter"></i>Filter</label>
                            <select className="form-control">
                              <option>Filter</option>
                              <option>Past 7 days</option>
                              <option>Past 4 weeks</option>
                              <option>Past 5 months</option>
                            </select>
                          </div>
                        </div>
                      </form>
                      <br />
                      <hr />
                      <div className="table-responsive">
                        <table
                          className="table"
                          id="dataTable"
                          width="100%"
                          cellSpacing="0"
                        >
                          <thead>
                            <tr>
                              <th>Contact Name</th>
                              <th>Phone Number</th>
                              <th>Aveg. Call Time</th>
                              <th>Request</th>
                              <th>Number Of Times Called</th>
                            
                            </tr>
                          </thead>
                          <tbody>
                            {Array.from({ length: 6 }).map((_, index) => (
                              <tr key={index}>
                                <td>Felix Troy</td>
                                <td>0901234567</td>
                                <td>3.2 miniutes</td>
                                <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ea quam optio pariatur culpa temporibus, officia ratione placeat iusto hic quo ducimus repellendus repudiandae</td>
                                <td>5</td>                            
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

              
                {/* <div className="col-xl-3 col-ml-4 col-lg-4 mt-5">
                  <div className="card border-left-primary">
                    <div className="card-body">
                      <h4 className="header-title">
                       Agents{" "}
                        <span className="small"> - Last 10</span>
                        <span className="small float-right">
                          <Link href="/period/setup" className="btn-link">
                          
                            <i className="fa fa-forward" /> &nbsp;View More
                          </Link>
                        </span>
                      </h4>
                      <div className="list-group">
                        {[
                          {name:"Agent 1", calls: 2 },
                          {name:"Agent 3", calls: 29 },
                          {name:"Agent 8", calls: 50 },
                          {name:"Agent 2", calls: 70 },
                          {name:"Agent 4", calls: 13 },
                          {name:"Agent 6", calls: 90 },
                          {name:"Agent 9", calls: 13 },
                          {name:"Agent 7", calls: 14 },
                          {name:"Agent 5", calls: 28 },
                          {name:"Agent 10", calls: 50 },
                     
                        ].map((agent, idx) => (
                          <Link
                            key={idx}
                            href="/period/detail"
                            className="list-group-item list-group-item-action flex-column align-items-start"
                          >
                            <div className="d-flex justify-content-between p-2.5">
                              <Image src="/assets/images/bot-icon.jpg" alt={agent.name} width={50} height={50} />
                              <div>
                                <h6 className="mb-1 font-14"><b>{agent.name}</b></h6>
                                <p> {agent.calls}</p>
                              </div>
                       
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div> */}
              
              </div>

            </div>
          </div>
        </div>
      </div>

    {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Upload Contacts</h5>
                <button
                type="button"
                className="close"
                onClick={() => setShowModal(false)}
                >
                <span>&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <form>
    
                <div className="form-row">
                    <div className="col-md-12 mb-3">
                    {/* <label>Select Contact File</label> */}
                        <input
                            style={{height: "18em"}}
                            type="file"
                            className="form-control hidden"
                            onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setFile(e.target.files[0]);
                            }
                            }}
                            required
                        />
                        <label
                            htmlFor="fileInput"
                            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-md p-6 w-full text-center cursor-pointer hover:bg-gray-50"
                            style={{position: "relative", top:"-11em"}}
                        >
                            <i className="fa fa-upload text-3xl text-gray-600 mb-2" />
                            <span className="text-gray-600">
                            {file ? file.name : "Click to choose a file"}
                            </span>
                        </label>
              
                    </div>
                </div>
            
                </form>
            </div>
            <div className="modal-footer">
                <button
                type="submit"
                className="btn btn-primary btn-block w-100"
                disabled={loading}
                onClick={() => handleUploadFile(file)}
                >
                <i className="fa fa-upload"></i>&nbsp; {loading ? "Uploading" : "Upload"}
                </button>
            </div>
            </div>
        </div>
        </div>
    )}
    {showCallModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Schedule Call Date</h5>
                <button
                type="button"
                className="close"
                onClick={() => setShowCallModal(false)}
                >
                <span>&times;</span>
                </button>
            </div>
            <div className="modal-body">
               <form>
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <label>Select Call Interval</label>
                      <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                        {schedules.map((schedule, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <select
                              value={schedule.interval}
                              onChange={(e) => updateSchedule(index, e.target.value)}
                              className="border rounded-lg px-2 py-1 w-full cursor-pointer"
                            >
                              <option value="">-- Select Interval --</option>
                              <option value="5">Every 5 Minutes</option>
                              <option value="10">Every 10 Minutes</option>
                              <option value="15">Every 15 Minutes</option>
                              <option value="30">Every 30 Minutes</option>
                              <option value="60">Every 1 Hour</option>
                              <option value="120">Every 2 Hours</option>
                              <option value="daily">Once a Day</option>
                            </select>

                            <button
                              type="button"
                              onClick={() => removeSchedule(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <i className="fa fa-trash text-2xl text-red-600" />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end mt-4">
                        <button
                          onClick={addSchedule}
                          className="flex items-center gap-1 px-6 py-2 btn btn-success"
                        >
                          <i className="fa fa-plus text-xl text-white" /> Add Interval
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

            </div>
            <div className="modal-footer">
                <button
                type="submit"
                className="btn btn-success btn-block w-100"
                disabled={loading}
                onClick={() => handleUploadFile(file)}
                >
                <i className="fa fa-clock-o"></i>&nbsp; {loading ? "Scheduling" : "Schedule Calls"}
                </button>
            </div>
            </div>
        </div>
        </div>
    )}
    </div>
  );
}
