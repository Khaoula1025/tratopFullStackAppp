import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import formFields from "../formFields.json";
import { useStateContext } from "../context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";

export default function UpdateModal({ isOpen, setIsOpen, travauxType, id }) {
  const { token } = useStateContext();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [materialFields, setMaterialFields] = useState([]);
  const [formData, setFormData] = useState({});

  const commonFields = useMemo(
    () => formFields.data[0].fields[0].commonFields || [],
    []
  );
  const uniqueFields = useMemo(
    () => formFields.data[0].fields[0].uniqueFields || [],
    []
  );
  const uniqueFieldsFiltered = useMemo(
    () => uniqueFields[0][travauxType] || [],
    [travauxType]
  );

  const titreDeTravaux = useMemo(
    () =>
      formFields.data[0].travauxTypeforUpdate.find(
        (c) => c.label === travauxType
      ),
    [travauxType]
  );
  const name = titreDeTravaux ? titreDeTravaux.name : "Not found";

  useEffect(() => {
    axios
      .get(`/api/${travauxType}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setFormData(response.data);
        setSelectedMaterial(response.data.materiel || "");
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
        setLoading(false);
      });
  }, [id, travauxType, token]);

  const handleInputChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
        travauxType: travauxType,
      }));
    },
    [travauxType]
  );

  const handleMaterialChanges = useCallback(
    (e) => {
      const materialValue = e.target.value;
      setSelectedMaterial(materialValue);

      const selectedMaterialsLabels =
        formFields.data[0].materiels[0][travauxType][0][materialValue];
      setMaterialFields(selectedMaterialsLabels);
      setFormData((prevState) => ({
        ...prevState,
        materiel: materialValue,
      }));
    },
    [travauxType]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "travauxType") return;
        const value = formData[key] !== undefined ? formData[key] : "";
        if (formData[key] instanceof File) {
          formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, value.toString());
        }
      });

      if (formData.CentroïdeX && formData.CentroïdeY && formData.CentroïdeZ) {
        const centroide = {
          x: formData.CentroïdeX,
          y: formData.CentroïdeY,
          z: formData.CentroïdeZ,
        };
        formDataToSend.append("Centroïde", JSON.stringify(centroide));
      }

      const apiEndpoint = `/api/${travauxType}/${id}`;

      axios
        .post(apiEndpoint, formDataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        })
        .then((response) => {
          if (response.data.success) {
            setFormData({});
            toast.success("Data saved successfully.", {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          setErrors({});
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            setErrors(error.response.data.errors);
            toast.error("There was an error saving data", {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
    },
    [formData, travauxType, id, token]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isOpen) return null;

  const isMaterialFieldDisabled = travauxType.startsWith("travaux_3d");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      {/* Modal content */}
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 max-w-md w-full p-4 md:p-5 overflow-y-auto max-h-full">
        {/* Modal header */}
        <div className="flex items-center justify-between pb-4 border-b dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Update Operation
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        {/* Modal body */}
        <div className="pt-4">
          <div className="flex flex-wrap justify-center">
            <ToastContainer />
            <form
              className="space-y-4 bg-white p-8 rounded-lg"
              onSubmit={handleSubmit}
            >
              <h1 className="text-4xl font-bold text-center">{name}</h1>
              {[...commonFields, ...uniqueFieldsFiltered].map(
                (field, index) => (
                  <div key={index} className="flex flex-col">
                    {field.type !== "file" && (
                      <>
                        <label
                          htmlFor={field.name}
                          className="mb-1 text-sm font-medium text-gray-700"
                        >
                          {field.label}
                        </label>
                        {field.type === "select" &&
                        field.name !== "materiel" ? (
                          <select
                            id={field.name}
                            name={field.name}
                            className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={handleInputChange}
                            value={formData[field.name] || ""}
                          >
                            <option value="">Selectioner une nature</option>
                            {Array.isArray(field.options[travauxType]) &&
                              field.options[travauxType].map(
                                (option, optionIndex) => (
                                  <option key={optionIndex} value={option}>
                                    {option}
                                  </option>
                                )
                              )}
                          </select>
                        ) : field.type === "select" &&
                          field.name === "materiel" ? (
                          <select
                            id={field.name}
                            name={field.name}
                            value={selectedMaterial}
                            className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={(event) => {
                              handleMaterialChanges(event);
                              handleInputChange(event);
                            }}
                            disabled={isMaterialFieldDisabled}
                          >
                            <option value="">Select a material</option>
                            {Array.isArray(field.options[travauxType]) &&
                              field.options[travauxType].map(
                                (option, optionIndex) => (
                                  <option key={optionIndex} value={option}>
                                    {option}
                                  </option>
                                )
                              )}
                          </select>
                        ) : field.type === "textarea" ? (
                          <textarea
                            id={field.name}
                            name={field.name}
                            className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={formData[field.name] || ""}
                            onChange={handleInputChange}
                          />
                        ) : field.label === "Centroïde" ? (
                          field.children.map((child, childIndex) => (
                            <div className="flex flex-col" key={childIndex}>
                              <label
                                htmlFor={child.name}
                                className="mb-1 text-sm font-medium text-gray-700"
                              >
                                {child.label}
                              </label>
                              <input
                                id={child.name}
                                name={child.name}
                                type={child.type || "text"}
                                className="border w-10 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={formData[child.name] || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                          ))
                        ) : (
                          <input
                            id={field.name}
                            name={field.name}
                            type={field.type || "text"}
                            className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={formData[field.name] || ""}
                            onChange={handleInputChange}
                          />
                        )}
                      </>
                    )}
                  </div>
                )
              )}
              <div className="flex justify-between space-x-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-300 ease-in-out"
                >
                  Submit
                </button>
                <button
                  type="reset"
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition duration-300 ease-in-out"
                  onClick={() => setFormData({})}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
