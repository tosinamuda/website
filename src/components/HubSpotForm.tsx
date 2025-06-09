'use client';
import { useEffect } from 'react';

export const HubSpotForm = () => {
  useEffect(() => {
    // Load the HubSpot form script
    const script = document.createElement('script');
    script.charset = 'utf-8';
    script.type = 'text/javascript';
    script.src = '//js-eu1.hsforms.net/forms/embed/v2.js';
    document.body.appendChild(script);

    script.addEventListener('load', () => {
      // @TS-ignore
      if (window.hbspt) {
        // @TS-ignore
        window.hbspt.forms.create({
          region: 'eu1',
          portalId: '143399522',
          formId: '4414ec34-6bb9-498d-9490-af8f457b8e47',
          target: '#hubspot-form',
        });
      }
    });

    // Clean up: remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="hubspot-form" className="w-full"></div>;
};
