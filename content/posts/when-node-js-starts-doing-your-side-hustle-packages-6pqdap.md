---
title: When Node.js starts doing your “side-hustle” packages
description: >-
  Remember those days when you’d install yet another npm package just to get
  something simple done — fetch, UUIDs, color your console logs? Well, Node.js
  is having an identity crisis — it’s picking up new superpowers and quietly ret
topic: Shared reading
status: published
order: 9624
date: '2025-10-16'
---

Remember those days when you’d install _yet another_ npm package just to get something simple done — fetch, UUIDs, color your console logs? Well, Node.js is having an identity crisis — it’s picking up new superpowers and quietly retiring your favorite little helpers. 😜

**Some highlights:**

- fetch() is now global — no more node-fetch baggage

- crypto.randomUUID() gives you UUIDs out of the box

- fs.rm({ recursive: true }) becomes your go-to “delete folders” tool

- Built-in test runner with node:test steps in

- Stylish console text? Node’s own util.styleText() says, “Hold my beer.”

And that’s just scratching the surface. The post covers experimental stuff too — built-in SQLite, URLPattern, --env-file support, and more.

If you’re modernizing your stack, cutting down dependencies, or trying to keep your node\_modules folder from giving you nightmares, this is a must-read.

👉 Read it here: [https://nodesource.com/blog/nodejs-features-replacing-npm-packages](https://nodesource.com/blog/nodejs-features-replacing-npm-packages)

Let me know — which npm package will you retire first in favor of built-in Node magic?
