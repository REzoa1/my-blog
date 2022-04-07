import "./FormControl.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const FormControl = ({
  className,
  type = "text",
  placeholder,
  inputProps,
  icon,
  icon_eye,
  onClick,
}) => {
  const {isEmpty, formControlProps } = inputProps;
  return (
    <div className="login_password">
      <div className="login_placeholder">{placeholder}</div>
      <FontAwesomeIcon icon={icon} color="#ccc" />
      <input className={className} type={type} {...formControlProps} />
      {isEmpty && <p className="error">Заполните поле</p>}
      <span className="login_content login_input-border"></span>
      {icon_eye && (
        <button className="login_eye" onClick={onClick}>
          <FontAwesomeIcon icon={icon_eye} />
        </button>
      )}
    </div>
  );
};
