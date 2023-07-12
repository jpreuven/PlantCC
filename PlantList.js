import React from "react";
import PlantCard from "./PlantCard";

function PlantList({
  data,
  handleDelete,
  handleEdit,
  edit,
  setEdit,
  plantToEdit,
  setPlantToEdit,
}) {
  const plantArr = data.map((plant) => {
    return (
      <PlantCard
        key={plant.id}
        id={plant.id}
        name={plant.name}
        image={plant.image}
        price={plant.price}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        edit={edit}
        setEdit={setEdit}
        plantToEdit={plantToEdit}
        setPlantToEdit={setPlantToEdit}
      />
    );
  });

  return <ul className="cards">{plantArr}</ul>;
}

export default PlantList;
