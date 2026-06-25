import user1 from "../../../assets/images/reviews/Review1.jpg"
import user2 from "../../../assets/images/reviews/Review2.jpg"
import user3 from "../../../assets/images/reviews/Review3.jpg"

function ReviewBadge() {
    return(
        <div className="reviews" >
            <div className="avatars" >
                <img src={user1} alt="people" />
                <img src={user2} alt="people" />
                <img src={user3} alt="people" />
            </div>

            <div>
                <p>Reviews</p>
                <span>200+ Positive Reviews</span>
            </div>
        </div>
    )
}

export default ReviewBadge;
