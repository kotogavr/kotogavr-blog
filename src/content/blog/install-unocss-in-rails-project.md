---
title: UnoCSS for Ruby on Rails project. Bonus:icons
description: Learn how to effortlessly integrate UnoCSS into your Ruby on Rails project, elevating your web development with sleek design components.
tags: ["Ruby on Rails"]
image: { src: "./unocss-for-rails-project.png", alt: "alt text" }
publishDate: 12/05/2024
relatedPosts:
  [
    "how-to-make-passwordless-auth",
    "best-workflow-to-create-ruby-on-rails-project",
  ]
---

UnoCSS is a well-thought-out CSS framework supported by tech giants. We don't want to open our project one day and find out that we have to rewrite everything from scratch because the current CSS framework is no longer supported, do we?

So, I decided to dive into the process of installing UnoCSS in my Rails project and discovered that it's not only useful but also educational. We'll be learning how to write rake tasks.

There is no official documentation on how to set up UnoCSS specifically on Rails, but there is an answer [how to install UnoCSS for traditional backends like Laravel](https://unocss.dev/integrations/cli).

## Implementing UnoCSS

We start by generating new rails project with `rails new` command:

```bash
rails new superunocss -J -T -a propshaft --skip-jbuilder --skip-action-mailbox
```

In 'lib/tasks' create new file called `unocss.rake` and add the following code:

```ruby
# lib/tasks/unocss.rake

namespace :unocss do
  task dev: :environment do
    run_unocss('-w')
  end

  task build: :environment do
    run_unocss('-m')
  end

  def run_unocss(extra_args = '')
    system(
      'bunx', '--bun',
      'unocss',
      'app/views/**/*.html.erb',
      '-o', 'app/assets/builds/application.css',
      extra_args
    )
  end
end

Rake::Task['assets:precompile'].enhance(['unocss:build'])
```

If you have npm installed globally in your application, replace the bun command with the npm command.

The similar way you can apply your UnoCSS also to any file location like `app/views/**/*.rb`, `app/helpers/**/*.rb`,`app/assets/stylesheets/**/*.css` and `app/javascript/**/*.js`

This is the task we will execute every time we run our server. Now, we need to tell Foreman (I personally use and recommend [Hivemind](https://evilmartians.com/opensource/hivemind) instead).

Create `Procfile` file in root directory and add the following:

```bash

web: bin/rails server -p 3000
css: bin/rake unocss:dev
```

Your UnoCSS should work as expected if you run Foreman (or Hivemind). You can also set up a config file to add custom instructions. Create `uno.config.js` (even if you don't have JS installed in your Rails project) and add your custom instructions as shown in the example below:

```js
// uno.config.js

import { defineConfig, presetUno } from "unocss";

export default defineConfig({
  presets: [presetUno()],
  theme: {
    colors: {
      primary: "#1d4ed8", // Custom primary color
      secondary: "#9333ea", // Custom secondary color
      accent: "#f43f5e", // Custom accent color
      neutral: "#3d4451", // Custom neutral color
      base: "#ffffff", // Base color
      info: "#3b82f6", // Info color
      success: "#10b981", // Success color
      warning: "#f59e0b", // Warning color
      error: "#ef4444", // Error color
    },
    fontFamily: {
      sans: ["Inter", "ui-sans-serif", "system-ui"], // adding fonts takes more code but this is just an example
      serif: ["Georgia", "ui-serif", "serif"],
      mono: ["Menlo", "ui-monospace", "SFMono-Regular"],
    },
    extend: {
      spacing: {
        128: "32rem", // Custom spacing
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem", // Custom border radius
      },
    },
  },
  shortcuts: [
    {
      btn: "py-2 px-4 font-semibold rounded-lg shadow-md",
      "btn-primary": "text-white bg-primary hover:bg-primary-dark",
      "btn-secondary": "text-white bg-secondary hover:bg-secondary-dark",
    },
  ],
  rules: [
    ["m-t-1", { marginTop: "0.25rem" }],
    ["p-2", { padding: "0.5rem" }],
  ],
});
```

Now you can test it.

## Adding icons

Now we can add icons to our project. This is the easiest part. You can add any icon from this [site](https://icones.js.org/) from various packs.

All we need is just to update the current `uno.config.js` file like so:

```js
// uno.config.js

import { defineConfig, presetIcons, presetUno } from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      cdn: "https://esm.sh/",
    }),
  ],

// the rest of the code
```

We import `presetIcons` and use esm.sh to load our icons via CDN. Now, you can add any icon you want like this: `<div class="i-ph-acorn-duotone w-16 h-16 text-green-500"></div>`

That's it! Don't forget to add the `application.css` file to `.gitignore`.

```bash
# .gitignore

app/assets/builds
```

Happy coding!
