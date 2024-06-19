"use client"
// useLazyAppear.js
import { useState, useEffect } from 'react';

const useLazyAppear = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5, // Adjust this threshold as needed
      }
    );

    observer.observe(document.querySelector('.lazy-appear')); // Adjust the selector as needed

    return () => observer.disconnect();
  }, []);

  return isVisible;
};

export default useLazyAppear;
