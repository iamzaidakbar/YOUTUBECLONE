import './WatchVideo.scss'
import YouTube from 'react-youtube';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {useContext,useState} from "react";
import ytContext from "../../context/ytContext";
import SideVideoBar from "../Side Video Bar/SideVideoBar";
import Comments from "../Comments/Comments";
import InfiniteScroll from "react-infinite-scroll-component";

export default function WatchVideo() {
	const [showMore, setShowMore] = useState(false);

	const context = useContext(ytContext);
	const {darkMode, menuState, userVideo, ytVideos, randomNum, convertDate, comments,fetchUserComments,setPageSize} = context

	const dateString = userVideo[0]?.snippet?.publishedAt
	const date = new Date(dateString)
	let dateNew = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`

	const opts = {
		height: '500', width: '900', playerVars: {
			autoplay: 1,
		},
	};

	return <div className={"WatchVideo " + (darkMode && "dark ") + (menuState && " active ")}>
		<div className="left-wrapper">
			<div className="video-player">
				{userVideo[0]?.id && <YouTube
					videoId={userVideo[0]?.id}
					opts={opts}
				/>}
			</div>
			<div className="video-title">
				<p>{userVideo[0]?.id && userVideo[0]?.snippet?.localized?.title}</p>
			</div>
			<div className="subscribersAndLikes">
				<div>
					<img style={{borderRadius:"50%"}} src={userVideo[0]?.id && userVideo[0]?.snippet?.thumbnails?.default?.url} width={50} height={50} alt=""/>
				</div>
				<div className="video-channel-name">
					<span><p className="name">{userVideo[0]?.id && userVideo[0]?.snippet[0]?.channelTitle}</p></span>
					<span><p className="subs">{randomNum(1,10)} Subscribers</p></span>
				</div>
				<div className="subscribe-btn">
					<button>Subscribe</button>
				</div>
				<div className="like-unlike-btn">
					<button><FontAwesomeIcon style={{marginRight:"5px"}} size={'xl'} icon={faThumbsUp}/>{userVideo[0]?.id && userVideo[0]?.statistics?.likeCount.toString().split( /(?=(?:\d{3})+(?:\.|$))/g ).join( "," )}</button>
					<button><FontAwesomeIcon style={{marginRight:"5px"}} size={'xl'} icon={faThumbsDown}/></button>
				</div>
			</div>

			<div className="video-description-wrapper">
				<div className="viewsAndDate">
					<p className="views">{userVideo[0]?.id && userVideo[0]?.statistics?.viewCount.toString().split( /(?=(?:\d{3})+(?:\.|$))/g ).join( "," )} views</p>
					<p className="date">{convertDate(dateNew)}</p>
				</div>
				<div className="video-description">
					<p className={"desc " + (showMore && "showMore")}>{userVideo[0]?.id && userVideo[0]?.snippet?.localized?.description}</p>
					<p onClick={()=>{setShowMore(!showMore)}} className="showHideBtn">{showMore ? "Show less" : "Show more"}</p>
				</div>
			</div>
			<div className="comments">
				<p>{userVideo[0]?.id && userVideo[0]?.statistics?.commentCount.toString().split( /(?=(?:\d{3})+(?:\.|$))/g ).join( "," )} Comments</p>
			</div>

           <div className="Comments-wrapper">
	           {
				   comments &&
		           comments.map(data => {
					   return <Comments
						   key={data.id}
						   authorProfileImageUrl={data?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl}
						   authorDisplayName={data?.snippet?.topLevelComment?.snippet?.authorDisplayName}
						   textDisplay={data?.snippet?.topLevelComment?.snippet?.textOriginal}
						   likeCount={data?.snippet?.topLevelComment?.snippet?.likeCount}
					   />
		           })
	           }
           </div>

		</div>
		<div className="right-wrapper">
			{ytVideos &&
				ytVideos.map(data => {
					return <SideVideoBar
						key={data?.id?.videoId}
						data={data}
						description={data?.snippet?.title}
						channel_name={data?.snippet?.channelTitle}
						thumbnail={data?.snippet?.thumbnails?.high?.url}
						logo={data?.snippet?.thumbnails?.medium?.url}
						publishedAt={data?.snippet?.publishedAt}
					/>
				})
			}
		</div>

	</div>
}