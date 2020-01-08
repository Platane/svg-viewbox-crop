# SVG Viewbox Crop

> Rewrite svg path to fit into another viewbox


Rewrite
```svg
<svg viewBox="20.3 37.4 34.5 45.8">
  <path d="M 23.9 70.64 L 44.6 43.16 L 51.5 79.8 z" />
</svg>
```

into
```svg
<svg viewBox="0 0 1 1">
  <path d="M 0.1 0.8 L 0.8 0.1 L 0.9 0.9 z" />
</svg>
```

because it looks better and it's easier to manipulate

