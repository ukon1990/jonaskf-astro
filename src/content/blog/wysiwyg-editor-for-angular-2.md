---
title: "WYSIWYG editor for Angular 2+"
description: "A guide to integrating MediumEditor, a minimal WYSIWYG editor, into Angular applications with setup instructions and practical examples."
pubDate: "Nov 24 2017"
updatedDate: "Nov 29 2017"
heroImage: "../../assets/blog-placeholder-2.jpg"
draft: false
tags: ["Angular", "WYSIWYG", "MediumEditor", "Frontend Development"]
---

So I came across this library while looking for a minimal WYSIWYG editor (What you see is what you get) for a customers Angular project.

The library is called [MediumEditor](https://yabwe.github.io/medium-editor/). It is under the MIT license (free), and was not too much of a hassle setting up.

To get started, run `npm i --save medium-editor`. Alternatively you could just add the CDN to index.html.

For it to be available to your application you need to add it's script and style path in the `.angular-cli.json` scripts and styles variable like this:

```json
...
"styles": [
  "sass/styles.scss",
  "../node_modules/medium-editor/dist/css/medium-editor.min.css"
],
"scripts": [
  "../node_modules/medium-editor/dist/js/medium-editor.min.js"
]
...
```

In the component(s) you wish to use it you import MediumEditor like this:

```typescript
import * as MediumEditor from 'medium-editor';
```

Create the HTML element you wish the editor to reside within into your template file and give it a class or id.

```html
<div class="editor"></div>
```

In order to initiate MediumEditor you do it via the AfterViewInit interface like this:

```typescript
ngAfterViewInit() {
  this.medium = new MediumEditor('.editor');
  // If you wish to add existing HTML into it, you can do it like this.
  this.medium
    .setContent('<h2>MediumEditor</h2>');
}
```

If you have a need for it to update the contents of the editor upon external change events (@Input), simply use the `setContent()` function in the `ngOnChanges` function from the `OnChanges`.

```typescript
ngOnChanges(change) {
  if (change.variable && change.variable.currentValue && this.medium) {
    this.medium
      .setContent(change.variable.currentValue);
  }
}
```

Now, lets say you wish to fetch the content of the editor. To do this use the `getContent(index)` function.

In my case, I only have one editor open at a time so I just pass it 0 as the index.

```typescript
this.medium.getContent(0)
```

And thats it. Thank you for reading.

**Edit:**  
I did not notice this when I made the implementation, but there is a package for Angular available @ [https://www.npmjs.com/package/ng2-meditor](https://www.npmjs.com/package/ng2-meditor). The setup of installing medium as above is still useful imo instead of using a CDN.

## Handy extensions:

- Tables – [https://github.com/yabwe/medium-editor-tables](https://github.com/yabwe/medium-editor-tables)
- Custom buttons – [https://github.com/arcs-/medium-button](https://github.com/arcs-/medium-button)
