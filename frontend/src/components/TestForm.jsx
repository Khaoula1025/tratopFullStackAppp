import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import formFields from "../formFields.json";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
export const DynamicForm = ({ mode, updateType, id }) => {
  //for navigation
  let travauType = useParams().travauType;
  const navigate = useNavigate();
  const { token } = useStateContext();
  const [errors, setErrors] = useState({});

  if (mode === "update") {
    if (
      [
        "travaux_3d_drone",
        "travaux_3d_slam",
        "travaux_3d_gls",
        "travaux_3d_mms",
      ].includes(updateType)
    ) {
      travauType = "for3D";
    } else {
      travauType = updateType;
    }
  }

  console.log(travauType);
  //for Selecting fields
  const commonFields = formFields.data[0].fields[0].commonFields || [];
  const uniqueFields = formFields.data[0].fields[0].uniqueFields || [];
  const uniqueFieldsFiltred = uniqueFields[0][travauType] || [];
  console.log("uniqueFields ", uniqueFieldsFiltred);
  //for title
  const titreDeTravaux = formFields.data[0].travauxType.find(
    (c) => c.label === travauType
  );
  const name = titreDeTravaux ? titreDeTravaux.name : "Not found";

  console.log(travauType);
  //  extracting materials
  const [selectedMaterial, setSelectedMaterial] = useState("");
  //extracting materials fields for 3D
  const [materialFields, setMaterialFields] = useState([]);
  // 3D function that handle material change
  function handleMaterialChanges(e) {
    const materialValue = e.target.value;
    setSelectedMaterial(materialValue);
    console.log(materialValue); // Log the selected material value

    const selectedMaterialsLabels =
      formFields.data[0].materiels[0][travauType][0][materialValue]; // Get the selected materials labels
    console.log(selectedMaterialsLabels); // Log the selected materials labels

    // Update materialFields using the callback function with setMaterialFields
    setMaterialFields((prevMaterialFields) => {
      // Log the selected materials labels
      console.log(materialFields);
      // Update materialFields based on the previous state
      return selectedMaterialsLabels;
    });
  }
  // handle form data state
  const [formData, setFormData] = useState({});
  // handle form data
  const handleInputChange = (event) => {
    const { name, type, value, files } = event.target;

    // Handle file inputs
    if (type === "file") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0], // Assuming single file upload
      }));
    } else {
      // Handle text and select inputs
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
        travauType: travauType,
      }));

      // Update the formData with the combined centroide values
    }
  };

  console.log(formData);

  function handleSubmit(e) {
    e.preventDefault();

    const formDataToSend = new FormData();
    console.log(token);
    Object.keys(formData).forEach((key) => {
      if (key === "travauType") {
        return;
      }
      const value = formData[key] !== undefined ? formData[key] : "";
      if (formData[key] instanceof File) {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, value.toString());
      }
    });

    // Combine Centroïde values into a single object
    if (formData.CentroïdeX && formData.CentroïdeY && formData.CentroïdeZ) {
      const centroide = {
        x: formData.CentroïdeX,
        y: formData.CentroïdeY,
        z: formData.CentroïdeZ,
      };
      formDataToSend.append("Centroïde", JSON.stringify(centroide));
    }

    // Proceed with the submission
    console.log(formDataToSend);
    // Construct the API endpoint URL based on the travauType
    //handle the mode diffrence , for update:
    let apiEndpoint;
    if (mode === "update") {
      // For update, construct the URL differently
      apiEndpoint = `/api/${travauType}/${id}`;
      console.log("id endpoint", apiEndpoint); // Assuming 'id' is the identifier of the item being updated

      // Log FormData entries
      console.log("FormData to send:");
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}:`, value);
      }
      axios
        .put(apiEndpoint, formDataToSend, {
          headers: {
            Authorization: `Bearer ${token}`, // Replace ${token} with the actual token
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.success) {
            navigate("/");
            setFormData({});

            toast.success("Data saved succesfully.", {
              position: "Bottom left",
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
          console.error(error);

          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            setErrors(error.response.data.errors);
            toast.error("there was an error saving data", {
              position: "Bottom left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
    } else {
      apiEndpoint = `/api/${travauType}`;
      axios
        .post(apiEndpoint, formDataToSend, {
          headers: {
            Authorization: `Bearer ${token}`, // Replace ${token} with the actual token
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.success) {
            setFormData({});

            toast.success("Data saved succesfully.", {
              position: "Bottom left",
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
          console.error(error);

          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            setErrors(error.response.data.errors);
            toast.error("there was an error saving data", {
              position: "Bottom left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
    }
  }

  // Render the form
  return (
    <div className=" flex flex-wrap justify-center">
      <ToastContainer />
      <form
        className="space-y-4  bg-white p-8 rounded-lg "
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-bold text-center">{name}</h1>
        {[...commonFields, ...uniqueFieldsFiltred].map((field, index) => (
          <div key={index} className="flex flex-col">
            <label
              htmlFor={field.name}
              className="mb-1 text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>

            {field.type === "select" && field.name !== "materiel" ? (
              <>
                <select
                  id={field.name}
                  name={field.name}
                  className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={handleInputChange} //use handleInputChange
                >
                  <option value="">Selectionner une nature</option>
                  {Array.isArray(field.options[travauType]) &&
                    field.options[travauType].map((option, optionIndex) => (
                      <option key={optionIndex} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
                <div>
                  {" "}
                  {errors[field.name] && (
                    <p className="text-sm text-red-500">{errors[field.name]}</p>
                  )}
                </div>
              </>
            ) : field.type === "select" &&
              field.name === "materiel" &&
              travauType === "for3D" ? (
              <div>
                <select
                  id={field.name}
                  name={field.name}
                  value={selectedMaterial}
                  className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={(event) => {
                    handleMaterialChanges(event);
                    handleInputChange(event);
                  }}

                  // Use handleInputChange
                >
                  <option value="">Selectionner un materiel</option>
                  {Array.isArray(field.options[travauType]) &&
                    field.options[travauType].map((option, optionIndex) => (
                      <option key={optionIndex} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
                <div>
                  {" "}
                  {errors[field.name] && (
                    <p className="text-sm text-red-500">{errors[field.name]}</p>
                  )}
                </div>
                {/* Additional fields for selected material */}
                {travauType === "for3D" && materialFields.length > 0 && (
                  <>
                    {materialFields.map((c, index) => (
                      <div key={index} className="flex flex-col">
                        <label
                          htmlFor={c.name}
                          className=" text-sm font-medium text-gray-700"
                        >
                          {c.label}
                        </label>
                        <input
                          id={c.name}
                          name={c.name}
                          type={c.type || "text"}
                          className="border  border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          onChange={handleInputChange} // Use handleInputChange
                        />
                        <span className="ml-2 text-sm text-gray-500">
                          {c.extension}
                        </span>
                        <div>
                          {" "}
                          {errors[field.name] && (
                            <p className="text-sm text-red-500">
                              {errors[field.name]}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            ) : field.type === "select" &&
              field.name === "materiel" &&
              travauType !== "for3D" ? (
              <div>
                <select
                  id={field.name}
                  name={field.name}
                  className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={handleInputChange}

                  // Use handleInputChange
                >
                  <option value="">Selectionner un materiel</option>
                  {Array.isArray(field.options[travauType]) &&
                    field.options[travauType].map((option, optionIndex) => (
                      <option key={optionIndex} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
                <div>
                  {" "}
                  {errors[field.name] && (
                    <p className="text-sm text-red-500">{errors[field.name]}</p>
                  )}
                </div>
              </div>
            ) : field.type === "textarea" ? (
              <>
                <textarea
                  id={field.name}
                  name={field.name}
                  className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={formData[field.name] || ""}
                  onChange={handleInputChange} // Use handleInputChange
                />
                <div>
                  {" "}
                  {errors[field.name] && (
                    <p className="text-sm text-red-500">{errors[field.name]}</p>
                  )}
                </div>
              </>
            ) : field.type === "file" ? (
              <div>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type || "text"}
                  className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={handleInputChange} // Use handleInputChange
                />
                <span className="ml-2 text-sm text-gray-500">
                  {field.extension}
                </span>
                <div>
                  {" "}
                  {errors[field.name] && (
                    <p className="text-sm text-red-500">{errors[field.name]}</p>
                  )}
                </div>
              </div>
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
                    onChange={handleInputChange} // Use handleInputChange
                  />
                  <div>
                    {" "}
                    {errors[field.name] && (
                      <p className="text-sm text-red-500">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type || "text"}
                  className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={formData[field.name] || ""}
                  onChange={handleInputChange} // Use handleInputChange
                />
                <div>
                  {" "}
                  {errors[field.name] && (
                    <p className="text-sm text-red-500">{errors[field.name]}</p>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
        {mode === "update" ? (
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
            >
              Reset
            </button>
          </div>
        ) : (
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
            >
              Reset
            </button>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition duration-300 ease-in-out"
              onClick={() => navigate("/")}
            >
              Back
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
