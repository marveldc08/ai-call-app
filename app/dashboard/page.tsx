"use client"
import React,{ useState, useCallback, useEffect} from 'react'
import { mainDashBoardStats } from '@/constants/stats';
import Header from '../../components/Header'
import CallHistoryChart from '@/components/CallHistoryChart';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocalStorageObject } from '../../hooks/useLocalStorage';
import { toast } from 'react-toastify';



type Periods =[string]

type Event = {
  id: number;
  name: string;
  location: string;
  periods: Periods;
};
export default function DashboardPage() {

    const [userName, setUserName] = useState("");
    const [events, setEvents] = useState<Event[]>([]);
    const router = useRouter();
    const [token, setToken] = useLocalStorageObject("token", null);

    
      const getEvents = useCallback(async () => {
        try {
          const response = await fetch('/api/events/get', {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (!response.ok) {
            console.log(`Error fetching events: ${response.status} ${response.text()}`);
            throw new Error("Failed to fetch events");
          }
    
          const data = await response.json();
    
          return data;
        } catch (error) {
          console.error("Error fetching events:", error);
          if (error instanceof Error) {
            console.error("Error fetching events:", error.message, error.stack);
          }
          throw error; // Re-throw the error to handle it in the calling function
    
        }
      }, [token]);
    
      useEffect(() => {
          // setEventPeriod([[startDate, endDate.join(", ")]])
        if (!token) {
          console.warn("Token is not available yet.");
        //   router.push("/login")+
        
          return;
        }
    
        const fetchEvents = async () => {
          const eventData = await getEvents();
          if (eventData) {
            console.log("Fetched events:", eventData);
            setEvents(eventData.data.data);
            // setEvents(eventData.data ?? []);
          }
        }
    
        fetchEvents();
    
      }, [token, getEvents]);
    



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
                              <th>Location</th>
                              <th>Periods</th>
                              <th>Actions</th>
                            
                            </tr>
                          </thead>

                            <tbody>
                                {events.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-4 text-gray-500 h-[300px]">
                                    No events yet.
                                    </td>
                                </tr>
                                ) : (
                                events.map((event) => (
                                    <tr key={event.id} className="text-gray-500">
                                    <td >{event.name}</td>
                                    <td >{event.location}</td>
                                    <td >{event.periods?.map((p, idx)=>(<div key={idx}>{p}</div>))}</td>
                                    <td>
                                     <button className="btn btn-sm btn-primary" onClick={()=> router.push(`/event?eventId=${event.id}`)} >View <i className={`fa fa-eye  text-gray-300`} /></button>
                                    </td>
                                    </tr>
                                ))
                                )}
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