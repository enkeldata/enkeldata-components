import { useRouter } from "next/router";
import React, { ForwardRefRenderFunction, MutableRefObject } from "react";
import { useEffect, useState } from "react";
import { TransitionGroup, CSSTransition, SwitchTransition } from 'react-transition-group';

interface AnimatedRoutingLayoutProperties {
    children: any;
    styles: any;
}

const AnimatedRoutingLayout = (props: AnimatedRoutingLayoutProperties) => {

  const router = useRouter();

  const mainRef = React.useRef<HTMLElement>(null);

  return (
    <>
      <SwitchTransition mode="out-in">
        
        <CSSTransition
          key={router.pathname}
          in={true}
          timeout={500}
          classNames="main"
          appear={true}
        >
          <main ref={mainRef} className={props.styles.main}>
              {props.children}
          </main>
        </CSSTransition>
      </SwitchTransition>
    </>
  );

};

export default AnimatedRoutingLayout;