import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";
import UpdateModal from "../components/UpdateModal";
import ConfirmationModal from "../components/ConfirmationModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStateContext } from "../context/ContextProvider";

export default function Historique() {
  const [operations, setOperations] = useState([]);
  const [allOperations, setAllOperations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [usernameFilter, setUsernameFilter] = useState("");
  const typeRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const { role, setRole } = useStateContext();
  const [selectedTravauxType, setSelectedTravauxType] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [deleteOperationId, setDeleteOperationId] = useState(null);
  const [deleteOperationType, setDeleteOperationType] = useState(null);

  useEffect(() => {
    fetchOperations();
    const storedRole = localStorage.getItem("userRole");
    if (storedRole && role === null) {
      setRole(storedRole);
    }
  }, [role, setRole]);

  const fetchOperations = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const url = `/api/history/${typeRef.current.value}`;
      const response = await axios.get(url, config);
      if (response.data.message === "Operations fetched successfully.") {
        const fetchedOperations = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setOperations(fetchedOperations);
        setAllOperations(fetchedOperations);
      } else {
        console.error(
          "Backend failed to fetch operations:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Failed to fetch user operations:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOperations();
  }, [fetchOperations]);

  const handleSubmit = (e) => {
    e.preventDefault();
    filterOperations();
  };

  const filterOperations = useCallback(() => {
    const filteredOperations = allOperations.filter(
      (operation) =>
        Object.values(operation).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        ) &&
        (!usernameFilter ||
          operation.user_name
            .toLowerCase()
            .includes(usernameFilter.toLowerCase()))
    );
    setOperations(filteredOperations);
  }, [allOperations, searchQuery, usernameFilter]);

  const handleDelete = useCallback(async (id, travauxType) => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(`/api/${travauxType}/${id}`, config);
      if (response.data.success) {
        toast.success("Opération supprimée avec succès.");
        setOperations((prevOperations) =>
          prevOperations.filter((operation) => operation.id !== id)
        );
        setAllOperations((prevOperations) =>
          prevOperations.filter((operation) => operation.id !== id)
        );
      } else {
        toast.error("suppression de l'opération.");
      }
    } catch (error) {
      console.error("Failed to delete operation:", error);
      toast.error(
        "Une erreur est survenue lors de la suppression de l'opération."
      );
    }
  }, []);

  const getTableHeaders = useCallback(
    (operations) => {
      if (Array.isArray(operations) && operations.length > 0) {
        const allKeys = operations.reduce((acc, operation) => {
          Object.keys(operation).forEach((key) => {
            if (!acc.includes(key) && key !== "type") {
              acc.push(key);
            }
          });
          return acc;
        }, []);
        return role === "admin" ? [...allKeys, "actions"] : allKeys;
      }
      return [];
    },
    [role]
  );

  const operationTypes = useMemo(
    () => [
      "travaux_cadastre",
      "travaux_topographique",
      "travaux_ife",
      "travaux_3d_drone",
      "travaux_3d_slam",
      "travaux_3d_gls",
      "travaux_3d_mms",
    ],
    []
  );

  const displayedType = useCallback(() => {
    return typeRef.current.value === "All"
      ? operationTypes
      : [typeRef.current.value];
  }, [operationTypes]);

  const handleUpdate = useCallback((operation) => {
    setSelectedOperation(operation);
    setIsModalOpen(true);
  }, []);

  const openModal = (travauxType, id) => {
    setSelectedTravauxType(travauxType);
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const uniqueUsernames = useMemo(() => {
    const usernames = allOperations.map((operation) => operation.user_name);
    return Array.from(new Set(usernames));
  }, [allOperations]);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    fetchOperations(); // Fetch updated operations
  }, [fetchOperations]);

  const confirmDelete = (id, travauxType) => {
    setDeleteOperationId(id);
    setDeleteOperationType(travauxType);
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteOperationId && deleteOperationType) {
      handleDelete(deleteOperationId, deleteOperationType);
      setIsConfirmationModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col p-5 bg-gray-50 min-h-screen">
      <ToastContainer />
      <h1 className="text-4xl font-bold mb-5 text-gray-800">
        Operations History
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-3 mb-5"
      >
        <div className="flex w-full md:w-3/4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full px-3 h-10 rounded-l border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-r px-3 py-1 hover:bg-blue-600"
          >
            Search
          </button>
        </div>
        <select
          id="operationType"
          name="operationType"
          ref={typeRef}
          onChange={fetchOperations}
          className="h-10 border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-gray-500 rounded px-2 py-1"
        >
          <option value="All">All</option>
          {operationTypes.map((operationType) => (
            <option key={operationType} value={operationType}>
              {operationType}
            </option>
          ))}
        </select>
        <select
          value={usernameFilter}
          onChange={(e) => setUsernameFilter(e.target.value)}
          className="h-10 border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-gray-500 rounded px-2 py-1"
        >
          <option value="">All Users</option>
          {uniqueUsernames.map((username) => (
            <option key={username} value={username}>
              {username}
            </option>
          ))}
        </select>
      </form>
      <div>
        {isLoading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : operations.length === 0 ? (
          <p className="text-center text-gray-600">No operations found.</p>
        ) : (
          <>
            {displayedType().map((operationType) => {
              const filteredOperations = operations.filter(
                (operation) => operation.type === operationType
              );
              if (filteredOperations.length === 0) {
                return null;
              }
              const headers = getTableHeaders(filteredOperations);
              return (
                <div key={operationType} className="w-full mb-5">
                  <h2 className="text-2xl font-semibold mb-3 p-2 text-gray-800 rounded">
                    {operationType}
                  </h2>
                  <div className="overflow-x-auto shadow-md rounded-md">
                    <table className="w-full text-center border-collapse">
                      <thead>
                        <tr>
                          {headers.map((header, index) => (
                            <th
                              key={index}
                              className={`px-4 py-2 bg-blue-500 text-white ${
                                ["observation", "riverain"].includes(header)
                                  ? "w-1/2"
                                  : ""
                              }`}
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOperations.map((operation, index) => (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0 ? "bg-gray-100" : "bg-white"
                            }
                          >
                            {headers.map((header, index) => (
                              <td key={index} className="border px-4 py-2">
                                {[
                                  "rattachement",
                                  "croquis_de_levé",
                                  "vidage",
                                  "image",
                                  "log",
                                  "croquis_de_terrain",
                                  "croquis",
                                  "cin",
                                  "gcp",
                                  "statique",
                                  "photos",
                                  "Cibles",
                                  "lien",
                                ].includes(header) ? (
                                  <a
                                    href={`${operation[header]}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:text-blue-700"
                                  >
                                    Link
                                  </a>
                                ) : header === "actions" && role === "admin" ? (
                                  <div className="flex flex-row justify-between ">
                                    <button
                                      onClick={() =>
                                        openModal(operation.type, operation.id)
                                      }
                                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
                                    >
                                      Update
                                    </button>
                                    <button
                                      onClick={() =>
                                        confirmDelete(
                                          operation.id,
                                          operation.type
                                        )
                                      }
                                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                ) : (
                                  operation[header]
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {isModalOpen && (
                      <UpdateModal
                        isOpen={isModalOpen}
                        setIsOpen={setIsModalOpen}
                        travauxType={selectedTravauxType}
                        id={selectedId}
                      />
                    )}
                    {isConfirmationModalOpen && (
                      <ConfirmationModal
                        isOpen={isConfirmationModalOpen}
                        onRequestClose={() => setIsConfirmationModalOpen(false)}
                        onConfirm={handleConfirmDelete}
                        message="Êtes-vous sûr de vouloir supprimer cette opération ?"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
