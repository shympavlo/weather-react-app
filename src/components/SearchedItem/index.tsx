import React from 'react';
import styles from './index.module.css';

interface Props {
  name: string;
  region: string;
  country: string;
  onSelect: () => void;
}

export const SearchedItem: React.FC<Props> = ({
  name,
  region,
  country,
  onSelect,
}) => {
  return (
    <div onClick={onSelect} className={styles.main}>
      <p>
        {name}, {region}, {country}
      </p>
    </div>
  );
};
