import React, { useEffect, useState } from 'react';
const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

function Leaderboard() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    console.log('Fetching from:', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setItems(results);
        console.log('Fetched leaderboard:', results);
      });
  }, []);
  return (
    <div className="mt-4">
      <h2 className="mb-3">Leaderboard</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Team</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td>{item.team?.name || item.team}</td>
              <td>{item.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Leaderboard;
