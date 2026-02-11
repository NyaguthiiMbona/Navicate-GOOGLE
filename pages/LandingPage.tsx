import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/Button';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => navigate('/explore');
  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Navicate | Career Transition Tool for Tech and Remote Roles</title>
        <meta
          name="description"
          content="Navicate helps professionals map transferable skills into realistic tech and remote career paths. Generate tailored CVs and cover letters aligned to your background."
        />
        <meta
          name="keywords"
          content="career transition tool, career pivot, tech career switch, remote jobs, transferable skills, CV generator, cover letter generator, career mapping"
        />

        <link rel="canonical" href="https://navicate.app/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Navicate | Map Your Career Transition" />
        <meta
          property="og:description"
          content="Identify realistic tech and remote roles based on your transferable skills. Generate aligned CVs and cover letters instantly."
        />
        <meta property="og:url" content="https://navicate.app/" />
        <meta property="og:site_name" content="Navicate" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Navicate | Career Transition Tool" />
        <meta
          name="twitter:description"
          content="Explore realistic career pivots and generate tailored application materials."
        />

        {/* International Targeting */}
        <meta httpEquiv="content-language" content="en" />
        <link rel="alternate" href="https://navicate.app/" hrefLang="x-default" />
        <link rel="alternate" href="https://navicate.app/" hrefLang="en" />
      </Helmet>

      <div className="animate-in fade-in duration-700">
