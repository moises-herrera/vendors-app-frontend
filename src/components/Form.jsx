import React, { useEffect, useState } from "react";
import api from "../utils/api";

function Form() {
  const [file, setFile] = useState(undefined);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data);

    await api.post(`/vendors`, formData);
  };

  useEffect(() => {
    if (file) {
      handleSubmit(file);
    }
  }, [file]);

  return (
    <>
      <form>
        <label htmlFor="data-file">
          <input
            className="hidden"
            id="data-file"
            name="data-file"
            type="file"
            accept=".txt"
            onChange={handleFileChange}
          />
          <span className="py-2 px-6 bg-blue-600 text-white rounded-full cursor-pointer">
            Upload
          </span>
        </label>
      </form>
    </>
  );
}

export default Form;
