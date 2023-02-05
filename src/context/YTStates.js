import ytContext from "./ytContext";
import {useState} from "react";

const YTStates = (props) => {
	const [darkMode, setDarkMode] = useState(true);
	const [menuState, setMenuState] = useState(true);
	const [query, setQuery] = useState('');
	const [videoID, setVideoID] = useState('');
	const [ytVideos, setYtVideos] = useState([])
	const [userVideo, setUserVideo] = useState([])
	const [pageInfo, setPageInfo] = useState([])
	const [comments, setComments] = useState([])


	const API1 = 'AIzaSyBv7Ox-8bFX1sDtqfprHOmfOhvqJMuvicE'
	const API2 = 'AIzaSyDJMKG0ydBUCx9HFoko_3cnhhKNqFB0M1I'
	const URL = `https://www.googleapis.com/youtube/v3/search?key=${API1}&type=videos&part=snippet&maxResults=100&q=`

	// Short Links
	const shortLinks = [
		'ALL',
		'Trending',
		'Music',
		'Gaming',
		'Freestyle Rap',
		'PUBG Mobile',
		'BGMI',
		'Football',
		'AI',
		'Movies',
		'Fashion & Beauty',
		'News',

	]

	const convertDate = (dateString) => {
			let date = new Date(dateString);
			let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			let monthIndex = date.getMonth();
			let year = date.getFullYear();
			let day = date.getDate();

			return `${months[monthIndex]} ${day}, ${year}`;
	}

	const fetchVideos = (query) => {
		fetch(URL + query)
			.then(response => response.json())
			.then(data => {
				setYtVideos(data.items)
			})
			.catch(error => console.error(error));
	}

	const fetchVideoById = (videoId) => {
		const watchVideoUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API1}&part=snippet,statistics&fields=items(id,snippet,statistics)`
		fetch(watchVideoUrl)
			.then(response => response.json())
			.then(data => {
				setUserVideo(data.items)
			})
			.catch(error => console.error(error));
	}

	const fetchUserComments = (videoId) => {
		const watchVideoUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API1}&maxResults=100`
		fetch(watchVideoUrl)
			.then(response => response.json())
			.then(data => {
				setComments(data?.items)
				setPageInfo(data?.pageInfo)
			})
			.catch(error => console.error(error));
	}



	//  Random Number
	function randomNum(min, max) {
		const n = [];
		for (let i = 0; i < 3; i++) {
			n.push(Math.floor(Math.random() * max) + min);
		}
		return n;
	}


	return (
		<ytContext.Provider
			value={{
				setDarkMode,
				darkMode,
				menuState,
				setMenuState,
				ytVideos,
				fetchVideos,
				randomNum,
				setQuery,
				query,
				shortLinks,
				userVideo,
				comments,
				fetchVideoById,
				fetchUserComments,
				setVideoID,
				videoID,
				convertDate,
				pageInfo
			}}>
			{props.children}
		</ytContext.Provider>
	)
}
export default YTStates;
