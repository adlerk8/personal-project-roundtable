
const Comment = (props) => {

    return (
            <div>
                <div>
                    <img src={props.profile_pic}/>
                </div>
                <div>
                    <h2>{props.username} says:</h2>
                    <p>{props.comment_body}</p>
                </div>
                <div>
                    {props.created_at}
                </div>
            </div>
    );
}

export default Comment;