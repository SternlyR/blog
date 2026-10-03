# Wonder & Wander Toys website

A standalone static site (plain HTML, CSS and JS, no build step) for Wonder & Wander Toys, built around the shop-window characters: the frog, mushroom, bird, oak leaf and ladybug.

## Run it locally

```
cd wonder-wander
python3 -m http.server 8000
```

Then open http://localhost:8000.

## What's here

- `index.html`: the page (hero shop window, featured finds, shop by shelf, Meet the Crew, about, workshops, visit info, Stay in the Loop signup)
- `styles.css`: brand palette and layout
- `script.js`: mobile menu, tappable characters, newsletter form and scroll reveals
- `characters/`: SVG versions of the five brand characters (reusable anywhere)
- `fonts/`: self-hosted Mystery Quest (display) and Fredoka (body), both SIL Open Font License
- `brand/storefront-window.jpg`: photo of the shop window

## Still to fill in

Search `index.html` for `TODO` and `[` placeholders:

- Street address, hours, phone, email
- Featured product photos, prices and links
- Workshop names, dates, ages and booking links
- Links to the Square Online store (Shop All, Sign In, Cart, collections)
- Newsletter provider
- Social links
