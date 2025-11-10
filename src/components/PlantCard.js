import React, { useState } from "react";

function PlantCard({ plant, onDeletePlant, onUpdatePrice }) {
  const [inStock, setInStock] = useState(true);
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [newPrice, setNewPrice] = useState(plant.price);

  const handleToggleStock = () => {
    setInStock(!inStock);
  };

  const Delete = () => {
    onDeletePlant(plant.id);
  };

  const PriceUpdate = () => {
    onUpdatePrice(plant.id, parseFloat(newPrice));
    setIsEditingPrice(false);
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      {isEditingPrice ? (
        <div>
          <input 
            type="number" 
            step="0.01"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <button onClick={PriceUpdate}>Save</button>
          <button onClick={() => setIsEditingPrice(false)}>Cancel</button>
        </div>
      ) : (
        <p>
          Price: ${plant.price}
          <button onClick={() => setIsEditingPrice(true)} style={{ marginLeft: '10px' }}>
            Edit Price
          </button>
        </p>
      )}
      {inStock ? (
        <button className="primary" onClick={handleToggleStock}>In Stock</button>
      ) : (
        <button onClick={handleToggleStock}>Out of Stock</button>
      )}
      <button onClick={Delete} style={{ marginTop: '10px', backgroundColor: '#dc3545', color: 'white' }}>
        Delete Plant
      </button>
    </li>
  );
}

export default PlantCard;
