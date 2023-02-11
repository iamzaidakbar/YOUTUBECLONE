import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import YTStates from "./context/YTStates";
import store from "./store";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<YTStates>
				<App store={store}/>
			</YTStates>
		</Provider>

	</React.StrictMode>
);

reportWebVitals();
