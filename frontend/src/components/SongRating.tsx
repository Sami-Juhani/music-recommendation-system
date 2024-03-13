import React, { useEffect, useState } from "react";
import "../styles/SongRating.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const SongRating = ({ spotifyId }: { spotifyId: string }) => {
  const [rating, setRating] = useState(0);
  const [newRating, setNewRating] = useState(0);
  const [numberOfReviews, setNumberOfReviews] = useState(0);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/song-ratings/get-rating/${spotifyId}`
        );
        if (response.ok) {
          const data = await response.json();
          setRating(data.overall_rating);
          setNumberOfReviews(data.number_of_reviews);
        }
      } catch (error) {
        console.error("Error fetching song rating:", error);
      }
    };

    fetchRating();
  }, []);

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
      } else {
        console.error(`ERROR: ${await response.text()}`);
      }
    } catch (error) {
      console.error("Error adding rating:", error);
    }
  };

  return (
    <>
      <div className="song-rating-container">
        <p className="rating-value">Rating: {rating}</p>
        <p className="number-of-reviews">
          Number of Reviews: {numberOfReviews}
        </p>
      </div>
      <div className="add-song-rating-container flex">
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
    </>
  );
};

export default SongRating;
