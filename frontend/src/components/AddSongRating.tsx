
import React, { useState } from 'react';
import '../styles/SongRating.css';

const AddSongRating = ({ spotifyId }: { spotifyId: string }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [rating, setRating] = useState(0);

    const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newRating = parseInt(e.target.value);

        if (newRating < 1) {
            newRating = 1;
        } else if (newRating > 5) {
            newRating = 5;
        }

        setRating(newRating);
    };

    const handleSubmitRating = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/song-ratings/add-rating/${spotifyId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating }),
                credentials: 'include'
            });
            if (response.ok) {
                console.log('Rating added successfully');
            } else {
                console.error('Failed to add rating');
            }
        } catch (error) {
            console.error('Error adding rating:', error);
        }
    };

    return (
        <div className="add-song-rating-container">
            <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={handleRatingChange}
                className="rating-input"
            />
            <button onClick={handleSubmitRating} className="submit-button">Submit Rating</button>
        </div>
    );
};

export default AddSongRating;
