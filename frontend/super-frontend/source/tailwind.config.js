// Tailwind's recommend ordering of variants:
// 'responsive', 'group-hover', 'group-focus', 'focus-within', 'first',
// 'last', 'odd', 'even', 'hover', 'focus', 'active', 'visited', 'disabled'
module.exports = {
  theme: {
    extend: {},
  },
  variants: {
    backgroundColor: ({ after }) =>
      after(["group-hover", "checked"], "responsive"),
    borderColor: ({ after }) => after(["group-hover", "checked"], "responsive"),
    borderRadius: ({ after }) => after(["first", "last"], "responsive"),
    padding: ({ after }) => after(["first", "last"]),
  },
  plugins: [],
};
