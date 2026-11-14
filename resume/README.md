# Résumé source

`resume.html` is the source of `public/Resume.pdf`. The fonts are embedded in the PDF and are not stored in the repo.

```sh
python3 resume/extract-fonts.py   # writes resume/fonts/*.ttf from the current PDF
node resume/print.cjs             # prints resume.html back to public/Resume.pdf
```

Note: the embedded fonts are subsets, so new text can only use characters already in the résumé
(for example the body font has no K, Y, Z, 6 or semicolon). Check new text before printing.
