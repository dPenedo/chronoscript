import React from 'react';
import styles from '../pages/worldTimes.module.css';

type CitySelectorFormProps = {
    listOfCities: string[];
    onCitySelect: (city: string) => void;
    onToggleAccordion: () => void;
};

const CitySelectorForm: React.FC<CitySelectorFormProps> = ({
    listOfCities,
    onCitySelect,
    onToggleAccordion,
}) => {
    return (
        <form className={styles.cities__form} method="get">
            <select
                className={styles.cities__select}
                name="cities"
                id="cities"
                onChange={(e) => {
                    onCitySelect(e.target.value);
                    onToggleAccordion();
                }}
                size={8}
            >
                {listOfCities.map((city: string) => (
                    <option
                        className={styles.cities__option}
                        key={city}
                        value={city}
                    >
                        {city}
                    </option>
                ))}
            </select>
        </form>
    );
};

export default CitySelectorForm;
