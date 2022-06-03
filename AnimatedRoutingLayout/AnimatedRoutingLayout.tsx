import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { gsap } from 'gsap';

interface AnimatedRoutingLayoutProperties {
    children: any;
    mainStyle: string;
}

const AnimatedRoutingLayout = (props: AnimatedRoutingLayoutProperties) => {

  const [animationIsRunning, setAnimationIsRunning] = useState(false);

  const router = useRouter();

  useEffect(() => {
    
    const className = "." + props.mainStyle;

    const finish_animation_if_needed = () => {
      if (!animationIsRunning) {
        const timeline = gsap.timeline();
        timeline.to(className, {
          duration: 0.5,
          opacity: 1,
          ease: "Expo.easeInOut",
          stagger: -0.1,
        });
        setAnimationIsRunning(false);
      }
    }

    const aniStart = () => {
      const timeline = gsap.timeline();
      timeline.to(className, {
        duration: 0.5,
        opacity: 0,
        ease: "Expo.easeInOut",
        stagger: 0.1,
        onComplete: () => {
          setAnimationIsRunning(false);
          finish_animation_if_needed();
        }
      });
      setAnimationIsRunning(true);
    };
    const aniEnd = () => {
      finish_animation_if_needed();
    };

    router.events.on('routeChangeStart', aniStart);
    router.events.on('routeChangeComplete', aniEnd);
    router.events.on('routeChangeError', aniEnd);

    return () => {
      router.events.off('routeChangeStart', aniStart);
      router.events.off('routeChangeComplete', aniEnd);
      router.events.off('routeChangeError', aniEnd);
    };
  }, [router]);
 
  const jsx = (
    <>
        <main className={props.mainStyle}>
            {props.children}
        </main>
    </>
);

return animationIsRunning ? (<></>) : jsx;

};

export default AnimatedRoutingLayout;