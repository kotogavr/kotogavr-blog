---
title: Install UnoCSS in Ruby on Rails project. Bonus:icons
description: Learn how to effortlessly integrate UnoCSS into your Ruby on Rails project, elevating your web development with sleek design components.
tags: ["Ruby on Rails"]
image: { src: "./install-unocss-in-rails-project.png", alt: "alt text" }
publishDate: 12/05/2024
relatedPosts:
  [
    "how-to-make-passwordless-auth",
    "best-workflow-to-create-ruby-on-rails-project",
  ]
---

UnoCSS is a well-thought-out CSS framework supported by tech giants (we don’t want to open our own project one day and find out that we have to rewrite everything from scratch because the current CSS framework is no longer supported, do we?).

So I decided to run into the process of installing UnoCSS in my Rails project and found out that it's not only useful but educative: we will be learning how to write rake tasks.

We start by generating new rails project with `rails new` command:

```bash
rails new superunocss -J -T -a propshaft --skip-jbuilder --skip-action-mailbox
```

Install unocss globally

```bash
bunx --bun @unocss/cli
```

You can get an error: "ERROR No glob patterns, try unocss <path/to/\*_/_>" but you can safely ignore it.
