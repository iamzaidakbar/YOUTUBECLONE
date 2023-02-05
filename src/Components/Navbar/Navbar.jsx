import './Navbar.scss'
import {FaYoutube} from 'react-icons/fa';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faMoon, faSearch, faSun} from "@fortawesome/free-solid-svg-icons";
import {useContext} from "react";
import ytContext from "../../context/ytContext";

export default function Navbar() {

	const context = useContext(ytContext);
	const {setDarkMode, darkMode, setMenuState, menuState, setQuery, fetchVideos, query} = context

	function handleChange(e) {
		setQuery(e.target.value)
	}

	function handleClick(e) {
		e.preventDefault()
		fetchVideos(query)
	}

	return (<div className={" navbar " + (darkMode && " dark ") + (menuState && " active ")}>

		<div className="left">
			<div onClick={() => {
				setMenuState(!menuState)
			}} className="hamburger">
				<span></span>
				<span></span>
				<span></span>
			</div>
			<div className="ytLogo">
				<FaYoutube size={35} className="yt" color={'red'}/>
				<div className="logo-text">YouTube</div>
			</div>
		</div>

		<div className="center">
			<div className="search-bar">
				<input onChange={handleChange} value={query} className="search-input" type="text" placeholder="Search"/>
				<FontAwesomeIcon onClick={handleClick} className="search-icon" icon={faSearch}/>
			</div>
		</div>
		<div className="right">
			<div><FontAwesomeIcon size={"xl"} color={darkMode ? 'white' : 'black'} icon={faBell}/></div>
			<div>
				<FontAwesomeIcon onClick={() => {
					setDarkMode(!darkMode)
				}} color={darkMode ? "white" : 'black'} size={"xl"} icon={darkMode ? faSun : faMoon}/> <FontAwesomeIcon
				icon="fa-thin fa-moon"/>
			</div>
		</div>
	</div>)
}