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

  //  extracting materials
  const [selectedMaterial, setSelectedMaterial] = useState("");
  //extracting materials fields
  const [materialFields, setMaterialFields] = useState([]);

  // Function for handling material change
  // function handleMaterialChanges(e) {
  //   setSelectedMaterial(e.target.value);
  //   console.log(selectedMaterial);
  //   const selectedMaterialsLabels =
  //     formFields.data[0].materiels[0][travauType][0][selectedMaterial];
  //   setMaterialFields(selectedMaterialsLabels);
  // }
  //

  // useEffect(() => {
  // //   console.log(materialFields);
  // // }, [materialFields]); // This effect runs whenever selectedMaterial changes
  // // extracting materials

  // const selectedMaterial = useRef(""); // Use useRef instead of useState
  // //extracting materials fields
  // const materialFields = useRef([]); // Use useRef instead of useState

  // // Function for handling material change
  // function handleMaterialChanges(e) {
  //   selectedMaterial.current = e.target.value; // Update the ref directly
  //   console.log(selectedMaterial.current); // Log the current value directly from the ref

  //   const selectedMaterialsLabels =
  //     formFields.data[0].materiels[0][travauType].find(
  //       (material) => material.label === selectedMaterial.current
  //     )?.fields || [];
  //   materialFields.current = selectedMaterialsLabels; // Update the ref directly
  // }

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

  // Render the form
  return (
    <form className="space-y-4">
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
            >
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
                onChange={handleMaterialChanges}
              >
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
                />
              </div>
            ))
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type || "text"}
              className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          )}
        </div>
      ))}
      {travauType === "for3D" && (
        <div>
          <label
            htmlFor="material"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Material
          </label>
          <select
            id="material"
            name="material"
            className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={handleMaterialChanges}
          >
            {formFields.data[0].materiels[0][travauType].map(
              (material, index) => (
                <option key={index} value={material.label}>
                  {material.label}
                </option>
              )
            )}
          </select>
        </div>
      )}
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
