"use client";

import React, { useState, useEffect } from 'react';

const EditableField = ({ value, onChange, type = "text", className = "" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleBlur = () => {
    setIsEditing(false);
    onChange(type === "number" ? Number(currentValue) : currentValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  return isEditing ? (
    <input
      type={type}
      value={currentValue}
      onChange={(e) => setCurrentValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      autoFocus
      className={`w-full p-1 border border-blue-400 rounded ${className}`}
    />
  ) : (
    <div 
      onClick={() => setIsEditing(true)} 
      className={`cursor-pointer hover:bg-blue-50 p-1 rounded ${className}`}
    >
      {type === "number" ? Number(value).toLocaleString() : value}
    </div>
  );
};

export default EditableField;