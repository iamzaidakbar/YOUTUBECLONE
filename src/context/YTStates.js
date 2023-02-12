import ytContext from "./ytContext";
import {useState} from "react";

const YTStates = (props) => {
	const [darkMode, setDarkMode] = useState(false);
	const [menuState, setMenuState] = useState(true);
	const [isSubscribed, setIsSubscribed] = useState(true);
	const [query, setQuery] = useState('');
	const [videoID, setVideoID] = useState('');
	const [reels, setReels] = useState([])
	const [comments, setComments] = useState([])
	const [ytVideos, setYtVideos] = useState([])
	const [userVideo, setUserVideo] = useState([])
	const [videoId, setVideoId] = useState('');

	const API1 = 'AIzaSyC3H1D1UYff8f9GKXw3tO9kvCnM-JYPIEo'


	// Url for videos and reels
	const VIDEOS_URL1 = `https://www.googleapis.com/youtube/v3/search?key=${API1}&type=videos&part=snippet&order=date&maxResults=100&q=`
	const REELS_URL2 = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=trendingmemes&order=date&type=reel&key=${API1}&maxResults=5`

	// Short Links
	const shortLinks = ['ALL', 'Trending', 'Music', 'Gaming', 'Freestyle Rap', 'PUBG Mobile', 'BGMI', 'Football', 'AI', 'Movies', 'Fashion & Beauty', 'News',]

	const fetchVideos = (query) => {
		const videos = fetch(VIDEOS_URL1 + query).then(res => res.json())
		const reels = fetch(REELS_URL2).then(res => res.json())

		Promise.all([videos, reels]).then(values => {
			setYtVideos(values[0].items)
			setReels(values[1].items)
		})
	}

	const fetchUserVideoAndComments = (id) => {
		const WATCHVIDEO_URL = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${API1}&part=snippet,statistics&fields=items(id,snippet,statistics)`
		const COMMENTS_URL = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${id}&key=${API1}&maxResults=100`
		const video = fetch(WATCHVIDEO_URL).then(res => res.json())
		const comments = fetch(COMMENTS_URL).then(res => res.json())

		Promise.all([video, comments]).then(values => {
			setUserVideo(values[0].items[0])
			setComments(values[1].items)
		})
	}


	const convertDate = (dateString) => {
		let date = new Date(dateString);
		let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		let monthIndex = date.getMonth();
		let year = date.getFullYear();
		let day = date.getDate();

		return `${months[monthIndex]} ${day}, ${year}`;
	}


	//  Random Number
	function randomNum(min, max) {
		const n = [];
		for (let i = 0; i < 3; i++) {
			n.push(Math.floor(Math.random() * max) + min);
		}
		return n;
	}

	// Reloads
	function reload() {
		window.location.reload(true)
	}


	return (<ytContext.Provider
		value={{
			fetchUserVideoAndComments,
			setIsSubscribed,
			isSubscribed,
			setMenuState,
			convertDate,
			fetchVideos,
			setDarkMode,
			setVideoId,
			shortLinks,
			setVideoID,
			menuState,
			userVideo,
			randomNum,
			darkMode,
			setQuery,
			ytVideos,
			comments,
			setReels,
			videoID,
			videoId,
			reload,
			reels,
			query,
			API1
		}}>
		{props.children}
	</ytContext.Provider>)
}
export default YTStates;
