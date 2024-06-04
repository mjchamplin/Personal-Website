---
layout: base
title: testing an archive page
description: Testing how to display various kinds of content
eleventyNavigation:
  key: Archive
---
<div class="archive">
<ul>
{%- for post in collections.all -%}
    <li class="archive-list-item">
        <a href="{{ post.url }}"><code>{{ post.url }}</code></a>
        {% if post.data.description %}
            {{ post.data.description }}
        {% else %}
            <p><em>No description</em></p>
        {% endif %}
        <ul>
            {%- for tag in post.data.tags -%}
                <li class="tag">
                    {{ tag }}
                </li>
            {%- else -%}
                <li class="notags">
                    No tags
                </li>
            {%- endfor -%}
        </ul>
  </li>
{%- endfor -%}
</ul>
</div>