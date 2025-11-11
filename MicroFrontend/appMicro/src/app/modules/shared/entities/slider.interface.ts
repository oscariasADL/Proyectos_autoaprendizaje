export interface SlideOptions {
  initialSlide: number;
  centeredSlides: boolean;
  autoplay: SlideAutoPlay | boolean;
  allowTouchMove: boolean;
}

interface SlideAutoPlay {
  delay: number;
  disableOnInteraction: boolean;
  stopOnLastSlide: boolean;
}
