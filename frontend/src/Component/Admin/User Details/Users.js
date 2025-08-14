import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import AddUser from '../Add User/AddUser';
import ProfileGridView from '../ProfileGrid/ProfileGridView';
import './Users.css';
import { FiUserPlus, FiUsers } from 'react-icons/fi';
import AdNav from "../NavAdmin/NavAdmin";

const URL = 'http://localhost:5000/users';

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Users() {
  const location = useLocation();
  console.log('Location state:', location.state);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [viewMode, setViewMode] = useState(
    location.state?.showGridView ? 'grid' : 'table'
  );
  console.log('Initial viewMode:', viewMode);

  const userRoles = [
    { value: '', label: 'All Roles' },
    { value: 'admin', label: 'Admin' },
    { value: 'client', label: 'Client' },
    { value: 'sitesupervisor', label: 'Site Supervisor' },
    { value: 'projectManager', label: 'Project Manager' },
    { value: 'quantitysurveyor', label: 'Quantity Surveyor' },
    { value: 'inventorymanager', label: 'Inventory Manager' },
    { value: 'financeofficer', label: 'Finance Officer' },
    { value: 'supplier', label: 'Supplier' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHandler();
        console.log('Fetched data:', data);
        setUsers(data.users || []);
        console.log('Set users:', data.users || []);
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUserDelete = (deletedUserId) => {
    setUsers(users.filter((user) => user._id !== deletedUserId));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (user.userid?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole ? user.userrole === selectedRole : true;
    return matchesSearch && matchesRole;
  });
  console.log('Users state:', users);
  console.log('Filtered users:', filteredUsers);

  return (
    <div className="userdetails-page-wrapper">
      <AdNav />
      <div className="userdetails-container">
        <div className="userdetails-header">
          <div className="userdetails-controls">
            <input
              type="text"
              placeholder="Search by Name or User ID"
              value={searchTerm}
              onChange={handleSearchChange}
              className="userdetails-search-input"
            />
            <select
              value={selectedRole}
              onChange={handleRoleChange}
              className="userdetails-role-filter"
            >
              {userRoles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
          <h1 className="userdetails-title">User Management</h1>
          <div className="userdetails-buttons">
            <Link to="/addusr" className="userdetails-add-user-button">
              <FiUserPlus className="userdetails-button-icon" />
              Add New User
            </Link>
            <button
              className="userdetails-profile-view-button"
              onClick={() => setViewMode(viewMode === 'table' ? 'grid' : 'table')}
            >
              <FiUsers className="userdetails-button-icon" />
              {viewMode === 'table' ? 'Profile View' : 'Table View'}
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="userdetails-loading-spinner">Loading users...</div>
        ) : viewMode === 'table' ? (
          <div className="userdetails-table-container">
            <table className="userdetails-table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Address</th>
                  <th>User Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, i) => (
                    <AddUser
                      key={i}
                      user={user}
                      onUserDelete={handleUserDelete}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="userdetails-no-users">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <ProfileGridView users={filteredUsers} />
        )}
      </div>
    </div>
  );
}

export default Users;