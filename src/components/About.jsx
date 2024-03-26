import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useKeyboardHandler } from '../context/KeyboardHandlerContext';
import { useNavigate } from 'react-router-dom';
const AboutPage = () => {
  const navigate = useNavigate();
  const { setModalContent, setKeyCallbacks } = useKeyboardHandler();
  useEffect(() => {
    setModalContent(<p>Use the top menu. If you do not see it, you can try BACKSPACE to go to the home page.</p>);
    return () => {
      setModalContent(null);
    };
  }, [setModalContent]);

  const handleBackspace = () => {
    console.log(`custom keyboard handler`);
    navigate('/');
  };

  useEffect(() => {
    const keyCallbacks = [['Backspace', handleBackspace]];
    setKeyCallbacks(keyCallbacks);
    return () => {
      setKeyCallbacks([]);
    };
}, [setKeyCallbacks]);

  return (
    <div className="container">
      <h2 className="mt-5 mb-4">About {import.meta.env.VITE_APP_TITLE}</h2>
      <p className="lead">{import.meta.env.VITE_APP_TITLE} is a cutting-edge laboratory management platform designed to streamline workflows, enhance collaboration, and accelerate scientific innovation.</p>
      <hr className="my-4" />
      <p>Our platform offers a comprehensive suite of tools and features tailored to meet the unique needs of modern laboratories across various industries, including biotechnology, pharmaceuticals, environmental science, and more.</p>
      <h3 className="mt-5 mb-3">Key Features</h3>
      <ul className="list-group mb-4">
        <li className="list-group-item">
          <strong>Efficient Sample Management:</strong> Easily track and manage samples throughout their lifecycle, from receipt to analysis and disposal.
        </li>
        <li className="list-group-item">
          <strong>Collaborative Workspaces:</strong> Foster collaboration among team members by providing centralized access to data, protocols, and research findings.
        </li>
        <li className="list-group-item">
          <strong>Customizable Workflows:</strong> Adapt our platform to your laboratory's unique processes and requirements with flexible workflow configurations.
        </li>
        <li className="list-group-item">
          <strong>Real-time Analytics:</strong> Gain valuable insights into laboratory operations with customizable dashboards and real-time analytics.
        </li>
        <li className="list-group-item">
          <strong>Secure Data Management:</strong> Ensure data security and compliance with industry regulations using advanced encryption and access control measures.
        </li>
      </ul>
      <h3 className="mt-5 mb-3">Why Choose {import.meta.env.VITE_APP_TITLE}?</h3>
      <ul className="list-group mb-4">
        <li className="list-group-item">
          <strong><FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" /> Boost Efficiency:</strong> Streamline workflows and automate repetitive tasks to maximize productivity.
        </li>
        <li className="list-group-item">
          <strong><FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" /> Enhance Collaboration:</strong> Facilitate seamless communication and knowledge sharing among team members.
        </li>
        <li className="list-group-item">
          <strong><FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" /> Accelerate Innovation:</strong> Empower researchers to focus on groundbreaking discoveries by eliminating administrative hurdles.
        </li>
        <li className="list-group-item">
          <strong><FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" /> Ensure Compliance:</strong> Stay ahead of regulatory requirements and maintain data integrity with our robust compliance features.
        </li>
      </ul>
      <p className='text-muted fs-4 text-center'>Experience the future of laboratory management with {import.meta.env.VITE_APP_TITLE}<br />Join us on our mission to revolutionize scientific research and discovery.</p>
      <p className='text-muted fs-4 text-center'></p>
      <a href="mailto:michelroberge77@gmail.com" className='btn btn-primary'>Contact us</a>
    </div>
  );
};

export default AboutPage;
