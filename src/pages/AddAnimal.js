import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddAnimal({ setAnimals }) {
  const navigate = useNavigate(); // Hook to navigate to different routes
  const [newAnimal, setNewAnimal] = useState({
    name: "",
    age: "",
    species: "",
    breed: "",
    color: "",
    description: "",
    photo: "",
  });
  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleChange = (e) => {
    setNewAnimal({ ...newAnimal, [e.target.name]: e.target.value });
  };

  // Validate form inputs
  const validate = () => {
    let newErrors = {};
    if (!newAnimal.name.trim()) newErrors.name = "Name is required";
    if (!newAnimal.age.trim() || isNaN(newAnimal.age) || parseInt(newAnimal.age) <= 0)
      newErrors.age = "Age must be a positive number";
    if (!newAnimal.species.trim()) newErrors.species = "Species is required";
    if (!newAnimal.breed.trim()) newErrors.breed = "Breed is required";
    if (!newAnimal.color.trim()) newErrors.color = "Color is required";
    if (!newAnimal.description.trim()) newErrors.description = "Description is required";
    if (!newAnimal.photo.trim()) newErrors.photo = "Photo URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to add a new animal
  const addAnimal = async () => {
    if (!validate()) return;

    try {
      // Send POST request to add the animal
      const response = await axios.post("http://localhost:5000/animals", newAnimal);

      // Update the parent component's state with the new animal
      setAnimals((prev) => [...prev, response.data]);

      // Navigate to the home page after successful addition
      navigate("/");
    } catch (error) {
      console.error("Error adding animal:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl p-10">Add an Animal</h1>
      
      <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 m-2" />
      {errors.name && <p className="text-red-500">{errors.name}</p>}

      <input name="age" placeholder="Age" onChange={handleChange} className="border p-2 m-2" />
      {errors.age && <p className="text-red-500">{errors.age}</p>}

      <input name="species" placeholder="Species" onChange={handleChange} className="border p-2 m-2" />
      {errors.species && <p className="text-red-500">{errors.species}</p>}

      <input name="breed" placeholder="Breed" onChange={handleChange} className="border p-2 m-2" />
      {errors.breed && <p className="text-red-500">{errors.breed}</p>}

      <input name="color" placeholder="Color" onChange={handleChange} className="border p-2 m-2" />
      {errors.color && <p className="text-red-500">{errors.color}</p>}

      <input name="description" placeholder="Description" onChange={handleChange} className="border p-2 m-2" />
      {errors.description && <p className="text-red-500">{errors.description}</p>}

      <input name="photo" placeholder="Photo URL" onChange={handleChange} className="border p-2 m-2" />
      {errors.photo && <p className="text-red-500">{errors.photo}</p>}

      <button onClick={addAnimal} className="bg-green-500 text-white p-2 rounded">
        Add
      </button>
    </div>
  );
}

export default AddAnimal;