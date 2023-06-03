import React, {
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import styles from './index.module.css';

interface Props {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface InputReference {
  focus: () => void;
  blur: () => void;
}

export const SeacrhInput = forwardRef<InputReference, Props>(
  ({ onChange, value, onBlur, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      },
      blur: () => {
        if (inputRef.current) {
          inputRef.current.blur();
        }
      },
    }));

    return (
      <input
        onBlur={onBlur}
        ref={inputRef}
        className={styles.input}
        value={value}
        placeholder="Search..."
        onChange={onChange}
        {...props}
      />
    );
  },
);
