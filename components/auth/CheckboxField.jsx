import styles from "./CheckboxField.module.css";

const CheckboxField = ({
  id,
  name,
  checked,
  onChange,
  label,
  disabled = false,
  className = "",
}) => {
  return (
    <div className={`${styles.checkboxGroup} ${className}`}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className={styles.checkbox}
        disabled={disabled}
      />
      <label htmlFor={id} className={styles.checkboxLabel}>
        {label}
      </label>
    </div>
  );
};

export default CheckboxField;
