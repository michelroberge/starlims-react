import React, { useRef } from 'react';
import DashboardCard from './DashboardCard';

const Dashboard = () => {
    const effectRan = useRef(false);

    // Data for the cards
    const cardsData = [
        {
            id:"card-1",
            imageUrl: "/job-registration.svg",
            title: "Registration",
            description: "You received new samples or are preparing a new folder? Click here!",
            path: "/folder-login"
        },
        {
            id:"card-4",
            imageUrl: "/sample-reception.svg",
            title: "Sample Preparation",
            description: "Prepare your samples",
            path: "/sample-reception"
        },
        {
            id:"card-2",
            imageUrl: "/result-entry.svg",
            title: "Result Entry",
            description: "Record results here!",
            path: "/result-entry"
        },
        {
            id:"card-3",
            imageUrl: "/print-document.svg",
            title: "Reports Generation",
            description: "Ready to prepare COA? This is it.",
            path: "/folder-reports"
        },
        {
            id:"card-5",
            imageUrl: "/server.svg",
            title: "Reference Data",
            description: "Manage your reference data",
            path: "/dashboard-reference"
        }
    ];

    const renderDashboard = () => (
        <div className="container">
            <div className="row justify-content-around">
                {cardsData.map((card) => (
                    <DashboardCard
                        key={`dashboard-card-${card.id}`}
                        id={card.id}
                        imageUrl={card.imageUrl}
                        title={card.title}
                        description={card.description}
                        path={card.path}                         
                    />
                ))}
            </div>
        </div>
    );

    if (!effectRan.current || import.meta.env.NODE_ENV !== "development") {
        effectRan.current = true;
        return renderDashboard();
    }

    return null;
};

export default Dashboard;
