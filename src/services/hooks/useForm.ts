import { useState } from "react";
import PropTypes from "prop-types";

export function useForm (inputValue: any) {
  const [ values, setValues ] = useState(inputValue);

  const handleChange = (evt: any) => {
    const { value, name } = evt.target;
    setValues({...values, [name]: value});
  };
  return { values, handleChange, setValues};
}

useForm.propTypes = {
  inputValue: PropTypes.object.isRequired,
}