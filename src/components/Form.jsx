import React, { useCallback, useContext, useEffect, useState } from "react";
import VendorsContext from "../context/VendorsContext";
import api from "../utils/api";

function Form() {
  const [, setVendors] = useContext(VendorsContext);
  const [file, setFile] = useState(undefined);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = useCallback(
    async (data) => {
      const formData = new FormData();
      formData.append("file", data);

      try {
        const { data } = await api.post(`/vendors`, formData);
        setVendors(data);
      } catch (error) {
        console.log(error);
      }
    },
    [setVendors]
  );

  useEffect(() => {
    if (file) {
      handleSubmit(file);
    }
  }, [file, handleSubmit]);

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
