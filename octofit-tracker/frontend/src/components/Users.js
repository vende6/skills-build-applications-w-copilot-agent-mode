import React, { useEffect, useState } from 'react';
const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    console.log('Fetching from:', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Fetched users:', results);
      });
  }, []);
  return (
    <div className="mt-4">
      <h2 className="mb-3">Users</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={i}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.team?.name || user.team}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Users;
