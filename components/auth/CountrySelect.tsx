import countries from "@/public/data/country.json";
import styles from "./CountrySelect.module.css";

function CountrySelect({
  onChange,
}: {
  onChange: (countryName: string, countryCode: string) => void;
}) {
  return (
    <div className={styles.formGroup}>
      <label className={styles.label}>
        <span className={styles.required}>*</span>الدولة
      </label>
      <select
        className={styles.select}
        name="country"
        id="country"
        onChange={(e) => {
          const selectedName = e.target.selectedOptions[0].text;
          onChange(selectedName, e.target.value);
        }}
      >
        {Object.entries(countries).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountrySelect;
