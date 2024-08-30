import { createRoot } from 'react-dom/client';
import React, { StrictMode, CSSProperties, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleState, setArticleState] = useState(() => {
		const savedState = localStorage.getItem('articleState');
		return savedState ? JSON.parse(savedState) : defaultArticleState;
	});

	const handleFormChange = (newState: any) => {
		setArticleState(newState);
		localStorage.setItem('articleState', JSON.stringify(newState));
	};

	useEffect(() => {
		// Применяем начальное состояние
		localStorage.setItem('articleState', JSON.stringify(articleState));
	}, []);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamily,
					'--font-size': articleState.fontSize,
					'--font-color': articleState.fontColor,
					'--container-width': articleState.contentWidth,
					'--bg-color': articleState.backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm onChange={handleFormChange} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
