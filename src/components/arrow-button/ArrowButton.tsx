import arrow from 'src/images/arrow.svg';
import React from 'react';

import styles from './ArrowButton.module.scss';

export type OnClick = () => void;

interface ArrowButtonProps {
	onClick?: OnClick; // Сделаем onClick необязательным
}

export const ArrowButton = ({ onClick }: ArrowButtonProps) => {
	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={styles.container}
			onClick={onClick} // Если onClick передан, он будет вызван
			onKeyDown={(e) => {
				if ((e.key === 'Enter' || e.key === ' ') && onClick) {
					e.preventDefault();
					onClick();
				}
			}}>
			<img src={arrow} alt='иконка стрелочки' className={styles.arrow} />
		</div>
	);
};
