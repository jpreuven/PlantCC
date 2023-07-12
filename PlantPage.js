import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [edit, setEdit] = useState(false);
  const [plantToEdit, setPlantToEdit] = useState({});

  useEffect(() => {
    let url = "http://localhost:6001/plants";
    if (search) {
      url += `?q=${search}`;
    }
    fetch(url)
      .then((r) => r.json())
      .then((data) => setData(data));
  }, [search]);

  function handleSubmit(plant) {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plant),
    })
      .then((r) => r.json())
      .then((newPlant) => {
        if (newPlant.name.includes(search)) {
          setData([...data, newPlant]);
        }
      });
  }

  function handleDelete(id) {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    });
    const newData = data.filter((plant) => {
      return plant.id !== id;
    });
    setData(newData);
  }

  function handleEdit(e) {
    setPlantToEdit(e);
  }

  function toUpdate(plant) {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plant),
    });

    const newData = data.map((p) => {
      if (p.id === plant.id) {
        return plant;
      } else {
        return p;
      }
    });

    if (plant.name.includes(search)) {
      setData(newData);
    } else {
      const newerData = newData.filter((p) => {
        if (p.id === plant.id) {
          return false;
        } else {
          return true;
        }
      });
      setData(newerData);
    }
  }

  return (
    <main>
      <NewPlantForm
        handleSubmit={handleSubmit}
        edit={edit}
        setEdit={setEdit}
        plantToEdit={plantToEdit}
        setPlantToEdit={setPlantToEdit}
        toUpdate={toUpdate}
      />
      <Search search={search} setSearch={setSearch} />
      <PlantList
        data={data}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        edit={edit}
        setEdit={setEdit}
        plantToEdit={plantToEdit}
        setPlantToEdit={setPlantToEdit}
      />
    </main>
  );
}

export default PlantPage;
