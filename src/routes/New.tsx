import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function New() {
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      // Make the POST request without needing to manually include the token
      const response = await axios.post('http://localhost:3000/elephants', {
        elephant: {
          name,
          bio
        }
      });
  
      console.log('Elephant created successfully:', response.data);

      const newElephantId = response.data.data.id
      navigate(`/elephants/${newElephantId}`)
    } catch (err) {
      console.error('Error creating elephant:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Bio:</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
        />
      </div>

      <button type="submit">Create Elephant</button>
    </form>
  );
}

export default New