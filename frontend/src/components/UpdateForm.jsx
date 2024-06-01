export const UpdateForm = ({ updateType, id }) => {
  let travauType = useParams().travauType;
  const navigate = useNavigate();
  const { token } = useStateContext();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

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
  console.log("travaux types from update form", travauType);
  console.log("update types from update form", updateType);
  const commonFields = formFields.data[0].fields[0].commonFields || [];
  const uniqueFields = formFields.data[0].fields[0].uniqueFields || [];
  const uniqueFieldsFiltred = uniqueFields[0][travauType] || [];

  const titreDeTravaux = formFields.data[0].travauxType.find(
    (c) => c.label === travauType
  );
  const name = titreDeTravaux ? titreDeTravaux.name : "Not found";

  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [materialFields, setMaterialFields] = useState([]);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios
      .get(`/api/${travauType}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setFormData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, type, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      travauType: travauType,
    }));
  };

  const handleMaterialChanges = (e) => {
    const materialValue = e.target.value;
    setSelectedMaterial(materialValue);

    const selectedMaterialsLabels =
      formFields.data[0].materiels[0][travauType][0][materialValue];
    setMaterialFields(selectedMaterialsLabels);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
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

    if (formData.CentroïdeX && formData.CentroïdeY && formData.CentroïdeZ) {
      const centroide = {
        x: formData.CentroïdeX,
        y: formData.CentroïdeY,
        z: formData.CentroïdeZ,
      };
      formDataToSend.append("Centroïde", JSON.stringify(centroide));
    }

    let apiEndpoint = `/api/${travauType}/${id}`;

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
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      <ToastContainer />
      <form
        className="space-y-4 bg-white p-8 rounded-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-bold text-center">{name}</h1>
        {[...commonFields, ...uniqueFieldsFiltred].map((field, index) => (
          <>
            {field.type !== "file" && ( // Exclude file inputs from displaying labels
              <div key={index} className="flex flex-col">
                <label
                  htmlFor={field.name}
                  className="mb-1 text-sm font-medium text-gray-700"
                >
                  {field.label}
                </label>
                {/* Render input based on field type */}
                {field.type === "select" && field.name !== "materiel" ? (
                  <>
                    {/* Select input */}
                    <select
                      id={field.name}
                      name={field.name}
                      className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      onChange={handleInputChange}
                      value={formData[field.name] || ""}
                    >
                      <option value="">Select an option</option>
                      {Array.isArray(field.options[travauType]) &&
                        field.options[travauType].map((option, optionIndex) => (
                          <option key={optionIndex} value={option}>
                            {option}
                          </option>
                        ))}
                    </select>
                    {errors[field.name] && (
                      <p className="text-sm text-red-500">
                        {errors[field.name]}
                      </p>
                    )}
                  </>
                ) : field.type === "select" &&
                  field.name === "materiel" &&
                  travauType === "for3D" ? (
                  <div>
                    {/* Select input for 3D materials */}
                    <select
                      id={field.name}
                      name={field.name}
                      value={selectedMaterial}
                      className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      onChange={(event) => {
                        handleMaterialChanges(event);
                        handleInputChange(event);
                      }}
                    >
                      <option value="">Select a material</option>
                      {Array.isArray(field.options[travauType]) &&
                        field.options[travauType].map((option, optionIndex) => (
                          <option key={optionIndex} value={option}>
                            {option}
                          </option>
                        ))}
                    </select>
                    {errors[field.name] && (
                      <p className="text-sm text-red-500">
                        {errors[field.name]}
                      </p>
                    )}
                    {travauType === "for3D" && materialFields.length > 0 && (
                      <>
                        {materialFields.map((c, index) => (
                          <div key={index} className="flex flex-col">
                            <label
                              htmlFor={c.name}
                              className="text-sm font-medium text-gray-700"
                            >
                              {c.label}
                            </label>
                            <input
                              id={c.name}
                              name={c.name}
                              type={c.type || "text"}
                              className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              onChange={handleInputChange}
                              value={formData[c.name] || ""}
                            />
                            <span className="ml-2 text-sm text-gray-500">
                              {c.extension}
                            </span>
                            {errors[c.name] && (
                              <p className="text-sm text-red-500">
                                {errors[c.name]}
                              </p>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                ) : field.type === "select" &&
                  field.name === "materiel" &&
                  travauType !== "for3D" ? (
                  <div>
                    {/* Select input for non-3D materials */}
                    <select
                      id={field.name}
                      name={field.name}
                      className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      onChange={handleInputChange}
                      value={formData[field.name] || ""}
                    >
                      <option value="">Select a material</option>
                      {Array.isArray(field.options[travauType]) &&
                        field.options[travauType].map((option, optionIndex) => (
                          <option key={optionIndex} value={option}>
                            {option}
                          </option>
                        ))}
                    </select>
                    {errors[field.name] && (
                      <p className="text-sm text-red-500">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ) : field.type === "textarea" ? (
                  <>
                    {/* Textarea input */}
                    <textarea
                      id={field.name}
                      name={field.name}
                      className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      value={formData[field.name] || ""}
                      onChange={handleInputChange}
                    />
                    {errors[field.name] && (
                      <p className="text-sm text-red-500">
                        {errors[field.name]}
                      </p>
                    )}
                  </>
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
                      {errors[child.name] && (
                        <p className="text-sm text-red-500">
                          {errors[child.name]}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <>
                    {/* Default input */}
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type || "text"}
                      className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      value={formData[field.name] || ""}
                      onChange={handleInputChange}
                    />
                    {errors[field.name] && (
                      <p className="text-sm text-red-500">
                        {errors[field.name]}
                      </p>
                    )}
                  </>
                )}
              </div>
            )}
          </>
        ))}
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
  );
};
