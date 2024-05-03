import React from "react";

export default function OthersHistory() {
  const [operations, setOperations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState("");
  // Identify unique operation types
  const operationTypes = [
    ...new Set(operations.map((operation) => operation.type)),
  ];
  console.log(operations);
  return (
    <div className="flex flex-col ">
      <h1 className="text-3xl font-bold mb-5 mt-5">Others Operations</h1>

      <div>
        <form class="max-w-sm ">
          <label
            for="countries_multiple"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select an option
          </label>
          <select
            multiple
            id="countries_multiple"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {
              const selectedTypes = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );
              if (selectedTypes.length > 0) {
                // If "All" is selected, set type to "All"
                if (selectedTypes.includes("forAll")) {
                  setType("All");
                } else {
                  // Otherwise, set the first selected type
                  setType(selectedTypes[0]);
                }
              } else {
                // Clear the type if no type is selected
                setType("");
              }
            }}
          >
            <option selected>Choose a type</option>
            <option value="travaux_cadastre">travaux cadastre</option>
            <option value="travaux_topographique">travaux topographique</option>
            <option value="travaux_ife">travaux IFE</option>
            <option value="travaux_3d_drone">
              travaux 3D materiel: drone"
            </option>
            <option value="travaux_3d_slam">travaux 3D materiel: slam </option>
            <option value="travaux_3d_gls">travaux 3D materiel: gls</option>
            <option value="travaux_3d_mms">travaux 3D materiel: mms</option>
            <option value="forAll">All</option>
          </select>
          <div></div>
        </form>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : operations.length === 0 ? (
        <p>No operations found.</p>
      ) : (
        <>
          {operationTypes.map((operationType) => (
            <div key={operationType} className="w-full"></div>
          ))}
        </>
      )}
    </div>
  );
}
