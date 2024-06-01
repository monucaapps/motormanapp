import React, { useState, useEffect } from 'react';
import './PartsList.css';

function PartsList({ filteredParts }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' o 'list'

  useEffect(() => {
    setSelectedCategory(null); // Limpiar la categoría seleccionada cuando cambian los filteredParts
  }, [filteredParts]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const renderPart = (part) => (
    <div className={`part-item ${viewMode}`} key={part.codigo}>
      <div><strong>Marca:</strong> {part.marca}</div>
      <div><strong>Descripción:</strong> {part.descripcion}</div>
      <div><strong>Código:</strong> {part.codigo}</div>
      <div><strong>Precio:</strong> ${part.precio}</div>
      <div><strong>Proveedor:</strong> {part.proveedor}</div>
      <div><strong>SKU:</strong> {part.SKU}</div>
      <div><strong>Código de Barras:</strong> {part.codigoBarras}</div>
    </div>
  );

  return (
    <div className="parts-container">
      <div className="categories">
        <h3>Categorías</h3>
        <ul>
          {filteredParts.map(category => (
            <li key={category.nombre} onClick={() => handleCategoryClick(category)}>
              {category.nombre} ({category.partes.length})
            </li>
          ))}
        </ul>
      </div>
      <div className="parts">
        <div className="view-modes">
          <button onClick={() => setViewMode('grid')}>Cuadrícula</button>
          <button onClick={() => setViewMode('list')}>Renglón</button>
        </div>
        {selectedCategory ? (
          <div>
            <h3>Autopartes en {selectedCategory.nombre}</h3>
            <div className={`parts-list ${viewMode}`}>
              {selectedCategory.partes.map(renderPart)}
            </div>
          </div>
        ) : (
          <p>Seleccione una categoría para ver las autopartes.</p>
        )}
      </div>
    </div>
  );
}

export default PartsList;
