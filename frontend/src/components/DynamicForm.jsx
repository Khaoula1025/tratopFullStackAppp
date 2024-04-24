import React, { useEffect, useState, useRef } from "react";
import formFields from "../formFields.json";
import { useNavigate, useParams } from "react-router-dom";

export const DynamicForm = () => {
  //for navigation
  const { travauType } = useParams();

  const navigate = useNavigate();

  //for Selecting fields
  const commonFields = formFields.data[0].fields[0].commonFields || [];
  const uniqueFields = formFields.data[0].fields[0].uniqueFields || [];
  const uniqueFieldsFiltred = uniqueFields[0][travauType] || [];
  //for title
  const titreDeTravaux = formFields.data[0].travauxType.find(
    (c) => c.label === travauType
  );
  const name = titreDeTravaux ? titreDeTravaux.name : "Not found";

  //  extracting materials
  const [selectedMaterial, setSelectedMaterial] = useState("");
  //extracting materials fields for 3D
  const [materialFields, setMaterialFields] = useState([]);
  // function that handle material change
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
  const [formData, setFormData] = useState([]);
  // handle form data
  const handleInputChange = (event) => {
    const { name, type, value, files } = event.target;

    // Handle file inputs
    if (type === "file") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files, // Assuming single file upload
      }));
    } else {
      // Handle text and select inputs
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  console.log(formData);
  // Render the form
  return (
    <form className="space-y-4">
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
          ) : field.type === "select" && field.name === "materiel" ? (
            <div>
              <select
                id={field.name}
                name={field.name}
                value={selectedMaterial}
                className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(event) => {
                  handleInputChange(event);
                  handleMaterialChanges(event);
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
                    </div>
                  ))}
                </>
              )}
            </div>
          ) : field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={formData[field.name] || ""}
              onChange={handleInputChange} // Use handleInputChange
            />
          ) : field.type === "file" ? (
            <input
              id={field.name}
              name={field.name}
              type={field.type || "text"}
              className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={handleInputChange} // Use handleInputChange
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
                  onChange={handleInputChange} // Use handleInputChange
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
              onChange={handleInputChange} // Use handleInputChange
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
      <button
        type="reset"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        reset
      </button>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => navigate("/")}
      >
        back
      </button>
    </form>
  );
};
