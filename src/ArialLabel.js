import React from "react";
import PropTypes from "prop-types";

function AriaLabel({ text, onChange }) {
  return (
    <input
      type="text"
      value={text}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Aria Label"
    />
  );
}

AriaLabel.propTypes = {
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AriaLabel;
