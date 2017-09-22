import React from "react";
import PropTypes from "prop-types";

export const FormErrors = ({ formErrors }) => (
  <div className="error-message">
    {Object.keys(formErrors).map(formErrorField => {
      return formErrors[formErrorField].map(error => {
        return (
          <li className="error-message__detail">
            {formErrorField} {error}
          </li>
        );
      });
    })}
  </div>
);

FormErrors.propTypes = {
  formErrors: PropTypes.object.isRequired
};
