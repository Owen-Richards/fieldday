import React from 'react';

interface ChildCardProps {
    name: string;
    age: number;
    profilePicture: string;
}

const ChildCard: React.FC<ChildCardProps> = ({ name, age, profilePicture }) => {
    return (
        <div className="child-card">
            <img src={profilePicture} alt={`${name}'s profile`} className="child-card__image" />
            <h3 className="child-card__name">{name}</h3>
            <p className="child-card__age">{age} years old</p>
        </div>
    );
};

export default ChildCard;