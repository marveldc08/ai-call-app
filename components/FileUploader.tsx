"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import { useLocalStorageObject } from "@/hooks/useLocalStorage";

interface Props {
  setShowModal: (val: boolean) => void;
  eventId: number
}

export default function ExcelUploader({ setShowModal, eventId }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [token] = useLocalStorageObject("token", null);
  const [loading, setLoading] = useState(false);

  const handleUploadFile = async () => {
     const selectedFile = file;
    if (!selectedFile) return alert("Please select a file first");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch(`/api/uploads?id=${eventId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ only auth header
        },
        body: formData, // ✅ let browser handle Content-Type
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Upload failed");
      }

      alert("Upload successful!");
      setFile(null);
      setShowModal(false);
    } catch (err: any) {
      console.error(err);
      alert("Upload failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
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
                             console.log("Selected file:", e.target.files[0]);
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
             onClick={handleUploadFile}
             >
             <i className="fa fa-upload"></i>&nbsp; {loading ? "Uploading" : "Upload"}
             </button>
         </div>
         </div>
     </div>
     </div>
  );
}
