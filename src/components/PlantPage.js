import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then(response => response.json())
      .then(data => setPlants(data));
  }, []);

  const addPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  const deletePlant = (id) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setPlants(plants.filter(plant => plant.id !== id));
      });
  };

  const updatePrice = (id, newPrice) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ price: newPrice })
    })
      .then(response => response.json())
      .then(updatedPlant => {
        setPlants(plants.map(plant => 
          plant.id === id ? updatedPlant : plant
        ));
      });
  };

  const filteredPlants = plants.filter(plant => 
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={addPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList 
        plants={filteredPlants} 
        onDeletePlant={deletePlant}
        onUpdatePrice={updatePrice}
      />
    </main>
  );
}

export default PlantPage;
