/**
 * Smoothly scrolls to a target element with custom easing animation
 * @param targetElement - The element to scroll to
 * @param offset - Vertical offset in pixels (default: -20)
 * @param duration - Animation duration in milliseconds (default: 800)
 */
export function smoothScrollToElement(
  targetElement: Element,
  offset: number = -20,
  duration: number = 800
): void {
  const targetY = targetElement.getBoundingClientRect().top + window.pageYOffset + offset;
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  let startTime: number | null = null;

  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
}

/**
 * Smoothly scrolls to a specific Y position
 * @param targetY - Target Y position in pixels
 * @param duration - Animation duration in milliseconds (default: 800)
 */
export function smoothScrollToPosition(
  targetY: number,
  duration: number = 800
): void {
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  let startTime: number | null = null;

  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
}
