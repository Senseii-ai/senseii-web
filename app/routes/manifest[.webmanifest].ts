import type { WebAppManifest } from '@remix-pwa/dev';
import { json } from '@remix-run/node';

export const loader = () => {
  return json(
    {
      short_name: "senseii",
      name: "senseii",
      description: "Your Personal Life Coach.",
      // scope: ".",
      icons: [
        {
          src: "/web-app-manifest-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/web-app-manifest-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      screenshots: [
        {

          "src": "/web-app-manifest-512x512.png",
          "sizes": "512x512",
          "type": "image/gif",
          "label": "Application"
        },
        {

          "src": "/web-app-manifest-512x512.png",
          "sizes": "512x512",
          "type": "image/gif",
          "form_factor": "wide",
          "label": "Application"
        }
      ],
      start_url: "/",
      display: "standalone",
      background_color: "#121212",
      theme_color: "#121212",
    } as WebAppManifest,
    {
      headers: {
        'Cache-Control': 'public, max-age=600',
        'Content-Type': 'application/manifest+json',
      },
    }
  );
};
