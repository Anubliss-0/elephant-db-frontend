import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createElephant } from "../utils/api"

function New() {
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        try {
          const response = await createElephant({ name, bio });
      
          console.log('Elephant created successfully:', response.data);
      
          const newElephantId = response.data.data.id;
      
          navigate(`/elephants/${newElephantId}`);
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