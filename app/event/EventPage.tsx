"use client"

import React,{useEffect, useState, useCallback} from 'react'
import { useSearchParams } from 'next/navigation';
import Header from '../../components/Header'
import { toast } from 'react-toastify';
import { useLocalStorageObject } from '../../hooks/useLocalStorage';
import Image from "next/image";
import {useRouter} from 'next/navigation';



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



type User = {
  userName: string;
  // Add other properties if needed, e.g. firstName, lastName, etc.
};

export default function EventPage() {
    const [user, setUser] = useLocalStorageObject<User | null>("user", null);
    const [token, setToken] = useLocalStorageObject("token", null);
    const [collapsed, setCollapsed] = useLocalStorageObject("collapsed", null);
    const [userName, setUserName] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showCallModal, setShowCallModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [callType, setCallType] = useState("");
    const [startDate, setStartDate] = useState("");
    const[endDate, setEndDate] = useState("")
    const [schedule, setSchedule] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [stats, setStats] = useState<any>({});
    const searchParams = useSearchParams();
    const eventId = searchParams.get("eventId")
    const parsedEventId = eventId ? parseInt(eventId, 10) : 0;
    const router = useRouter()


      useEffect(() => {
        if (user) {
          setUserName(user ? `${user.userName}` : "");
        }
        const stored = localStorage.getItem("collapsed");
        if (stored === "true") {
            setIsCollapsed(true);
        } else {
            setIsCollapsed(false);
        }
        
      }, [user, ]);

        const getStats = useCallback(async () => {
          try {
            const response = await fetch(`/api/events/stats?id=${parsedEventId}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
      
            if (!response.ok) {
              console.log(`Error fetching stats: ${response.status} ${response.text()}`);
              throw new Error("Failed to fetch stats");
            }
      
            const data = await response.json();

            return data;
          } catch (error) {
            console.error("Error fetching stats:", error);
            if (error instanceof Error) {
              console.error("Error fetching stats:", error.message, error.stack);
            }
            throw error; // Re-throw the error to handle it in the calling function
      
          }
        }, [token]);
      
        useEffect(() => {
            // setEventPeriod([[startDate, endDate.join(", ")]])
          if (!token) {
            console.warn("Token is not available yet.");
            router.push('/login')
            return;
          }
      
          const fetchEvents = async () => {
            const statsData = await getStats();
            if (statsData) {
              console.log("Fetched events:", statsData);
              setStats(statsData.data);
            }
          };
      
          fetchEvents();


      
        }, [token, getStats]);
      console.log("Stats data:", stats);




    const handleSubmitSchedule = async () => {
 
      try {
        const res = await fetch("/api/schedules", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ callType, schedule, startDate, endDate }),
        });
   
        const data = await res.json();
        console.log("API response:", data);

        if (res.ok) {
          toast.success("Schedule saved!");
          setShowCallModal(false)
           console.error(res);
        } else {
          toast.error("Error: " + data.error);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to save schedule");
      }
    };


    const handleUploadFile = async (file: File | null) => {
      if (!file) return;
      

      const formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      try {
        const res = await fetch(`/api/uploads?id=${0}`, {
          method: "POST",
          body: formData,
        });
     
        const data = await res.json();

        if (res.ok) {
          toast.success("File uploaded: " + data.fileUrl);
          setShowModal(false)
          setFile(null);
          setLoading(false);
        } else {
          toast.error("Upload failed: " + data.error);
          setShowModal(false)
          setFile(null);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        toast.error("Error uploading file");
      }
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
                    value: stats.totalUploaded || 0,
                    border: "primary",
                    icon: "upload",
                    text: "text-primary",
                  },
                  {
                    title: "Total Valid Contacts",
                    value: stats.totalValidContact ,
                    border: "success",
                    icon: "user-circle",
                    text: "text-success",
                  },
                  {
                    title: "Contacts Reached",
                    value: stats.totalContactReached,
                    border: "info",
                    icon: "headphones",
                    text: "text-info",
                    isProgress: false,
                  },
                  {
                    title: "Number of Confirmed",
                    value: stats.numberOfConfirmed,
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
                    value: `${stats.totalValidContact || 0}% valid`,
                    border: "info",
                    icon: "phone",
                    text: "text-info",
                  },
                  {
                    title: "Contacts Reached",
                    value: `${stats.totalContactReachedPercent || 0}% reached`,
                    border: "success",
                    icon: "headphones",
                    text: "text-success",
                    isProgress: false,
                  },
                  {
                    title: "Number of Confirmed",
                    value: `${stats.numberOfConfirmedPercent || 0}% confirmed`,
                    border: "primary",
                    icon: "check",
                    text: "text-primary",
                  },
                  {
                    title: "Total Calls",
                    value: stats.totalCalls,
                    border: "success",
                    icon: "phone",
                    text: "text-success",
                  },
                  {
                    title: "Total Call Time",
                    value: stats.totalCallTime,
                    border: "primary",
                    icon: "clock-o",
                    text: "text-primary",
                  },
                  {
                    title: "Average Call Time per person",
                    value: `${stats.avgCallTimePerPerson || 0} mins`,
                    border: "info",
                    icon: "clock-o",
                    text: "text-info",
                  },
                  {
                    title: "Total Cost",
                    value: `$ ${stats.totalCost || 0}`,
                    border: "warning",
                    icon: "dollar",
                    text: "text-warning",
                  },
                  {
                    title: "Total Voice Calls",
                    value: stats.totalVoiceCalls || 0,
                    border: "warning",
                    icon: "phone",
                    text: "text-warning",
                  },

                  {
                    title: "Total Confirmed Calls",
                    value: stats.totalConfirmedCalls,
                    border: "primary",
                    icon: "upload",
                    text: "text-primary",
                  },
                  {
                    title: " Average Voice Calls Confirmed",
                    value: stats.averageVoiceCallsConfirmed,
                    border: "success",
                    icon: "check",
                    text: "text-success",
                  },
                  {
                    title: "Total Cost",
                    value: `$ ${stats.totalCost || 0}`,
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
                            style={{height: "20em"}}
                            type="file"
                            className="form-control hidden"
                            // onChange={(e) => {
                            // if (e.target.files && e.target.files[0]) {
                            //     setFile(e.target.files[0]);
                            // }
                            // }}
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setFile(e.target.files[0]);
                                // console.log("Selected file:", e.target.files[0]);
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
                            <span className="text-gray-600" style={{height: "20em"}}>
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
               <form onSubmit={handleSubmitSchedule}>
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <label>Call Type</label>
                      <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                          <div className="flex items-center gap-2">
                            <input
                              type='text'
                              value={callType}
                              onChange={(e) => setCallType(e.target.value)}
                              className="border rounded-lg px-2 py-1 w-full"
                            />
                          </div>
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label>Select Call Interval</label>
                      <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                       
                          <div className="flex items-center gap-2">
                            <select
                              value={schedule}
                              onChange={(e) => setSchedule( e.target.value)}
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
                          </div>
                        
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label>Start Date</label>
                      <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                          <div className="flex items-center gap-2">
                            <input
                              type='date'
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                              className="border rounded-lg px-2 py-1 w-full"
                            />
                          </div>
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label>End Date</label>
                      <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                          <div className="flex items-center gap-2">
                            <input
                              type='date'
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                              className="border rounded-lg px-2 py-1 w-full"
                            />
                          </div>
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
                onClick={handleSubmitSchedule}
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