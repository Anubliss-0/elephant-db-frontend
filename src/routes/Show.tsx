import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Show() {
  const { id } = useParams();  // Get the elephant id from the route
  const [elephant, setElephant] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:3000/elephants/${id}`)
      .then(response => {
        setElephant(response.data.data);  // Access the elephant data
      })
      .catch(error => {
        console.error('Error fetching the elephant details:', error);
      });
  }, [id]);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()

    try {
      await axios.delete(`http://localhost:3000/elephants/${id}`)
      navigate('/elephants')
    } catch (err) {
      console.error('Error deleting Elephant', err);
    }

  }

  if (!elephant) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{elephant.attributes.name}</h1>
      <p>Age: {elephant.attributes.age}</p>
      <p>ID: {elephant.id}</p>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Show;