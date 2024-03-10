
import React, { useState, useEffect } from 'react';
import '../styles/SongRating.css';

const SongRating = ({ spotifyId }: { spotifyId: string }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [rating, setRating] = useState(null);
    const [numberOfReviews, setNumberOfReviews] = useState(0);

    useEffect(() => {
        const fetchRating = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/song-ratings/get-rating/${spotifyId}`);
                if (response.ok) {
                    const data = await response.json();
                    setRating(data.overall_rating);
                    setNumberOfReviews(data.number_of_reviews);
                }
            } catch (error) {
                console.error('Error fetching song rating:', error);
            }
        };

        fetchRating();
    }, [spotifyId]);

    return (
        <div className="song-rating-container">
            <p className="rating-value">Rating: {rating}</p>
            <p className="number-of-reviews">Number of Reviews: {numberOfReviews}</p>
        </div>
    );
};

export default SongRating;
