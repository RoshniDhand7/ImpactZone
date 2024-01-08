import { keyframes } from 'styled-components';
import { fadeInRight, fadeInLeft, fadeIn } from 'react-animations';

export const SlideInLeftAnimation = keyframes`${fadeInLeft}`;
export const SlideInRightAnimation = keyframes`${fadeInRight}`;
export const fadeInAnimation = keyframes`${fadeIn}`;
