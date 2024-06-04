---
title: Ruby on Rails DaisyUI Setup Without JS. The Most Elegant Way
description: Easily set up DaisyUI in your Rails project with my guide. Perfect for those who want to avoid unnecessary Node.js packages and maintain a clean interface written in Ruby. No need to install JavaScript at all. Enjoy a streamlined, efficient setup without the bloat.
tags: ["Ruby on Rails"]
image: { src: "./ruby-on-rails-daisyui-setup.png", alt: "alt text" }
publishDate: 04/06/2024
relatedPosts:
  [
    "install-unocss-in-rails-project",
    "best-workflow-to-create-ruby-on-rails-project",
  ]
---

I was looking for a solution to set up DaisyUI, but encountered a problem. If you set up TailwindCSS as a gem, you'll get the standalone executable version, which cannot work with other libraries. If you set up a project with a JS bundler like this: `rails new -c tailwindcss -j bun`

You will need to set up everything with JavaScript. Personally, I don't use JS packages in Ruby on Rails; I stick to Ruby language and want to maintain this consistency while developing. The only method we can use here is to set up TailwindCSS manually as we want it. This is a very easy way, especially if you've already read my previous post about [ setting up UnoCSS with Ruby on Rails ](install-unocss-in-rails-project). The logic will be the same. So let's start.

## Tailwind Setup

In ‘lib/tasks’ create new file called tailwindcss.rake and add the following code:

```ruby
# lib/tasks/tailwindcss.rake

namespace :tailwindcss do
  task dev: :environment do
    run_tailwindcss('-w')
  end

  task build: :environment do
    run_tailwindcss('-m')
  end
  def run_tailwindcss(extra_args = '')
    system(
      'bunx', '--bun',
      'tailwindcss',
      '-i', 'app/assets/stylesheets/application.tailwind.css',
      '-o', 'app/assets/builds/application.css',
      extra_args
    )
  end
end
```

If you have npm installed globally in your application, replace the bun command with the npm command.

This is the task we will execute every time we run our server. Now, we need to tell it to Foreman (or I personally use and recommend [ Hivemind ](https://evilmartians.com/opensource/hivemind) instead).

Create Procfile file in root directory and add the following:

```bash
web: bin/rails server -p 3000
css: bin/rake tailwindcss:dev
```

Run these commands using `npx` or `bunx` to setup tailwind and initialize tailwindcss config file

```bash
bun add tailwindcss

bunx tailwindcss init
```

In config file add the content similar to what you added to rake task:

```js
//tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/views/**/*.rb"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Now rename `application.css` to `application.tailwind.css` and add the following:

```css
/* app/assets/stylesheets/application.tailwindcss.css */

@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

Now you can run our server to see
