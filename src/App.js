import './App.scss';
import Navbar from "./Components/Navbar/Navbar";
import {useContext} from "react";
import ytContext from "./context/ytContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SideMenu from "./Components/Side Menu/SideMenu";
import Home from "./Components/Home/Home";
import WatchVideo from "./Components/Watch Video/WatchVideo";
import Shorts from "./Components/Shorts/Shorts";

function App() {
	const context = useContext(ytContext);
	const {darkMode, videoID} = context

	return (<div className={"App " + (darkMode && "dark")}>
			<BrowserRouter>
				<Navbar/>
				<SideMenu/>
				<Routes>
					<Route exact path="/" element={<Home/>}/>
					<Route exact path="/shorts" element={<Shorts/>}/>
					<Route exact path={"/watch/" + videoID} element={<WatchVideo/>}/>
				</Routes>
			</BrowserRouter>
		</div>

	);
}

export default App;
