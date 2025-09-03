"use client"
import React,{ useState} from 'react'
import { mainDashBoardStats } from '@/constants/stats';
import Header from '../../components/Header'
import CallHistoryChart from '@/components/CallHistoryChart';



export default function DashboardPage() {

    const [userName, setUserName] = useState("");

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
                {mainDashBoardStats.map((card, index) => (
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

              <div className='!mt-12'>
                    <CallHistoryChart />
               </div>        

              <div className="row">
                {/* Timeline area */}
                <div className="col-xl-12 col-ml-12 col-lg-12 mt-5">
                  <div className="card border-left-primary">
                    <div className="card-body">
                     
                      <br />
                      <div className="table-responsive">
                        <table
                          className="table"
                          id="dataTable"
                          width="100%"
                          cellSpacing="0"
                        >
                          <thead>
                            <tr>
                              <th>Title </th>
                              <th>Event Date</th>
                              <th>Date Created</th>
                              <th></th>
                            
                            </tr>
                          </thead>
                          <tbody>
                            {Array.from({ length: 6 }).map((_, index) => (
                              <tr key={index}>
                                <td>An Evening of Blessings</td>
                                <td>12/09/2025</td>
                                <td>01/09/2025</td>
                                <td>
                                     <button className="btn btn-sm btn-primary" >View <i className={`fa fa-eye  text-gray-300`} /></button>
                                </td>                     
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

              
              </div>

            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
