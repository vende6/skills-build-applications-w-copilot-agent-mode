import React, { useEffect, useState } from 'react';
const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

function Activities() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    console.log('Fetching from:', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched activities:', results);
      });
  }, []);
  return (
    <div className="mt-4">
      <h2 className="mb-3">Activities</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Type</th>
            <th>Duration (min)</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((a, i) => (
            <tr key={i}>
              <td>{a.type}</td>
              <td>{a.duration}</td>
              <td>{a.user?.name || a.user}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Activities;
