import React, { useEffect, useRef } from 'react';
import styles from './bodydropdown.css';
import { MenuItemsList } from '../../Content/PostsList/Menu/MenuItemsList';
import { Text } from '../../Text';
import { EColor } from '../../Text';

interface IBodyDropdown {
  onClose?: () => void;
}

export function BodyDropdown({onClose}: IBodyDropdown) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) {
        onClose?.();
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, []);

  return (
    <div className={styles.dropdown} ref={ref}>
      <MenuItemsList postId='test'/>
      <button className={styles.closeButton}>
        <Text mobileSize={12} size={14} color={EColor.grey66}>
          Закрыть
        </Text>
      </button>
    </div>
  );
}
