import React, { useRef } from 'react';
import DashboardCard from './DashboardCard';

const DashboardReference = () => {
    const effectRan = useRef(false);

    // Data for the cards
    const cardsData = [
        {
            id:"card-1",
            imageUrl: "/job-registration.svg",
            title: "Tests Configuration",
            description: "Configure tests and calculations.",
            path: "/folder-login"
        },
        {
            id:"card-4",
            imageUrl: "/sample-reception.svg",
            title: "Testing Plans",
            description: "Organize your test plans",
            path: "/sample-reception"
        },
        {
            id:"card-2",
            imageUrl: "/result-entry.svg",
            title: "Lists",
            description: "Manage all your lists",
            path: "/result-entry"
        },
        {
            id:"card-3",
            imageUrl: "/print-document.svg",
            title: "System and Settings",
            description: "Users, roles, globalization, etc.",
            path: "/folder-reports"
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

export default DashboardReference;
