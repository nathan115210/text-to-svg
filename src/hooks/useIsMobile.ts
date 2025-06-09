import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' && window.innerWidth <= breakpoint;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // listen for resize
    window.addEventListener('resize', onResize);
    // set initial value
    onResize();

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [breakpoint]);

  return isMobile;
}
