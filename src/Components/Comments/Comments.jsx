import './Comments.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {useContext} from "react";
import ytContext from "../../context/ytContext";

export default function Comments(props) {

	const context = useContext(ytContext);
	const {darkMode, convertDate} = context

	const dateString = props.publishedAt
	const date = new Date(dateString)
	let dateNew = `${date.getFullYear()}-${date.getMonth() === 0 ? date.getMonth() + 1 : date.getMonth()}-${date.getDay() === 0 ? date.getDay() + 1 : date.getDay()}`

	return <div className={"Comments " + (darkMode && " dark ")}>
		<div className="left">
			{props.authorProfileImageUrl && <img style={{borderRadius: "50%"}}
			                                     src={props.authorProfileImageUrl ? props.authorProfileImageUrl : props.default_img}
			                                     width={50}
			                                     height={50} alt=""/>}
		</div>
		<div className="right">
			<div className="userNameAndDate">
				<p>@{props.authorDisplayName.toString().split(' ')}</p>
				<p>{convertDate(dateNew)}</p>
			</div>
			<div className="comment-text">
				<p>{props.textDisplay}</p>
			</div>
			<div className="likesCount">
				<p><FontAwesomeIcon style={{marginRight: "7px"}} size={'xl'} color={'gray'}
				                    icon={faThumbsUp}/> {props.likeCount}</p>
			</div>
		</div>
	</div>
}