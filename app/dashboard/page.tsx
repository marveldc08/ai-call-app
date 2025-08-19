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
    const [userName, setUserName] = useState("");

    // useEffect(() => {
    //   if (user) {
    //     setUserName(`${user.firstName} ${user.lastName}`);
    //   } else {
    //     console.log("No user data found.");
    //   }
    // }, [user]);

  
  
  return (
    <div className='page-container'>
      <Header pageName="Dashboard" moduleName="Dashboard"  userName={userName} />
      <div id="wrapper" >
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <div className="container-fluid">
              <div className="row">&nbsp;</div>

              {/* Row of Cards */}
              <div className="row">
                {[
                  {
                    title: "Total Contacts",
                    value: "10,000",
                    border: "primary",
                    icon: "address-book-o",
                    text: "text-primary",
                  },
                  {
                    title: "contact Reached",
                    value: "7,000",
                    border: "success",
                    icon: "user-circle",
                    text: "text-success",
                  },
                  {
                    title: "Total Contact Agent",
                    value: "5",
                    border: "info",
                    icon: "headphones",
                    text: "text-info",
                    isProgress: false,
                  },
                  {
                    title: "Average Agent Call",
                    value: "500 Minutes",
                    border: "warning",
                    icon: "clock-o",
                    text: "text-warning",
                  },
                   {
                    title: "Total Calls",
                    value: "20,000",
                    border: "info",
                    icon: "phone",
                    text: "text-info",
                    
                  },
                  {
                    title: "Total Confirmed",
                    value: "6,000",
                    border: "primary",
                    icon: "check-square",
                    text: "text-primary",
                  },
                  {
                    title: "Total Percentage Confirmed",
                    value: "18%",
                    border: "warning",
                    icon: "percent",
                    text: "text-warning",
                  },
                  {
                    title: "Average Minute Per Call",
                    value: "1.02 Minutes",
                    border: "success",
                    icon: "clock-o",
                    text: "text-success",
                  },
                  {
                    title: "Total Uploaded Contact",
                    value: "12,000",
                    border: "primary",
                    icon: "upload",
                    text: "text-primary",
                  },
                  {
                    title: "Total Valid Contact",
                    value: "10,000",
                    border: "success",
                    icon: "check",
                    text: "text-success",
                  },
                  {
                    title: "Total Call Time",
                    value: "3,000 Minutes",
                    border: "info",
                    icon: "clock-o",
                    text: "text-info",
                    
                  },
                  {
                    title: "Total Number of Calls",
                    value: "18",
                    border: "warning",
                    icon: "volume-control-phone",
                    text: "text-warning",
                  }
                ].map((card, index) => (
                  <div key={index} className="col-xl-3 col-md-6 mb-4 ">
                    <div
                      className={`card border-left-${card.border} shadow h-100 py-2 px-4`}
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
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
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

              

              <div className="row">
                {/* Timeline area */}
                <div className="col-xl-9 col-ml-8 col-lg-8 mt-5">
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

                {/* Lifting Periods */}
                <div className="col-xl-3 col-ml-4 col-lg-4 mt-5">
                  <div className="card border-left-primary">
                    <div className="card-body">
                      <h4 className="header-title">
                       Agents{" "}
                        {/* <span className="small"> - Last 10</span> */}
                        <span className="small float-right">
                          <Link href="/period/setup" className="btn-link">3
                          
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
                </div>
                {/* End of Lifting Periods */}
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
