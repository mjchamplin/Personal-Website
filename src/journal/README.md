# Journal template front matter
`layout`:

   `post` is appropriate for most things. It's somewhat narrow, but requires no additional formatting or html structure. You can feed it basic markdown and it'll spit out a blog post.

   `post-big` is good for photo posts or any post that wants to use the full width of the site container. It requires html structure since the content won't have any containers. See any of the posts in  /photo-archive for examples.

`title`
Self-explanatory. A title for the post, which is used as the title on the individual post page and in the archive.

`thumbnail`
Image thumbnail used in archive view and as OG share image for social media. Using standard aspect ratios for those formats will make the share images prettier, but is not required.

`description`
Short description of the post. Displayed on archive pages, `<meta>` tags, OG metadata, and RSS feed. Technically optional, but semantically important.

`alttext` _(optional)_
Alt text for the thumbnail image. If absent, uses `description` instead.

`clipping` _(optional)_
If `true` uses the clipping format on the archive page. Good for quotes and short bits of text. See /clippings for examples (though they don't have to be in that directory specifically)

`date` _(optional)_
Specified using the UTC format: `0000-00-00 00:00:00`. If time is left off, it'll default to midnight which might make it show the wrong day. If absent, defaults to `Git Created`. See Eleventy's [Content Dates](https://www.11ty.dev/docs/dates/) documentation.

