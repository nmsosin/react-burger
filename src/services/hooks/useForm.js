import { useState } from "react";
import PropTypes from "prop-types";

export function useForm (inputValue) {
  const [ values, setValues ] = useState(inputValue);

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setValues({...values, [name]: value});
  };
  return { values, handleChange, setValues};
}

useForm.propTypes = {
  inputValue: PropTypes.object.isRequired,
}