import React from 'react';

export default ({name, value, error, touched, ...resto}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}:</label>
      <input id={name} className={"form-control ".concat(touched?(error?"is-invalid":"is-valid"):"")}
        name={name} defaultValue={value} {...resto}/>
      {error?<div className="invalid-feedback">{error}</div>:null}
    </div>
  );
}