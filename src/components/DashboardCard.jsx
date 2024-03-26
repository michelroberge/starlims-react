import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DashboardCard = ({ id, imageUrl, title, description, path }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={`card-div-${id}`}>
            <Link
                to={path}
                className="card border-0 text-decoration-none"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ cursor: 'pointer' }}
            >
                <div
                    className={`card ${isHovered ? 'shadow bg-secondary' : ''}`}
                    style={{ width: '18rem' }}
                >
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            className="card-img-top"
                            alt="Dashboard-action"
                            style={{ height: '200px', objectFit: 'cover' }}
                        />
                    )}
                    <div className="card-body">
                        <h5 className="card-title" title={title}>{title}</h5>
                        <p className="card-text" title={description} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {description}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default DashboardCard;
