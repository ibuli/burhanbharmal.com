---
title: Worst Place to Work – A GPTW-Inspired Satire Built Entirely with Prompts
description: >-
  Our company recently earned the Great Place to Work (GPTW) certification—so I
  flipped the idea on its head and built Worst Place to Work, a tongue-in-cheek
  web app showcasing “the other side.” The real fun? I built the entire thin
topic: Shared reading
status: published
order: 12552
date: '2025-06-16'
---

Our company recently earned the _Great Place to Work_ (GPTW) certification—so I flipped the idea on its head and built **Worst Place to Work**, a tongue-in-cheek web app showcasing “the other side.”

The real fun? I built the entire thing using just prompts, thanks to [lovable.dev](https://lovable.dev), which gave me free access to Anthropic, OpenAI, and Google LLMs. No hand-coding—just straight-up vibe-driven development.

What I built:

- Light/Dark mode toggle

- User login via email or Gmail (yes, I set up Google Auth through prompts)

- Welcome emails and login notifications via email

- Custom email redirection using Cloudflare Email Routing

- A list of Fortune 500 companies with overall “ratings”

- Company detail pages showing reviews and metadata

- Admin panel to:

  - Approve new company submissions

  - Manage users (full CRUD)

  - Moderate and manage reviews

  - Oversee feedback

The backend and frontend were generated using **Supabase** and **Lovable**, letting me focus on logic and flow instead of wiring up boilerplate.

Deployment? I handled it with **Cloudflare Pages**, including environment setup, email redirects, and DNS config. All done through prompt-generated steps and trial-and-error iterations—no devops background needed.

What started as a satirical side project became a full-stack app with real-world architecture—all powered by large language models. It’s wild how far you can go with the right tools and a creative itch.

Check it out, break it, roast it. And if you’ve got feedback or ideas for making it even worse (or better), hit me up.

_LLMs aren’t just writing copy anymore. They’re writing the internet._

[Explore project](/work/worst-place-to-work)

![Post by Burhan Bharmal](/assets/posts/acthq79jmeej6k8mo3mk96j8bpqadg-0.webp)

[Referenced link: lovable.dev](https://lovable.dev/)
