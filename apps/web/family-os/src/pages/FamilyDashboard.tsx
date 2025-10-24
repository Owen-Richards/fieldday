import React from 'react';
import ChildCard from '../components/ChildCard';

const FamilyDashboard: React.FC = () => {
    const familyMembers = [
        { id: 1, name: 'John Doe', age: 10 },
        { id: 2, name: 'Jane Doe', age: 8 },
    ];

    return (
        <div className="family-dashboard">
            <h1>Family Dashboard</h1>
            <div className="child-cards">
                {familyMembers.map(member => (
                    <ChildCard key={member.id} name={member.name} age={member.age} />
                ))}
            </div>
        </div>
    );
};

export default FamilyDashboard;