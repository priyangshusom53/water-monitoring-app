import React from 'react';
import './loading.css';

export default function Loading() {
   return (
      <div className="loading-overlay">
         <div className="loading-spinner" />
         <div className="loading-text">Loading…</div>
      </div>
   );
}
