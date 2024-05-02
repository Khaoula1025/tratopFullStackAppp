import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Profil() {
  const [user, setUser] = useState({});
  const [recordCounts, setRecordCount] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("ACCESS_TOKEN");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get("/api/user-details", config); // Adjust the URL to your backend endpoint
        setUser(response.data.user);
        console.log(response.data);
        setRecordCount(response.data.recordCounts);
        console.log(recordCounts);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Profil</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>

        <p className="mb-2">
          <span className="font-semibold">
            {" "}
            <FontAwesomeIcon
              icon={faArrowRight}
              className="inline-block mr-2"
            />
            Name:
          </span>{" "}
          <span>{user.name}</span>
        </p>
        <p className="mb-2">
          <span className="font-semibold">
            {" "}
            <FontAwesomeIcon
              icon={faArrowRight}
              className="inline-block mr-2"
            />
            Email:
          </span>{" "}
          <span>{user.email}</span>
        </p>
        {/* Add more user details as needed */}
      </div>
      <div className="bg-white rounded-lg shadow-md mt-6 p-6">
        <h2 className="text-xl font-semibold mb-4">Record Count</h2>
        <ul>
          {Object.entries(recordCounts).map(([type, count]) => (
            <li key={type} className="mb-2">
              <span className="font-semibold">
                {" "}
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="inline-block mr-2"
                />
                {type}:
              </span>{" "}
              {count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profil;
