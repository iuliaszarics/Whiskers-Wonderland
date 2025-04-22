import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home.js";
import FilteredAnimals from "./pages/FilteredAnimals.js";
import AnimalDetail from "./pages/AnimalDetail.js";
import Contact from "./pages/Contact.js";
import AddAnimal from "./pages/AddAnimal.js";
import Statistics from "./pages/Statistics.js";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [animals, setAnimals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Number of animals to display per page

  // Fetch animals data (use your API or mock data here)
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get("http://localhost:5000/animals");
        setAnimals(response.data);
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    };
    fetchAnimals();
  }, []);

  const totalAnimals = animals.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAnimals = animals.slice(indexOfFirstItem, indexOfLastItem);

  // Handle next page
  const nextPage = () => {
    if (indexOfLastItem < totalAnimals) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  // Handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <Router>
      <div className="flex h-screen">
        <nav className="w-1/4 p-4 bg-gray-100 h-screen flex flex-col justify-center items-center space-y-4 fixed left-0 top-0">
          <input
            type="text"
            placeholder="Search animals..."
            className="p-2 rounded border mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link to="/" className="bg-gray-500 text-black text-center p-2 rounded w-full">Home</Link>
          <Link to="/filter/dog" className="bg-gray-500 text-black text-center p-2 rounded w-full">Dogs</Link>
          <Link to="/filter/cat" className="bg-gray-500 text-black text-center p-2 rounded w-full">Cats</Link>
          <Link to="/filter/other" className="bg-gray-500 text-black text-center p-2 rounded w-full">Others</Link>
          <Link to="/add" className="block mt-4 bg-gray-500 text-white p-2 rounded text-center w-full">Put Animal for Adoption</Link>
          <Link to="/contact" className="bg-gray-500 text-black text-center p-2 rounded w-full">Contact</Link>
          <Link to="/statistics" className="bg-gray-500 text-black text-center p-2 rounded w-full">Statistics</Link>
        </nav>

        <div className="w-3/4 p-4 ml-[25%]">
          <Routes>
            <Route path="/" element={<Home searchTerm={searchTerm} animals={currentAnimals} />} />
            <Route path="/filter/:type" element={<FilteredAnimals searchTerm={searchTerm} animals={currentAnimals} />} />

            <Route path="/animal/:id" element={<AnimalDetail animals={animals} setAnimals={setAnimals} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/add" element={<AddAnimal />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button         
              onClick={prevPage}
              disabled={currentPage === 1}
              className="p-2 bg-gray-500 text-white rounded mr-2"
            >
              Previous
            </button>
            <span className="p-2">Page {currentPage}</span>
            <button
              onClick={nextPage}
              disabled={indexOfLastItem >= totalAnimals}
              className="p-2 bg-gray-500 text-white rounded ml-2"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App; 