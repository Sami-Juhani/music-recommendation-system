import React, { useContext, useState } from "react";
import { RatingType } from "../types/RatingsType";
import { useTranslation } from "react-i18next";
import { UserContext } from "../context/UserContextProvider";
import "../styles/SongRating.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const SongRating = ({ songRating, spotifyId }: { songRating: RatingType; spotifyId: string }) => {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const [rating, setRating] = useState(songRating.overall_rating);
  const [usersRating, setUsersRating] = useState(() => {
    const ratingObj = user?.userRatings.find((r) => r.spotifyId === spotifyId);
    return ratingObj ? ratingObj.rating : 0;
  });

  const [numberOfReviews, setNumberOfReviews] = useState(songRating.number_of_reviews);

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
        setUsersRating(newSongRating.user_rating)
        setNumberOfReviews(newSongRating.number_of_reviews);
      } else {
        console.error(`ERROR: ${await response.text()}`);
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
      <div className="flex gap-[10px] items-center star-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={(event) => handleRatingChange(star, event)}
            className={`star ${star <= usersRating ? 'filled' : ''} ${
              star - 0.5 === usersRating ? 'half-filled' : ''
            }`}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default SongRating;