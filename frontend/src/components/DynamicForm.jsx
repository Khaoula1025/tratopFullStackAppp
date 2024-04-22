import React from "react";
// Ensure you import formFields correctly
import formFields from "../formFields.json";

export const DynamicForm = ({ travautype }) => {
  // Assuming formFields is imported correctly
  const fieldsObject = formFields.data[0].fields[0];
  const commonFields = fieldsObject.commonFields || [];
  const uniqueFields = fieldsObject.uniqueFields || [];

  // Define extractOptions function to return the result
  const extractOptions = (fields, type) => {
    return fields
      .filter(
        (field) =>
          field.type === "select" && field.options && field.options[type]
      )
      .map((field) => field.options[type])
      .flat();
  };

  // Assuming you want to use commonOptions and uniqueOptions
  const commonOptions = extractOptions(commonFields, type);
  const uniqueOptions = extractOptions(uniqueFields, type);
  console.log(type);

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
              {Array.isArray(field.options[type]) &&
                field.options[type].map((option, optionIndex) => (
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
