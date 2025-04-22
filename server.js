import express from 'express';
import initialAnimals from './src/data.js'; 

import cors from "cors";
const app = express();

// Apply CORS first
app.use(cors());
app.use(express.json());

let animals = [...initialAnimals];

app.get('/animals', (req, res) => {
  let results = animals;

  const { sortBy, ...filterParams } = req.query;

  if (Object.keys(filterParams).length > 0) {
    results = results.filter((animal) => {
      return Object.keys(filterParams).every((key) => {
        return String(animal[key]).toLowerCase() === String(filterParams[key]).toLowerCase();
      });
    });
  }

  if (sortBy) {
    const [field, order = "asc"] = sortBy.split(':');
    results.sort((a, b) => {
      if (a[field] === undefined || b[field] === undefined) return 0;
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });
  }

  res.json(results);
});


app.post('/animals', (req, res) => {
  const { name, age, species, breed, color, description, photo } = req.body;


  if (!name || age === undefined || !species || !breed || !color || !description || !photo) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const newId = animals.length > 0 ? Math.max(...animals.map((a) => a.id)) + 1 : 1;
  const newAnimal = { id: newId, name, age, species, breed, color, description, photo };
  animals.push(newAnimal);
  res.status(201).json(newAnimal);
});


app.patch('/animals/:id', (req, res) => {
  const animalId = parseInt(req.params.id);
  const animal = animals.find((a) => a.id === animalId);

  if (!animal) {
    return res.status(404).json({ error: "Animal not found." });
  }

  const allowedUpdates = ['name', 'age', 'species', 'breed', 'color', 'description', 'photo'];
  Object.keys(req.body).forEach((key) => {
    if (allowedUpdates.includes(key)) {
      animal[key] = req.body[key];
    }
  });

  res.json(animal);
});

app.delete('/animals/:id', (req, res) => {
  const animalId = parseInt(req.params.id);
  const index = animals.findIndex((a) => a.id === animalId);

  if (index === -1) {
    return res.status(404).json({ error: "Animal not found." });
  }

  const [removedAnimal] = animals.splice(index, 1);
  res.json(removedAnimal);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server running on port ${PORT}');
});

export default app;