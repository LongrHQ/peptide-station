import dynamic from 'next/dynamic';
import type { CarouselProps } from 'components/hero-carousel-client';

const HeroCarouselClient = dynamic<CarouselProps>(
  () => import('components/hero-carousel-client'),
  {
    ssr: false,
    loading: () => <div className="w-full min-h-480px bg-gray-100" />,
  }
);

export default function Carousel(props: CarouselProps) {
  return <HeroCarouselClient {...props} />;
}
