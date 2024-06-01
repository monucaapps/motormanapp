import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FilterForm.css';

function FilterForm({ onSubmit, clearPartsList, vehicles }) {
  const [año, setAño] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [litros, setLitros] = useState('');

  const [añosDisponibles, setAñosDisponibles] = useState([]);
  const [marcasDisponibles, setMarcasDisponibles] = useState([]);
  const [modelosDisponibles, setModelosDisponibles] = useState([]);
  const [litrosDisponibles, setLitrosDisponibles] = useState([]);

  const marcaSelectRef = useRef(null);
  const modeloSelectRef = useRef(null);
  const litrosSelectRef = useRef(null);

  useEffect(() => {
    if (año) {
      const marcas = vehicles
        .filter(vehicle => vehicle.año === parseInt(año))
        .map(vehicle => vehicle.marca);
      setMarcasDisponibles([...new Set(marcas)]);
      setTimeout(() => {
        if (marcaSelectRef.current) {
          marcaSelectRef.current.focus();
          marcaSelectRef.current.click();
        }
      }, 100);
    } else {
      setMarcasDisponibles([]);
    }
    setMarca('');
    setModelo('');
    setLitros('');
    setModelosDisponibles([]);
    setLitrosDisponibles([]);
    clearPartsList();
  }, [año, vehicles]);

  useEffect(() => {
    if (marca) {
      const modelos = vehicles
        .filter(vehicle => vehicle.año === parseInt(año) && vehicle.marca === marca)
        .map(vehicle => vehicle.modelo);
      setModelosDisponibles([...new Set(modelos)]);
      setTimeout(() => {
        if (modeloSelectRef.current) {
          modeloSelectRef.current.focus();
          modeloSelectRef.current.click();
        }
      }, 100);
    } else {
      setModelosDisponibles([]);
    }
    setModelo('');
    setLitros('');
    setLitrosDisponibles([]);
    clearPartsList();
  }, [marca]);

  useEffect(() => {
    if (modelo) {
      const litros = vehicles
        .filter(vehicle => vehicle.año === parseInt(año) && vehicle.marca === marca && vehicle.modelo === modelo)
        .map(vehicle => vehicle.litros);
      setLitrosDisponibles([...new Set(litros)]);
      setTimeout(() => {
        if (litrosSelectRef.current) {
          litrosSelectRef.current.focus();
          litrosSelectRef.current.click();
        }
      }, 100);
    } else {
      setLitrosDisponibles([]);
    }
    setLitros('');
    clearPartsList();
  }, [modelo]);

  useEffect(() => {
    if (litros) {
      onSubmit({ año, marca, modelo, litros });
    }
  }, [litros]);

  return (
    <form className="filter-form row g-3" onSubmit={(e) => e.preventDefault()}>
      <div className="filter-group col-12 col-md-3">
        <label htmlFor="año" className="form-label">Year</label>
        <select
          id="año"
          className="form-select"
          value={año}
          onChange={(e) => setAño(e.target.value)}
        >
          <option value="">Year</option>
          {[...new Set(vehicles.map(vehicle => vehicle.año))].map((año, index) => (
            <option key={index} value={año}>{año}</option>
          ))}
        </select>
      </div>
      <div className="filter-group col-12 col-md-3">
        <label htmlFor="marca" className="form-label">Make</label>
        <select
          id="marca"
          className="form-select"
          ref={marcaSelectRef}
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          disabled={!año}
        >
          <option value="">Make</option>
          {marcasDisponibles.map((marca, index) => (
            <option key={index} value={marca}>{marca}</option>
          ))}
        </select>
      </div>
      <div className="filter-group col-12 col-md-3">
        <label htmlFor="modelo" className="form-label">Model</label>
        <select
          id="modelo"
          className="form-select"
          ref={modeloSelectRef}
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          disabled={!marca}
        >
          <option value="">Model</option>
          {modelosDisponibles.map((modelo, index) => (
            <option key={index} value={modelo}>{modelo}</option>
          ))}
        </select>
      </div>
      <div className="filter-group col-12 col-md-3">
        <label htmlFor="litros" className="form-label">Engine Liters</label>
        <select
          id="litros"
          className="form-select"
          ref={litrosSelectRef}
          value={litros}
          onChange={(e) => setLitros(e.target.value)}
          disabled={!modelo}
        >
          <option value="">Engine Liters</option>
          {litrosDisponibles.map((litro, index) => (
            <option key={index} value={litro}>{litro}</option>
          ))}
        </select>
      </div>
    </form>
  );
}

export default FilterForm;
