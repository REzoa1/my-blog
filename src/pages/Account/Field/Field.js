import { Typography } from "antd";
import Input from "antd/lib/input/Input";
import React from "react";

export const Field = ({ isEdit, required=false, title, fieldName, onChange, value, type="text", maxLength }) => {
  return (
    <div className="account__item">
      <h1 className="account__subtitle">{title}:</h1>
      {!isEdit ? (
        <Typography>
          <pre className="account__field">{fieldName}</pre>
        </Typography>
      ) : (
        <div>
          <Input
            type={type}
            required={required}
            value={value}
            className="account__field"
            onChange={onChange}
            maxLength={maxLength}
          />
        </div>
      )}
    </div>
  );
};
