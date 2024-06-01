import React, { useState } from 'react';
import FilterForm from './components/FilterForm';
import PartsList from './components/PartsList';
import './App.css';

function App() {
  const [filteredParts, setFilteredParts] = useState([]);

  const allVehicles = [
    // ... datos de vehículos ...
  ];

  const handleFilterSubmit = (filters) => {
    const parts = getFilteredParts(filters);
    setFilteredParts(parts);
  };

  const clearFilteredParts = () => {
    setFilteredParts([]);
  };

  const getFilteredParts = (filters) => {
    return allVehicles.filter(vehicle =>
      (!filters.año || vehicle.año === parseInt(filters.año)) &&
      (!filters.marca || vehicle.marca === filters.marca) &&
      (!filters.modelo || vehicle.modelo === filters.modelo) &&
      (!filters.litros || vehicle.litros === parseFloat(filters.litros))
    ).map(vehicle => vehicle.categorias).flat();
  };

  return (
    <div className="App">
      <h1>MotorMan Autopartes</h1>
      <FilterForm onSubmit={handleFilterSubmit} clearPartsList={clearFilteredParts} vehicles={allVehicles} />
      <PartsList filteredParts={filteredParts} />
    </div>
  );
}

export default App;
