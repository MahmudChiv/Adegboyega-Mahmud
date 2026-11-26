import type { CSSProperties } from "react";

export interface LanyardProps {
  frontImage?: string;
  backImage?: string;
  focalX?: number;
  onReady?: () => void;
  imageFit?: "cover" | "contain";
  cardColor?: string;
  orientation?: "portrait" | "landscape";
  finish?: "glossy" | "matte" | "holographic" | "metallic";
  cornerRadius?: number;
  size?: number;
  anchor?: "left" | "center" | "right";
  strapLength?: number;
  strapImage?: string;
  strapColor?: string;
  strapWidth?: number;
  metal?: "graphite" | "silver" | "gold";
  gravity?: number;
  damping?: number;
  elasticity?: number;
  breeze?: number;
  interactive?: boolean;
  intro?: boolean;
  className?: string;
  style?: CSSProperties;
}
export default function Lanyard(props: LanyardProps): React.JSX.Element;
