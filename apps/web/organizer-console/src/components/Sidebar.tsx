import React from 'react';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <h2>Organizer Console</h2>
            <ul>
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/events">Events</a></li>
                <li><a href="/participants">Participants</a></li>
                <li><a href="/settings">Settings</a></li>
            </ul>
        </div>
    );
};

export default Sidebar;