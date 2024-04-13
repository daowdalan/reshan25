import { useRef, useEffect, useState } from 'react';

function useLazyAppear(isVisible = false) {
  const [lazyAppear, setLazyAppear] = useState(isVisible);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setLazyAppear(true);
        observer.unobserve(elementRef.current);
      }
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [elementRef]);

  return { lazyAppear, elementRef };
}

export default useLazyAppear;
