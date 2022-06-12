# Frontend Mentor - Crowdfunding product page solution

This is a solution to the [Crowdfunding product page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/crowdfunding-product-page-7uvcZe7ZR). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
### Links

- Solution URL: [Solution Url](https://www.frontendmentor.io/challenges/four-card-feature-section-weK1eFYK/hub/four-card-feature-section-wzBhzXh2gW)
- Live Site URL: [Live Url](https://puppychan.github.io/FourCardFeatureSection-FrontendMentor/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- SASS - SCSS

### What I learned

I learn how to make image responsive this time without having to use css (only on html)
```html
    <picture class="header-img">
      <source media="(min-width: 1440px)" srcset="./images/image-hero-desktop.jpg">
      <img srcset="./images/image-hero-mobile.jpg" alt="Background Img">
    </picture>
```
- source is when in desktop
- img is when on mobile or normal window

Set disable state for button using js, convert number to string having comma
```js
button.setAttribute("disabled", true)
number.toLocaleString();
```

To style the radio input
```css
input[type="radio"] {
  -webkit-appearance: none;
  appearance: none;
}
```
- Hide auto style of radio input 
- To style the checked style of the radio input
```css
input[type="radio"] {
  /* to style the checked and make sure it at the center of the circle without using position relative and absolute */
  display: grid;
}
input[type="radio"]:checked::after {
  /* position center */
  justify-self: center;
  align-self: center;

  content: "";
  /* style the circle */
  width: 2em;
  height: 2em;
  border-radius: 50%;

  background-color: red;
}
```

To make the child ignore the parents' padding -> use negative margin onto the children

To call function inside the event listener
```js
function callFunction() {
  console.log(event);
}
element.addEventListener("click", callFunction);
```
### Continued development

I think I will make 4 cards spinnable if I have time.

## Author
- Github - [Nhung Tran](https://github.com/Puppychan)
- Another me on Github - [Matsuri](https://github.com/gunjou01)
- Frontend Mentor - [@Puppychan](https://www.frontendmentor.io/profile/Puppychan)
- LinkedIn [Nhung Tran](https://www.linkedin.com/in/nhung-tran-528396210/)
