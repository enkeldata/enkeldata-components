import { useRouter } from "next/router";
import React, { ForwardRefRenderFunction, MutableRefObject } from "react";
import { useEffect, useState } from "react";
import { TransitionGroup, CSSTransition, SwitchTransition } from 'react-transition-group';

import styles from './AnimatedRoutingLayout.module.css'

interface AnimatedRoutingLayoutProperties {
    children: any;
}

const AnimatedRoutingLayout = (props: AnimatedRoutingLayoutProperties) => {

  const router = useRouter();

  return (
    <>
      <SwitchTransition mode="out-in">
        
        <CSSTransition
          key={router.pathname}
          in={true}
          timeout={500}
          classNames={{
            enter: styles.main_enter,
            enterDone: styles.main_enter_done,
            enterActive: styles.main_enter_active,
            appear: styles.main_appear,
            appearDone: styles.main_appear_done,
            appearActive: styles.main_appear_active,
            exit: styles.main_exit,
            exitDone: styles.main_exit_done,
            exitActive: styles.main_exit_active,
          }}
          appear={true}
        >
          <main className={styles.main}>
              {props.children}
          </main>
        </CSSTransition>
      </SwitchTransition>
    </>
  );

};

export default AnimatedRoutingLayout;