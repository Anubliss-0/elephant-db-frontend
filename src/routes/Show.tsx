import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Show() {
  const { id } = useParams();  // Get the elephant id from the route
  const [elephant, setElephant] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/elephants/${id}`)
      .then(response => {
        setElephant(response.data.data);  // Access the elephant data
      })
      .catch(error => {
        console.error('Error fetching the elephant details:', error);
      });
  }, [id]);

  if (!elephant) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{elephant.attributes.name}</h1>
      <p>Age: {elephant.attributes.age}</p>
      <p>ID: {elephant.id}</p>
      {/* You can add more details about the elephant here */}
    </div>
  );
};

export default Show;