import React from "react";
import formFields from "../formFields.json";

export const DynamicForm = ({ travauType }) => {
  const commonFields = formFields.data[0].fields[0].commonFields || [];

  // Assuming uniqueFields is an array of objects where each object has a travauType key
  const uniqueFields =
    formFields.data[0].fields[0].uniqueFields.find(
      (uf) => uf.travauType === travauType
    )?.fields || [];

  // Adjusted extractOptions function to correctly handle options
  const extractOptions = (fields, type) => {
    return fields
      .filter(
        (field) =>
          field.type === "select" && field.options && field.options[type]
      )
      .flatMap((field) => field.options[type]);
  };

  // Assuming you want to use commonOptions and uniqueOptions
  const commonOptions = extractOptions(commonFields, travauType);
  console.log("material", commonFields[0].name === "nature");
  // Render the form
  return (
    <form className="space-y-4">
      {[...commonFields, ...uniqueFields].map((field, index) => (
        <div key={index} className="flex flex-col">
          <label
            htmlFor={field.name}
            className="mb-1 text-sm font-medium text-gray-700"
          >
            {field.label}
          </label>
          {field.type === "select" ? (
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
          ) : field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
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
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};
