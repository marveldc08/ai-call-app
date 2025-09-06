"use client";

import { useState ,useEffect, useCallback} from "react";
import { useRouter } from "next/navigation";
import Header from '../../components/Header'
import { useLocalStorageObject } from '../../hooks/useLocalStorage';
import { toast } from 'react-toastify';


type User = {
  userName: string;
  // Add other properties if needed, e.g. firstName, lastName, etc.
};

type Periods =[string]

type Event = {
  id: number;
  name: string;
  location: string;
  periods: Periods;
};

export default function EventsPage() {
  const [user, setUser] = useLocalStorageObject<User | null>("user", null);
  const [token, setToken] = useLocalStorageObject("token", null);
  const [collapsed, setCollapsed] = useLocalStorageObject("collapsed", null);
  const [userName, setUserName] = useState("");
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventPeriod, setEventPeriod] = useState<Periods>([""]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();


  const handleUnauthorization = () => {
     localStorage.clear()
     router.push('/login');
}



  const getEvents = useCallback(async () => {
    try {
      const response = await fetch('/api/events/get', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if(response.status === 401){
        handleUnauthorization()
        return
      }

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error fetching roles:", error);
      if (error instanceof Error) {
        console.error("Error fetching roles:", error.message, error.stack);
      }
      throw error; // Re-throw the error to handle it in the calling function

    }
  }, [token]);

  useEffect(() => {
      // setEventPeriod([[startDate, endDate.join(", ")]])
    if (!token) {
      console.warn("Token is not available yet.");
      return;
    }

    const fetchEvents = async () => {
      const eventData = await getEvents();
      if (eventData) {
        console.log("Fetched events:", eventData);
        setEvents(eventData.data.data);
      }
    };

    fetchEvents();

  }, [token, getEvents]);

  // Add new event
  const handleAddEvent = async () => {
    eventPeriod.pop()
    eventPeriod.push(startDate, endDate)
    setError("");
    setLoading(true);
    
    if (!eventName || !eventLocation || !eventPeriod) {
      alert("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({
          name: eventName,
          location: eventLocation,
          periods: [startDate, endDate],
        }),
      });

      if(response.status === 401){
          handleUnauthorization()
          return
        }

      const data = await response.json();

      if (response.ok) {
        toast.success("Successfully Added Event");

        // ✅ use data from backend
        setEvents((prev) => [
          ...prev,
          {
            id: data.id ?? Date.now(), // fallback if backend doesn’t return id
            name: data.name ?? eventName,
            location: data.location ?? eventLocation,
            periods: (data.periods ?? eventPeriod).join(", "),
          },
        ]);

        // reset form
        setEventName("");
        setEventLocation("");
        setEventPeriod([""]);
        setShowAddEventModal(false);
      } else {
        throw new Error(data.message || "Add event failed");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id: number) => {
    try {
      const response = await fetch("/api/events/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ id }),
      });

      if(response.status === 401){
          handleUnauthorization()
          return
        }
        
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete event");
      }

      setEvents((prev) => prev.filter((event) => event.id !== id));
      toast.success("Event deleted successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <div className={` page-container `}>
      <Header pageName="Events" moduleName="Manage Events" userName={userName} />

      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <div className="container-fluid">
               <div className="flex flex-col justify-center p-4">
                  <h1 className="text-2xl font-bold mb-4 col-12">Events</h1>
                   <div className='row mt-4'>
                    <div className='col-12 mb-4'>
                        <div className="flex flex-row justify-end">
                            <div className="w-[25%]">
                                <button className="btn btn-success btn-block" style={{height: "4rem"}} type="submit" 
                                onClick={()=>setShowAddEventModal(true)}>
                                    <i className="fa fa-plus"></i> Add Events
                                </button> 
                                
                            </div>
                            
                        </div>
                    </div>
              </div>
              <div className="col-xl-12 col-ml-12 col-lg-12 mt-5 shadow-gray-600 shadow-gray">
                <div className="card border-left-primary">
                  <div className="card-body">
                    <h4 className="header-title">Event Records</h4>
                    <div className="table-responsive">
                      <table  className="table" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                          <tr>
                            <th >Title</th>
                            <th >Location</th>
                            <th >Periods</th>
                            <th >Actions</th>
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
                              <tr key={event?.id} className="text-gray-500">
                                <td >{event?.name}</td>
                                <td >{event?.location}</td>
                                <td >{event?.periods?.map((p, idx)=>(<div key={idx}>{p}</div>))}</td>
                                <td >
                                  <button
                                    onClick={() => handleDelete(event?.id)}
                                    className="btn btn-danger text-white px-3 py-1 rounded"
                                  >
                                    Delete
                                  </button>
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

      {showAddEventModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
              <div className="modal-header">
                  <h5 className="modal-title">Add Event</h5>
                  <button
                  type="button"
                  className="close"
                  onClick={() => setShowAddEventModal(false)}
                  >
                  <span>&times;</span>
                  </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddEvent}>
                    <div className="form-row">
                      <div className="col-md-12 mb-3">
                        <label>Name</label>
                        <input
                                type="text"
                                placeholder="Event Name"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                                className="border px-3 py-2 rounded w-full"
                              />
                      </div>
                      <div className="col-md-12 mb-3">
                        <label>Location</label>
                        <input
                                type="text"
                                placeholder="Event Location"
                                value={eventLocation}
                                onChange={(e) => setEventLocation(e.target.value)}
                                className="border px-3 py-2 rounded w-full"
                              />
                      </div>
                      <div className="col-md-12 mb-3">
                        <label>Start Date</label>
                        <input
                                type="date"
                                placeholder="Event Period" 
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="border px-3 py-2 rounded w-full"
                              />
                      </div>
                      <div className="col-md-12 mb-3">
                        <label>End Date</label>
                        <input
                                type="date"
                                placeholder="Event Period" 
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="border px-3 py-2 rounded w-full"
                              />
                      </div>
                    </div>
                  </form>

              </div>
              <div className="modal-footer">
                  <button
                  type="submit"
                  className="btn btn-success btn-block w-100"
                  disabled={loading}
                  onClick={handleAddEvent}
                  >
                  <i className="fa fa-clock-o"></i>&nbsp; {loading ? "Adding" : "Add Event"}
                  </button>
              </div>
              </div>
          </div>
        </div>
     )}
    </div>
  );
}

