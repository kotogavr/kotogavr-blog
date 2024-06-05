---
title: "Ruby on Rails DaisyUI Setup Without JS. The Most Elegant Way. Bonus: icons"
description: Easily set up DaisyUI in your Rails project with my guide. Perfect for those who want to avoid unnecessary Node.js packages and maintain a clean interface written in Ruby. No need to install JavaScript at all. Enjoy a streamlined, efficient setup without the bloat.
tags: ["Ruby on Rails"]
image: { src: "./ruby-on-rails-daisyui-setup.png", alt: "alt text" }
publishDate: 05/06/2024
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

Now you can fix your view and run the server to see changes.

## DaisyUI Setup

Run setup using this command with bun or npm:

```bash
npm i -D daisyui@latest

# or

bun add -D daisyui@latest
```

In `tailwind.config.js` add DaisyUI config:

```js
module.exports = {
  //...
  plugins: [require("daisyui")],
};
```

In order make it work we need to upgrade our rake task:

```ruby
# lib/tasks/tailwindcss.rake

# ...
     extra_args
    )
  end
end

Rake::Task['assets:precompile'].enhance(['tailwindcss:build'])

```

Now, experiment with DaisyUI classes and themes to ensure everything works well.

## Icons Setup

I'll use [iconify sets](https://icon-sets.iconify.design/), which offer a wide range of icons and packs, including animated, social, colorful, and more.

There's a [plugin](https://github.com/iconify/iconify/tree/main/plugins/tailwind) for Tailwind CSS that enables streamlined Iconify integration.

First, we install the plugin using `npm` / `bun`:

```bash
npm i -D @iconify/tailwind

# or

bun add @iconify/tailwind
```

In tailwind.config.js we add:

```js
//tailwind.config.js

//...
 plugins: [
    require("@iconify/tailwind").addDynamicIconSelectors(),
//...
```

You can read how to use [addDynamicIconSelectors() here](https://iconify.design/docs/usage/css/tailwind/dynamic/).

Next, we'll download the required icon set. For this example, I'll download the Iconamoon icons. You can choose any set from the [ iconify sets ](https://icon-sets.iconify.design/) by running a similar command: @iconify-json/[iconify set]. For instance, to get Iconamoon, I'll use this command:

```bash
npm i -D @iconify-json/iconamoon

#or

bun add @iconify-json/iconamoon
```

Syntax of class names is this: `icon-[{prefix}--{name}]`, where `{prefix}` is icon set prefix (iconamoon in my case), `{name}` is icon name.

```html
<span class="icon-[ph--alarm-duotone] text-2xl"></span>
<span class="icon-[fluent-emoji-flat--alarm-clock] text-sm"></span>
<span class="icon-[carbon--edit-off]"></span>
```

But, again, check [docs](https://iconify.design/docs/usage/css/tailwind/dynamic/) for references.

That's it! Run foreman or hivemind to test it out.

Happy coding!
