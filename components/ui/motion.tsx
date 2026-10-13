"use client";

import type { ReactNode } from "react";
import { MotionConfig, motion, type Variants } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "none";

const tags = {
  div: motion.div,
  section: motion.section,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  p: motion.p,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  aside: motion.aside,
  article: motion.article,
};

type Tag = keyof typeof tags;

const ease = [0.22, 1, 0.36, 1] as const;

function offset(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
}

function itemVariants(direction: Direction, distance: number, scale?: number): Variants {
  return {
    hidden: { opacity: 0, ...offset(direction, distance), ...(scale ? { scale } : {}) },
    show: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.7, ease } },
  };
}

type BaseProps = {
  as?: Tag;
  className?: string;
  children?: ReactNode;
  id?: string;
};

type RevealProps = BaseProps & {
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  scale?: number;
  amount?: number;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
};

export function Reveal({
  as = "div",
  direction = "up",
  distance = 40,
  delay = 0,
  duration = 0.7,
  scale,
  amount = 0.2,
  immediate = false,
  className,
  children,
  id,
}: RevealProps) {
  const Component = tags[as];
  const target = { opacity: 1, x: 0, y: 0, scale: 1 };
  return (
    <Component
      id={id}
      className={className}
      initial={{ opacity: 0, ...offset(direction, distance), ...(scale ? { scale } : {}) }}
      {...(immediate ? { animate: target } : { whileInView: target, viewport: { once: true, amount } })}
      transition={{ duration, delay, ease }}
    >
      {children}
    </Component>
  );
}

type StaggerProps = BaseProps & {
  stagger?: number;
  delay?: number;
  amount?: number;
  immediate?: boolean;
};

export function Stagger({
  as = "div",
  stagger = 0.12,
  delay = 0,
  amount = 0.15,
  immediate = false,
  className,
  children,
  id,
}: StaggerProps) {
  const Component = tags[as];
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  return (
    <Component
      id={id}
      className={className}
      variants={variants}
      initial="hidden"
      {...(immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount } })}
    >
      {children}
    </Component>
  );
}

type StaggerItemProps = BaseProps & {
  direction?: Direction;
  distance?: number;
  scale?: number;
};

export function StaggerItem({ as = "div", direction = "up", distance = 30, scale, className, children, id }: StaggerItemProps) {
  const Component = tags[as];
  return (
    <Component id={id} className={className} variants={itemVariants(direction, distance, scale)}>
      {children}
    </Component>
  );
}

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
