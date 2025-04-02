import React from "react";
import { useParams } from "react-router-dom";
import Home from "./Home.js";

function FilteredAnimals({ animals, searchTerm }) {
  const { type } = useParams(); // Get the filter type from URL

  if (!animals || animals.length === 0) {
    return <p>Loading animals...</p>; // Prevent crashes when animals is undefined
  }

  const filtered = animals.filter((animal) =>
    type === "other"
      ? !["dog", "cat"].includes(animal.species.toLowerCase())
      : animal.species.toLowerCase() === type.toLowerCase()
  );

  return <Home searchTerm={searchTerm} animals={filtered} />;
}

export default FilteredAnimals;
