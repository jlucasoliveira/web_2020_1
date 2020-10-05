import React from 'react';

export default ({name, formik, ...resto}) => {
  const {errors, touched, values, handleBlur, handleChange} = formik;
  return (
    <div className="form-group">
      <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}:</label>
      <input id={name} className={"form-control ".concat(touched[name]?(errors[name]?"is-invalid":"is-valid"):"")}
        name={name} defaultValue={values[name]} onChange={handleChange} onBlur={handleBlur} {...resto}/>
      {errors[name]?<div className="invalid-feedback">{errors[name]}</div>:null}
    </div>
  );
}