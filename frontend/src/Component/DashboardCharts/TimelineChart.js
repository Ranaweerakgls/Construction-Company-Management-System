import React from 'react';
import './TimelineChart.css';

const TimelineChart = ({ items }) => {
  return (
    <div className="timeline-container">
      {items.map((item, index) => (
        <div key={item.id || index} className="timeline-item">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <div className="timeline-date">
              {new Date(item.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </div>
            <div className="timeline-details">
              <h4>{item.project}</h4>
              <p>{item.task}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineChart;