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
- `shop.html`, `shop.js`: Shop All page with category chips, search, sort, "Almost gone!" stickers and an add-to-cart counter. Links like `shop.html?cat=outdoor` open straight to a category.
- `products.js`: the product list and categories the Shop All page reads from
- `styles.css`: brand palette and layout (shared by both pages)
- `script.js`: mobile menu, tappable characters, newsletter form and scroll reveals
- `characters/`: SVG versions of the five brand characters (reusable anywhere)
- `fonts/`: self-hosted Mystery Quest (display) and Fredoka (body), both SIL Open Font License
- `brand/storefront-window.jpg`: photo of the shop window

## Still to fill in

Search `index.html` for `TODO` and `[` placeholders:

- Street address, hours, phone, email
- The full product catalog in `products.js` (photos, prices, ages, stock); only 6 of the 223 items are in so far
- Featured product photos, prices and links
- Checkout: the Add buttons only count items for now
- Workshop names, dates, ages and booking links
- Links to the Square Online store (Shop All, Sign In, Cart, collections)
- Newsletter provider
- Social links
