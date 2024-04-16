import React, { useContext, useState } from "react";
import "../styles/SongRating.css";
import { NotificationContext } from "../context/NotificationContextProvider";
import { RatingType } from "../types/RatingsType";
import { useTranslation } from "react-i18next";
import { UserContext } from "../context/UserContextProvider";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const SongRating = ({ songRating, spotifyId }: { songRating: RatingType; spotifyId: string }) => {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const [rating, setRating] = useState(songRating.overall_rating);
  const [numberOfReviews, setNumberOfReviews] = useState(songRating.number_of_reviews);
  const { setNotification } = useContext(NotificationContext);

  const handleRatingChange = async (newRating: number, event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    try {
      const response = await fetch(`${BASE_URL}/api/song-ratings/add-rating/${spotifyId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating: newRating }),
        credentials: "include",
      });
      if (response.ok) {
        const newSongRating = await response.json();
        setRating(newSongRating.overall_rating);
        setNumberOfReviews(newSongRating.number_of_reviews);
        //setNotification({text: "Review submitted succesfully", success: true})
      } else {
        console.error(`ERROR: ${await response.text()}`);
        //setNotification({text: "Error submitting review", success: false})
      }
    } catch (error) {
      console.error("Error adding rating:", error);
    }
  };

  return (
    <div className="flex gap-[20px] py-4">
      <div className="flex flex-col gap-[10px]">
        <p className="rating-value">
          {t("playListContainer.rating")} {rating}
        </p>
        <p className="number-of-reviews">
          {t("playListContainer.numberOfReviews")} {numberOfReviews}
        </p>
      </div>
      <div className="flex gap-[10px] items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={(event) => handleRatingChange(star, event)}
            className={`star ${star <= rating ? 'filled' : ''} ${star - 0.5 === rating ? 'half-filled' : ''}`}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default SongRating;
