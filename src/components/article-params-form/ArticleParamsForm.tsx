import React, { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import {
	OptionType,
	fontSizeOptions,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { Text } from '../text';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

export const ArticleParamsForm = ({
	onChange,
}: {
	onChange: (newState: any) => void;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);
	const [formState, setFormState] = useState({
		fontFamily: 'Open Sans',
		fontSize: '18px',
		fontColor: '#000000',
		backgroundColor: '#ffffff',
		contentWidth: '1394px',
	});

	const toggleForm = () => {
		setIsOpen((prevState) => !prevState);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (formRef.current && !formRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleInputChange = (selected: OptionType | string, name: string) => {
		const newFormState = {
			...formState,
			[name]: typeof selected === 'string' ? selected : selected.value,
		};
		setFormState(newFormState);
		onChange(newFormState); // Применение изменений сразу после выбора параметра
	};

	const handleApply = () => {
		onChange(formState);
	};

	return (
		<>
			<ArrowButton onClick={toggleForm} />
			<aside
				ref={formRef}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form}>
					<Text size={31} weight={800} uppercase>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>
					<div className={styles.textBlock}>
						<div className={styles.inputGroup}>
							<Select
								options={fontFamilyOptions}
								selected={
									fontFamilyOptions.find(
										(option) => option.value === formState.fontFamily
									) || fontFamilyOptions[0]
								} // Значение по умолчанию
								onChange={(option) => handleInputChange(option, 'fontFamily')}
								title='шрифт'
							/>
						</div>
						<div className={styles.selectSize}>
							<RadioGroup
								name='fontSize'
								options={fontSizeOptions}
								selected={
									fontSizeOptions.find(
										(option) => option.value === formState.fontSize
									) || fontSizeOptions[0]
								} // Значение по умолчанию
								onChange={(option) => handleInputChange(option, 'fontSize')}
								title='размер шрифта'
							/>
						</div>

						<div className={styles.inputGroup}>
							<Select
								options={fontColors}
								selected={
									fontColors.find(
										(option) => option.value === formState.fontColor
									) || fontColors[0]
								} // Значение по умолчанию
								onChange={(option) => handleInputChange(option, 'fontColor')}
								title='цвет шрифта'
							/>
						</div>
					</div>
					<Separator></Separator>
					<div className={styles.backgroundBlock}>
						<div className={styles.inputGroup}>
							<Select
								options={backgroundColors}
								selected={
									backgroundColors.find(
										(option) => option.value === formState.backgroundColor
									) || backgroundColors[0]
								} // Значение по умолчанию
								onChange={(option) =>
									handleInputChange(option, 'backgroundColor')
								}
								title='цвет фона'
							/>
						</div>

						<div className={styles.inputGroup}>
							<Select
								options={contentWidthArr}
								selected={
									contentWidthArr.find(
										(option) => option.value === formState.contentWidth
									) || contentWidthArr[0]
								} // Значение по умолчанию
								onChange={(option) => handleInputChange(option, 'contentWidth')}
								title='ширина контента'
							/>
						</div>
					</div>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={() => {
								const defaultState = {
									fontFamily: 'Open Sans',
									fontSize: '18px',
									fontColor: '#000000',
									backgroundColor: '#ffffff',
									contentWidth: '100%',
								};
								setFormState(defaultState);
								onChange(defaultState);
							}}
						/>
						<Button title='Применить' type='button' onClick={handleApply} />
					</div>
				</form>
			</aside>
		</>
	);
};
