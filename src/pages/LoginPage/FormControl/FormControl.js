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
  const { isWrong, formControlProps } = inputProps;
  return (
    <div className="login_password">
      <div className="login_placeholder">{placeholder}</div>
      <FontAwesomeIcon icon={icon} color="#ccc" />
      <input className={className} value={localStorage.getItem("LoginValue")} type={type} {...formControlProps} />
      {isWrong ? (
        <>
          <p className="error">{isWrong.slice(0, 40)}</p>
          <span className="login_content login_input-border--red"></span>
        </>
      ) : (
        <span className="login_content login_input-border"></span>
      )}

      {icon_eye && (
        <button className="login_eye" onClick={onClick}>
          <FontAwesomeIcon icon={icon_eye} />
        </button>
      )}
    </div>
  );
};
