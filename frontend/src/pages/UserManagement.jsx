import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("ACCESS_TOKEN");

  useEffect(() => {
    // Fetch users from the backend
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get("/api/users", config)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const updateRole = (userId, newRole) => {
    // Update the user's role in the backend
    axios
      .put(
        `/api/user/${userId}/updateRole`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Update the local state to reflect the change
        setUsers(
          users.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user
          )
        );
      })
      .catch((error) => {
        console.error("Error updating user role:", error);
      });
  };
  const deleteUser = (userId) => {
    // Send a DELETE request to the backend to delete the user
    axios
      .delete(`/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Handle success (e.g., update the UI, show a success message)
        console.log("User deleted successfully");
        // Optionally, update the users state to remove the deleted user
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        // Handle error (e.g., show an error message)
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <h2 className="text-center text-3xl">Gestion des utilisateurs</h2>

            <table className="min-w-full border-4 border-collapse border-gray-900 text-center">
              <thead className="border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-center border-4 border-gray-900"
                  >
                    id
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-center border-4 border-gray-900"
                  >
                    name
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-center border-4 border-gray-900"
                  >
                    email
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-center border-4 border-gray-900"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-center border-4 border-gray-900"
                  >
                    changer role
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-center border-4 border-gray-900"
                  >
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-4 border-gray-900">
                      {user.id}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-4 border-gray-900">
                      {user.name}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-4 border-gray-900">
                      {user.email}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-4 border-gray-900">
                      {user.role}
                    </td>

                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-4 border-gray-900 text-center">
                      <select
                        value={user.role}
                        onChange={(e) => updateRole(user.id, e.target.value)}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        {/* Add other roles as needed */}
                      </select>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-4 border-gray-900">
                      <Button
                        className="text-white bg-red-600"
                        onClick={() => deleteUser(user.id)}
                      >
                        delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
