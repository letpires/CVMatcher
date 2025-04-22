'use client';
import React from 'react';
import { TabProvider } from '../contexts/TabContext';
import CVMatcherPage from '../pages/CVMatcherPage';

export default function Home() {
  return (
    <TabProvider>
      <CVMatcherPage />
    </TabProvider>
  );
}