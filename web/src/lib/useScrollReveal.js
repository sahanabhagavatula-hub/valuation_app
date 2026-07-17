import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(deps = []) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray('.scroll-element');
      gsap.set(elements, { opacity: 0, y: 50, scale: 0.92 });

      ScrollTrigger.batch(elements, {
        start: 'top 85%',
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'back.out(1.6)',
            overwrite: true,
          }),
        onLeaveBack: (batch) =>
          gsap.to(batch, {
            opacity: 0,
            y: 50,
            scale: 0.92,
            duration: 0.4,
            stagger: 0.08,
            ease: 'power2.in',
            overwrite: true,
          }),
      });

      const onceElements = gsap.utils.toArray('.scroll-element-once');
      gsap.set(onceElements, { opacity: 0, y: 50, scale: 0.92 });

      ScrollTrigger.batch(onceElements, {
        start: 'top 85%',
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'back.out(1.6)',
            overwrite: true,
          }),
      });

      const bgElements = gsap.utils.toArray('.scroll-bg');
      gsap.set(bgElements, { opacity: 0, scale: 1.18 });

      ScrollTrigger.batch(bgElements, {
        start: 'top 90%',
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            scale: 1,
            duration: 1.1,
            stagger: 0.12,
            ease: 'power3.out',
            overwrite: true,
          }),
        onLeaveBack: (batch) =>
          gsap.to(batch, {
            opacity: 0,
            scale: 1.18,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.in',
            overwrite: true,
          }),
      });

      const pinTarget = document.querySelector('.valufin-pin-freeze');
      if (pinTarget) {
        const coverTarget = document.querySelector('.valufin-pin-cover');
        const freezeHeight = Math.round(pinTarget.getBoundingClientRect().height);
        // The frozen frame needs its own full height of scroll room to clear
        // the viewport again after unpinning — reserve that as runway so its
        // tail never peeks back into view at the bottom of the page.
        if (coverTarget) coverTarget.style.paddingBottom = `${freezeHeight}px`;

        ScrollTrigger.create({
          trigger: pinTarget,
          start: 'top top',
          end: () => '+=' + freezeHeight,
          pin: true,
          pinSpacing: false,
        });
      }

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
