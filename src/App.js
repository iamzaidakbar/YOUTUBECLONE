import './App.scss';
import Navbar from "./Components/Navbar/Navbar";
import {useContext} from "react";
import ytContext from "./context/ytContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SideMenu from "./Components/Side Menu/SideMenu";
import Home from "./Components/Home/Home";
import WatchVideo from "./Components/Watch Video/WatchVideo";
import Shorts from "./Components/Shorts/Shorts";
import Channel from "./Components/Channel/Channel";
import History from "./Components/History/History";

function App() {
	const context = useContext(ytContext);
	const {darkMode} = context

	return (<div className={"App " + (darkMode && "dark")}>
			<BrowserRouter>
				<Navbar/>
				<SideMenu/>
				<Routes>
					<Route exact path="/" element={<Home/>}/>
					<Route exact path="/shorts" element={<Shorts/>}/>
					<Route exact path={"/watch/:id"} element={<WatchVideo/>}/>
					<Route exact path={"/channel/:id"} element={<Channel/>}/>
					<Route exact path={"/history"} element={<History/>}/>
				</Routes>
			</BrowserRouter>
		</div>

	);
}

export default App;
