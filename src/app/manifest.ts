import { type MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MKcalc',
    short_name: 'MKc',
    description: 'Приложение для расчета стоимость строительных работ',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#f9c385',
    icons: [
      {
        src: './icon.svg',
        sizes: '192x192',
        type: 'image/svg',
      },
    ],
  };
}
