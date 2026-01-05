import React from 'react';
import './RatingBadge.css';
import cornerAccent from '../../assets/images/corner-accent.jpg';

const RatingBadge = () => {
    return (
        <div className="rating-badge-container">
            <img src={cornerAccent} alt="" className="corner-accent-img" />
            <div className="rating-content">
                <span>rated 4.8 on</span>
                <img
                    src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                    alt="Google"
                    className="google-logo"
                />
            </div>
        </div>
    );
};

export default RatingBadge;
