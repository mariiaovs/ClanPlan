import { createGlobalStyle } from "styled-components";
import { Handlee } from "next/font/google";

const handlee = Handlee({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-handlee",
});

export const lightTheme = {
  background: "#FFFFFF",
  text: "#344648",
  button: "#e6e4e4",
  buttonActive: "#bbf1f9ff",
};

export const darkTheme = {
  background: "#344648",
  text: "#FFFFFF",
  button: "#344648",
  buttonActive: "#065465",
};

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
  margin: 0;
  }

  :root {
    --color-background:${(props) => props.theme.background}; 
    --color-font:${(props) => props.theme.text};
    --color-icon:#cccaca;
    --color-footer-signature:#a7a3a3;
    --color-alert:#ff0000;
    --color-button-active:${(props) => props.theme.buttonActive};
    --color-button:${(props) => props.theme.button};
    --font-handlee:${handlee.style.fontFamily};
  }

  body {
    margin: auto;
    margin-top:5rem;
    color: var(--color-font);
    font-family: Helvetica;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    max-width: 375px;
    background-color: var(--color-background);
  }

  img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
  color: inherit;
  background-color: var(--color-background);
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

h2 {
  font-family: var(--font-handlee);
}

#root, #__next {
  isolation: isolate;
}

a {
  text-decoration: none;
  color:inherit;
}
a:hover {
  cursor: pointer;
}

 button:hover {
  cursor: pointer;
  background-color: var(--color-button-active);
}
  

/* react-big-calendar styles: */

.rbc-today {
    background-color: var(--color-button-active);
}

.rbc-event {
  background-color: var(--color-font);
  font-size: 0.5rem;
  font-weight: 700;
  padding: 0.2rem;
}

.rbc-row-segment .rbc-event-content {
  text-overflow: clip;
}

.rbc-time-view {
.rbc-label {
display: none;
}
.rbc-allday-cell {
height: auto;
max-height: unset;
}
.rbc-time-content {
display: none;
}
}

.rbc-button-link span {
  white-space: normal;
  text-overflow: clip;
}

.rbc-addons-dnd-row-body {
  height: 296px;
}

.rbc-btn-group button {
  color: var(--color-font);
}

.rbc-btn-group .rbc-active {
  color: #344648;
}


/* MultiSelect styles: */

span.chip {
  background-color: var(--color-button-active);
  color: var(--color-font);
}

.multiSelectContainer li.option:hover {
  background-color: var(--color-button-active);
  color: var(--color-background);
}

multiselectContainer {
	background-color: var(--color-background);
  color: var(--color-font);
  }

.optionContainer {
	background-color: var(--color-background);
  }

img.icon_cancel {
  stroke: var(--color-font);
}

/* Tostify styles */

.Toastify__progress-bar--success {
  background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(224,253,29,1) 50%, rgba(252,176,69,1) 100%);
}

.Toastify__toast{
box-shadow: 5px 5px 15px 5px #000000;
}
 
.Toastify__toast-container--top-center {
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
}


`;
