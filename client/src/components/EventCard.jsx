import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="group bg-white border border-stone hover:border-primary transition-all duration-300 flex flex-col overflow-hidden"
      style={{ boxShadow: '0 2px 16px rgba(28,28,46,0.06)' }}
    >
      {/* Top accent bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-primary via-accent to-secondary" />

      <div className="p-7 flex flex-col flex-grow">
        {/* Category pill */}
        <span className="inline-block text-xs font-sans font-medium tracking-widest uppercase text-primary border border-primary px-3 py-1 mb-5 self-start">
          {event.category}
        </span>

        {/* Title */}
        <h3 className="font-display text-2xl font-semibold text-dark leading-snug mb-5 group-hover:text-primary transition-colors duration-300">
          {event.title}
        </h3>

        {/* Divider */}
        <div className="w-8 h-px bg-stone mb-5" />

        {/* Details */}
        <div className="space-y-2 mb-6 flex-grow">
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm font-sans text-charcoal">{event.city}</span>
          </div>
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-sans text-charcoal">{formattedDate}</span>
          </div>
        </div>

        {/* CTA */}
        <Link
          to={`/events/${event._id}`}
          className="flex items-center justify-between group/btn border border-dark text-dark hover:bg-dark hover:text-white transition-all duration-300 px-5 py-3 text-sm font-sans font-medium tracking-wide"
        >
          <span>View Details</span>
          <span className="transform group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
