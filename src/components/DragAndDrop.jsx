import React, { useRef, useState } from "react";
import axios from "axios";
const DragAndDrop = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  if (file) {
    <>
      <div>
        <h1>File Uploaded</h1>
      </div>
    </>;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new FormData object and append the file to it
    const formData = new FormData();
    formData.append("csvFile", file);

    // Submit the form data to the server
    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Upload a CSV file</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button className="upload" type="submit" disabled={!file}>
          Upload
        </button>
      </form>
    </div>
  );
};

export default DragAndDrop;
