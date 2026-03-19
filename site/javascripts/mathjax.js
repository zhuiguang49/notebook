window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"], ["$", "$"]],
    displayMath: [["\\[", "\\]"], ["$$", "$$"]],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
  },
  svg: {
    fontCache: 'global'
  }
};

document$.subscribe(() => {
  MathJax.typesetPromise()
})