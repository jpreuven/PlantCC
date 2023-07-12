import React, { useState } from "react";

const formInit = {
  name: "",
  image: "",
  price: "",
};

function NewPlantForm({
  handleSubmit,
  edit,
  setEdit,
  plantToEdit,
  setPlantToEdit,
  toUpdate,
}) {
  const [formData, setFormData] = useState(formInit);

  function handleFormChange(e) {
    if (edit) {
      const { name, value } = e.target;

      setPlantToEdit({
        ...plantToEdit,
        [name]: value,
      });
    } else {
      const { name, value } = e.target;

      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    handleSubmit(formData);
  }

  function onUpdate(e) {
    e.preventDefault();
    toUpdate(plantToEdit);
    setEdit(!edit);
  }

  return (
    <div className="new-plant-form">
      <h2>{edit ? "Update Plant" : "New Plant"}</h2>
      <form onSubmit={edit ? onUpdate : onSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={edit ? plantToEdit.name : formData.name}
          onChange={handleFormChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={edit ? plantToEdit.image : formData.image}
          onChange={handleFormChange}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={edit ? plantToEdit.price : formData.price}
          onChange={handleFormChange}
        />
        <button type="submit">{edit ? "Update Plant" : "Add Plant"}</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
