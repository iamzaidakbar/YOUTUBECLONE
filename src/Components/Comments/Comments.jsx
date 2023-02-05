import './Comments.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {useContext} from "react";
import ytContext from "../../context/ytContext";
export default function Comments(props) {

	const context = useContext(ytContext);
	const {darkMode} = context

	return <div className={"Comments " + (darkMode && " dark ")}>
		<div className="left">
			<img style={{borderRadius:"50%"}} src={props.authorProfileImageUrl} width={50} height={50} alt=""/>
		</div>
		<div className="right">
			<div className="userNameAndDate">
				<p>@{props.authorDisplayName.toString().split(' ')}</p>
				<p>5 months ago</p>
			</div>
			<div className="comment-text">
				<p>{props.textDisplay}</p>
			</div>
			<div className="likesCount">
				<p><FontAwesomeIcon style={{marginRight:"7px"}} size={'xl'} color={'gray'} icon={faThumbsUp}/> {props.likeCount}</p>
			</div>
		</div>
	</div>
}