document$.subscribe(() => {
    renderMathInElement(document.body, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false }, // 这一行专门用来接管被 MkDocs 转换后的行内公式
        { left: "\\[", right: "\\]", display: true }   // 这一行专门用来接管被 MkDocs 转换后的块级公式
      ],
    })
  })