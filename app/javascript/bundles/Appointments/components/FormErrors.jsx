import React from "react";
import PropTypes from "prop-types";
import "../stylesheet/formErrors";

export const FormErrors = ({ formErrors }) => (
  <div className="error-message">
    {Object.keys(formErrors).map(formErrorField => {
      return formErrors[formErrorField].map(error => {
        return (
          <div className="error-message__detail">
            {formErrorField} {error}
          </div>
        );
      });
    })}
  </div>
);

FormErrors.propTypes = {
  formErrors: PropTypes.object.isRequired
};
