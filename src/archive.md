---
layout: base
title: testing an archive page
---

<ul>
{%- for post in collections.all -%}
    <li><a href="{{ post.url }}">{{ post.url }} - {{ post.data.title }}</a></br>
    <ul>
    {%- for tag in post.data.tags -%}
        <li class="tag">
            {{ tag }}
        </li>
    {%- endfor -%}
    </ul>
  </li>
{%- endfor -%}
</ul>