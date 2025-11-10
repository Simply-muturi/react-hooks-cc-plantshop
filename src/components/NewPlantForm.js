import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: ""
  });

  const change = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submit = (e) => {
    e.preventDefault();
    
    const newPlant = {
      name: formData.name,
      image: formData.image,
      price: formData.price
    };

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON"
      },
      body: JSON.stringify(newPlant)
    })
      .then(response => response.json())
      .then(data => {
        onAddPlant(data);
        setFormData({ name: "", image: "", price: "" });
        
      });
  };  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={submit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Plant name" 
          value={formData.name}
          onChange={change}
        />
        <input 
          type="text" 
          name="image" 
          placeholder="Image URL" 
          value={formData.image}
          onChange={change}
        />
        <input 
          type="number" 
          name="price" 
          step="0.01" 
          placeholder="Price" 
          value={formData.price}
          onChange={change}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
