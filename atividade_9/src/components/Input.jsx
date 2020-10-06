import React from 'react';
import {useField} from 'formik';

export default ({name, ...resto}) => {
  const [action, meta] = useField(name);
  return (
    <div className="form-group">
      <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}:</label>
      <input id={name} className={"form-control".concat(meta.touched?(meta.error?" is-invalid":" is-valid"):"")}
        name={name} {...resto} {...action}/>
      {meta.error?<div className="invalid-feedback">{meta.error}</div>:null}
    </div>
  );
}