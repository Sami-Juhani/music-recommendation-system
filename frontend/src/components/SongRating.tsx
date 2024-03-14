import React, { useContext, useState } from "react";
import "../styles/SongRating.css";
import { NotificationContext } from "../context/NotificationContextProvider";
import { RatingType } from "../types/RatingsType";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const SongRating = ({ songRating, spotifyId }: { songRating: RatingType, spotifyId: string }) => {
  const [rating, setRating] = useState(songRating.overall_rating);
  const [newRating, setNewRating] = useState(songRating.number_of_reviews);
  const [numberOfReviews, setNumberOfReviews] = useState(0);
  const { setNotification } = useContext(NotificationContext);

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newInputRating = parseInt(e.target.value);

    if (newInputRating < 1) {
      newInputRating = 1;
    } else if (newInputRating > 5) {
      newInputRating = 5;
    }

    setNewRating(newInputRating);
  };

  const handleSubmitRating = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/song-ratings/add-rating/${spotifyId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rating: newRating }),
          credentials: "include",
        }
      );
      if (response.ok) {
        const newSongRating = await response.json();
        setRating(newSongRating.overall_rating);
        setNumberOfReviews(newSongRating.number_of_reviews);
        setNotification({text: "Review submitted succesfully", success: true})
      } else {
        console.error(`ERROR: ${await response.text()}`);
        setNotification({text: "Error submitting review", success: false})
      }
    } catch (error) {
      console.error("Error adding rating:", error);
    }
  };

  return (
    <div className="flex gap-[20px] py-4">
      <div className="flex flex-col gap-[10px]">
        <p className="rating-value">Rating: {rating}</p>
        <p className="number-of-reviews">
          Number of Reviews: {numberOfReviews}
        </p>
      </div>
      <div className="flex gap-[10px] items-center">
        <input
          type="number"
          min="1"
          max="5"
          value={newRating}
          onChange={handleRatingChange}
          className="rating-input"
        />
        <button onClick={handleSubmitRating} className="submit-button">
          Submit Rating
        </button>
      </div>
    </div>
  );
};

export default SongRating;
