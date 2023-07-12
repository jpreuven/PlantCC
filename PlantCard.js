import React, { useState } from "react";

function PlantCard({
  id,
  name,
  price,
  image,
  handleEdit,
  handleDelete,
  edit,
  setEdit,
  // plantToEdit,
  setPlantToEdit,
}) {
  const [clicked, setClicked] = useState(true);

  function handleClick() {
    setClicked(!clicked);
  }

  function deleteButton() {
    handleDelete(id);
  }

  function editButton() {
    setEdit(!edit);
    handleEdit({
      name: name,
      image: image,
      price: price,
      id: id,
    });
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {clicked ? (
        <button onClick={handleClick} className="primary">
          In Stock
        </button>
      ) : (
        <button onClick={handleClick}>Out of Stock</button>
      )}
      <button onClick={deleteButton}>🗑</button>
      <button onClick={editButton}>✎</button>
    </li>
  );
}

export default PlantCard;
