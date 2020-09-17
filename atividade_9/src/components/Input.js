import React from 'react';

export default ({lblName, inputRef, ...resto}) => {
  return (
    <div className="form-group">
      <label htmlFor={lblName}>{lblName}:</label>
      <input id={lblName} className="form-control" name={lblName} required={true}
        defaultValue={inputRef.current.value}
        ref={inputRef} {...resto}/>
    </div>
  );
}