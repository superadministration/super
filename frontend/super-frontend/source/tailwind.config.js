const varyingColors =
  "(gray|red|orange|yellow|green|teal|blue|indigo|purple|pink)-\\d+";
const constantColors = "(inherit|current|transparent|black|white)";
const matchAllColors = `(${varyingColors}|${constantColors})`;
const matchAnyCss = `[a-z0-9\\\\/\\.]+`;
const matchAnyCssDanger = `[a-z0-9\\\\/\\.-]+`;

const responsiveOnly = ["responsive"];
const common = [
  "responsive",
  "dark",
  "group-hover",
  "focus-within",
  "hover",
  "focus",
];
const commonNoDark = [
  "responsive",
  "group-hover",
  "focus-within",
  "hover",
  "focus",
];
const uncommonFocusWithinFocus = ["responsive", "focus-within", "focus"];

const variantsAndPatterns = [
  {
    // accessibility,
    pattern: `(not-)?sr-only`,
    variants: uncommonFocusWithinFocus,
  },
  {
    // alignContent
    pattern: `content-(normal|center|start|end|between|around|evenly|baseline|stretch)`,
    variants: responsiveOnly,
  },
  {
    // alignItems
    pattern: `items-(start|end|center|baseline|stretch)`,
    variants: responsiveOnly,
  },
  {
    // alignSelf
    pattern: `self-(auto|start|end|center|stretch|baseline)`,
    variants: responsiveOnly,
  },
  {
    // animation
    pattern: `animate-(none|spin|ping|pulse|bounce)`,
    variants: responsiveOnly,
  },
  {
    // appearance
    pattern: `appearance-none`,
    variants: responsiveOnly,
  },
  {
    // backdropBlur
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // backdropBrightness
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // backdropContrast
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // backdropFilter
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // backdropGrayscale
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // backdropHueRotate
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // backdropInvert
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // backdropOpacity
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // backdropSaturate
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // backdropSepia
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // backgroundAttachment
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // backgroundBlendMode
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // backgroundClip
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // backgroundColor
    pattern: `bg-${matchAllColors}`,
    variants: common,
  },
  {
    // backgroundImage
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // backgroundOpacity
    pattern: null,
    variants: common,
  },
  {
    // backgroundPosition
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // backgroundRepeat
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // backgroundSize
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // backgroundOrigin
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // blur
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // borderCollapse
    pattern: `border-(collapse|separate)`,
    variants: responsiveOnly,
  },
  {
    // borderColor
    pattern: `border-${matchAllColors}`,
    variants: common,
  },
  {
    // borderOpacity
    pattern: null,
    variants: common,
  },
  {
    // borderRadius
    pattern: `rounded(-(s|e|t|r|b|l|ss|se|ee|es|tl|tr|br|bl))?(-(none|sm|md|lg|xl|2xl|3xl|full))?`,
    variants: responsiveOnly.concat(["first", "last"]),
  },
  {
    // borderStyle
    pattern: `border-(solid|dashed|dotted|double|hidden|none)`,
    variants: responsiveOnly,
  },
  {
    // borderWidth
    pattern: `border(-(x|y|s|e|t|r|b|l))?(-\\d+)?`,
    variants: responsiveOnly.concat(["first", "last"]),
  },
  {
    // boxDecorationBreak
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // boxShadow
    pattern: `shadow(-(sm|md|lg|xl|2xl|inner|none))?`,
    variants: ["responsive", "group-hover", "focus-within", "hover", "focus"],
  },
  {
    // boxSizing
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // brightness
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // clear
    pattern: `clear-(left|right|both|none)`,
    variants: responsiveOnly,
  },
  {
    // container
    pattern: `container`,
    variants: responsiveOnly,
  },
  {
    // contrast
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // cursor
    pattern: `cursor-${matchAnyCssDanger}`,
    variants: responsiveOnly,
  },
  {
    // display
    pattern: `(block|inline-block|inline|flex|inline-flex|table|inline-table|table-caption|table-cell|table-column|table-column-group|table-footer-group|table-header-group|table-row-group|table-row|flow-root|grid|inline-grid|contents|list-item|hidden)`,
    variants: responsiveOnly,
  },
  {
    // divideColor
    pattern: null,
    variants: ["responsive", "dark"],
  },
  {
    // divideOpacity
    pattern: null,
    variants: ["responsive", "dark"],
  },
  {
    // divideStyle
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // divideWidth
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // dropShadow
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // fill
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // filter
    pattern: `filter(-none)?`,
    variants: responsiveOnly,
  },
  {
    // flex
    pattern: `flex-(1|auto|initial|none)`,
    variants: responsiveOnly,
  },
  {
    // flexDirection
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // flexGrow
    pattern: `grow(-0)?`,
    variants: responsiveOnly,
  },
  {
    // flexShrink
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // flexWrap
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // float
    pattern: `float-(right|left|none)`,
    variants: responsiveOnly,
  },
  {
    // fontFamily
    pattern: `font-(sans|serif|mono)`,
    variants: responsiveOnly,
  },
  {
    // fontSize
    pattern: `text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)`,
    variants: responsiveOnly,
  },
  {
    // fontSmoothing
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // fontStyle
    pattern: `(not-)?italic`,
    variants: responsiveOnly,
  },
  {
    // fontVariantNumeric
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // fontWeight
    pattern: `font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)`,
    variants: responsiveOnly,
  },
  {
    // gap
    pattern: `(gap|gap-x|gap-y)-${matchAnyCss}`,
    variants: responsiveOnly,
  },
  {
    // gradientColorStops
    pattern: null,
    variants: ["responsive", "dark", "hover", "focus"],
  },
  {
    // grayscale
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // gridAutoColumns
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // gridAutoFlow
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // gridAutoRows
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // gridColumn
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // gridColumnEnd
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // gridColumnStart
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // gridRow
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // gridRowEnd
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // gridRowStart
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // gridTemplateColumns
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // gridTemplateRows
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // height
    pattern: `h-${matchAnyCssDanger}`,
    variants: responsiveOnly,
  },
  {
    // hueRotate
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // inset
    pattern: `(inset|inset-x|inset-y|start|end|top|right|bottom|left)-${matchAnyCssDanger}`,
    variants: responsiveOnly,
  },
  {
    // invert
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // isolation
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // justifyContent
    pattern: `justify-(normal|start|end|center|between|around|evenly|stretch)`,
    variants: responsiveOnly,
  },
  {
    // justifyItems
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // justifySelf
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // letterSpacing
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // lineHeight
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // listStylePosition
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // listStyleType
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // margin
    pattern: `-?(m|mx|my|ms|me|mt|mr|mb|ml)-${matchAnyCssDanger}`,
    variants: responsiveOnly,
  },
  {
    // maxHeight
    pattern: `max-h-${matchAnyCssDanger}`,
    variants: responsiveOnly,
  },
  {
    // maxWidth
    pattern: `max-w-${matchAnyCssDanger}`,
    variants: responsiveOnly,
  },
  {
    // minHeight
    pattern: `min-h-${matchAnyCssDanger}`,
    variants: responsiveOnly,
  },
  {
    // minWidth
    pattern: `min-w-${matchAnyCssDanger}`,
    variants: responsiveOnly,
  },
  {
    // mixBlendMode
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // objectFit
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // objectPosition
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // opacity
    pattern: null,
    variants: ["responsive", "group-hover", "focus-within", "hover", "focus"],
  },
  {
    // order
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // outline
    pattern: null,
    variants: uncommonFocusWithinFocus,
  },
  {
    // overflow
    pattern: `overflow-(auto|hidden|clip|visible|scroll|x-auto|y-auto|x-hidden|y-hidden|x-clip|y-clip|x-visible|y-visible|x-scroll|y-scroll)`,
    variants: responsiveOnly,
  },
  {
    // overscrollBehavior
    pattern: `overscroll-(auto|contain|none|y-auto|y-contain|y-none|x-auto|x-contain|x-none)`,
    variants: responsiveOnly,
  },
  {
    // padding
    pattern: `-?(p|px|py|ps|pe|pt|pr|pb|pl)-${matchAnyCssDanger}`,
    variants: responsiveOnly.concat(["first", "last"]),
  },
  {
    // placeContent
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // placeItems
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // placeSelf
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // placeholderColor
    pattern: null,
    variants: ["responsive", "dark", "focus"],
  },
  {
    // placeholderOpacity
    pattern: null,
    variants: ["responsive", "dark", "focus"],
  },
  {
    // pointerEvents
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // position
    pattern: /^(static|fixed|absolute|relative|sticky)$\b/,
    variants: responsiveOnly,
  },
  {
    // resize
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // ringColor
    pattern: null,
    variants: ["responsive", "dark", "focus-within", "focus"],
  },
  {
    // ringOffsetColor
    pattern: null,
    variants: ["responsive", "dark", "focus-within", "focus"],
  },
  {
    // ringOffsetWidth
    pattern: null,
    variants: uncommonFocusWithinFocus,
  },
  {
    // ringOpacity
    pattern: null,
    variants: ["responsive", "dark", "focus-within", "focus"],
  },
  {
    // ringWidth
    pattern: null,
    variants: uncommonFocusWithinFocus,
  },
  {
    // rotate
    pattern: null,
    variants: ["responsive", "hover", "focus"],
  },
  {
    // saturate
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // scale
    pattern: null,
    variants: ["responsive", "hover", "focus"],
  },
  {
    // sepia
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // skew
    pattern: null,
    variants: ["responsive", "hover", "focus"],
  },
  {
    // space
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // stroke
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // strokeWidth
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // tableLayout
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // textAlign
    pattern: `text-(left|center|right|justify|start|end)`,
    variants: responsiveOnly,
  },
  {
    // textColor
    pattern: `text-${matchAllColors}`,
    variants: common,
  },
  {
    // textDecoration
    pattern: `(underline|overline|line-through|no-underline)`,
    variants: commonNoDark,
  },
  {
    // textOpacity
    pattern: null,
    variants: common,
  },
  {
    // textOverflow
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // textTransform
    pattern: `(uppercase|lowercase|capitalize|normal-case)`,
    variants: responsiveOnly,
  },
  {
    // transform
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // transformOrigin
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // transitionDelay
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // transitionDuration
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // transitionProperty
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // transitionTimingFunction
    pattern: null,
    variants: responsiveOnly,
  },
  {
    // translate
    pattern: null,
    variants: ["responsive", "hover", "focus"],
  },
  {
    // userSelect
    pattern: `select-(none|text|all|auto)`,
    variants: responsiveOnly,
  },
  {
    // verticalAlign
    pattern: `align-(baseline|top|middle|bottom|text-top|text-bottom|sub|super)`,
    variants: responsiveOnly,
  },
  {
    // visibility
    pattern: `(visible|invisible|collapse)`,
    variants: responsiveOnly,
  },
  {
    // whitespace
    pattern: `whitespace-(normal|nowrap|pre|pre-line|pre-wrap|break-spaces)`,
    variants: responsiveOnly,
  },
  {
    // width
    pattern: `w-${matchAnyCssDanger}`,
    variants: responsiveOnly,
  },
  {
    // wordBreak
    pattern: `break-(normal|words|all|keep)`,
    variants: responsiveOnly,
  },
  {
    // zIndex
    pattern: `z-(0|10|20|30|40|50|auto)`,
    variants: uncommonFocusWithinFocus,
  },
];

const safelist = variantsAndPatterns
  .filter(obj => obj.pattern !== null)
  .map(function(obj) {
    if (typeof obj.pattern === "string") {
      let pattern = obj.pattern;
      pattern = pattern.replace(/\(/, "(?:");
      obj.pattern = new RegExp(`^${pattern}$`);
    }
    return obj;
  })
  .map(function(obj) {
    const index = obj.variants.indexOf("responsive");
    if (index >= 0) {
      // the full list of responsive variants are: "sm", "md", "lg", "xl", "2xl"
      obj.variants.splice(index, 1, "sm", "md", "lg");
    }
    return obj;
  });
console.log({ safelist });

module.exports = {
  // content: ["../../../app/views/**/*"],
  safelist: safelist,
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",

      black: "#000",
      white: "#fff",

      gray: {
        100: "#f7fafc",
        200: "#edf2f7",
        300: "#e2e8f0",
        400: "#cbd5e0",
        500: "#a0aec0",
        600: "#718096",
        700: "#4a5568",
        800: "#2d3748",
        900: "#1a202c",
      },
      red: {
        100: "#fff5f5",
        200: "#fed7d7",
        300: "#feb2b2",
        400: "#fc8181",
        500: "#f56565",
        600: "#e53e3e",
        700: "#c53030",
        800: "#9b2c2c",
        900: "#742a2a",
      },
      orange: {
        100: "#fffaf0",
        200: "#feebc8",
        300: "#fbd38d",
        400: "#f6ad55",
        500: "#ed8936",
        600: "#dd6b20",
        700: "#c05621",
        800: "#9c4221",
        900: "#7b341e",
      },
      yellow: {
        100: "#fffff0",
        200: "#fefcbf",
        300: "#faf089",
        400: "#f6e05e",
        500: "#ecc94b",
        600: "#d69e2e",
        700: "#b7791f",
        800: "#975a16",
        900: "#744210",
      },
      green: {
        100: "#f0fff4",
        200: "#c6f6d5",
        300: "#9ae6b4",
        400: "#68d391",
        500: "#48bb78",
        600: "#38a169",
        700: "#2f855a",
        800: "#276749",
        900: "#22543d",
      },
      teal: {
        100: "#e6fffa",
        200: "#b2f5ea",
        300: "#81e6d9",
        400: "#4fd1c5",
        500: "#38b2ac",
        600: "#319795",
        700: "#2c7a7b",
        800: "#285e61",
        900: "#234e52",
      },
      blue: {
        100: "#ebf8ff",
        200: "#bee3f8",
        300: "#90cdf4",
        400: "#63b3ed",
        500: "#4299e1",
        600: "#3182ce",
        700: "#2b6cb0",
        800: "#2c5282",
        900: "#2a4365",
      },
      indigo: {
        100: "#ebf4ff",
        200: "#c3dafe",
        300: "#a3bffa",
        400: "#7f9cf5",
        500: "#667eea",
        600: "#5a67d8",
        700: "#4c51bf",
        800: "#434190",
        900: "#3c366b",
      },
      purple: {
        100: "#faf5ff",
        200: "#e9d8fd",
        300: "#d6bcfa",
        400: "#b794f4",
        500: "#9f7aea",
        600: "#805ad5",
        700: "#6b46c1",
        800: "#553c9a",
        900: "#44337a",
      },
      pink: {
        100: "#fff5f7",
        200: "#fed7e2",
        300: "#fbb6ce",
        400: "#f687b3",
        500: "#ed64a6",
        600: "#d53f8c",
        700: "#b83280",
        800: "#97266d",
        900: "#702459",
      },
    },
  },
  variants: {},
  plugins: [],
};
