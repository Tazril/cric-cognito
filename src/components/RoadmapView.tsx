import React from 'react';

const RoadmapView = () => {
  return (
    <div style={{ padding: '24px 48px', color: '#1f1f1f', lineHeight: '1.6' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>2026 Q3 Product Roadmap Plan</h1>
      
      <p style={{ marginBottom: '16px' }}>
        This document outlines our strategic initiatives and product roadmap for the third quarter of 2026. The focus this quarter is to accelerate user growth, scale our backend infrastructure, and roll out the highly requested AI-powered automation features across the platform.
      </p>

      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '32px', marginBottom: '12px' }}>Executive Summary</h2>
      <p style={{ marginBottom: '16px' }}>
        Following a successful Q2 launch of the mobile application, Q3 is aimed at solidifying user retention. Our primary OKRs (Objectives and Key Results) center around decreasing app latency by 30%, increasing weekly active users (WAU) by 15%, and successfully migrating our primary database to a distributed model.
      </p>

      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '32px', marginBottom: '12px' }}>Phase 1: Infrastructure Scaling (July)</h2>
      <ul style={{ marginBottom: '16px', paddingLeft: '24px' }}>
        <li style={{ marginBottom: '8px' }}><strong>Database Migration:</strong> Transition from monolithic PostgreSQL to distributed CockroachDB to handle the influx of new user data.</li>
        <li style={{ marginBottom: '8px' }}><strong>CDN Optimization:</strong> Implement advanced caching rules at the edge to reduce load times for international users by up to 200ms.</li>
        <li style={{ marginBottom: '8px' }}><strong>Microservices Split:</strong> Decouple the authentication and notification services from the core API.</li>
      </ul>

      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '32px', marginBottom: '12px' }}>Phase 2: AI Feature Rollout (August)</h2>
      <ul style={{ marginBottom: '16px', paddingLeft: '24px' }}>
        <li style={{ marginBottom: '8px' }}><strong>Smart Analytics:</strong> Release the AI dashboard that automatically generates insights from user data sets.</li>
        <li style={{ marginBottom: '8px' }}><strong>Automated Workflows:</strong> Allow users to build custom triggers and actions using natural language prompts.</li>
      </ul>

      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '32px', marginBottom: '12px' }}>Phase 3: User Experience Polish (September)</h2>
      <p style={{ marginBottom: '16px' }}>
        The final month of the quarter will be dedicated to addressing technical debt and improving accessibility. We will conduct extensive user testing on the new AI workflows and refine the UI based on feedback from the beta program.
      </p>
    </div>
  );
};

export default RoadmapView;
