<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts };
      });
  }
</script>

<script>
  import "bootstrap/dist/css/bootstrap.min.css";
  export let posts;
  let title = null,
    slug = null,
    html = null;
  async function handleSubmit() {
    const post = { title, slug, html };
    const response = await fetch("/blog.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post),
    });
    if(response.ok) {
      const result = await response.json();
      console.log("result", result);
    }
  }
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>

<svelte:head>
  <title>Blog</title>
</svelte:head>

<h1>Recent posts</h1>

<ul>
  {#each posts as post}
    <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
    <li>
      <a rel="prefetch" href="blog/{post.slug}">{post.title}</a>
    </li>
  {/each}
</ul>

<form on:submit|preventDefault={handleSubmit}>
  <input
    bind:value={title}
    type="text"
    placeholder="title"
    class="form-control" />
  <br />
  <input
    bind:value={slug}
    type="text"
    placeholder="slug"
    class="form-control" />
  <br />
  <textarea
    bind:value={html}
    placeholder="<p>Some HTML</p>"
    class="form-control" />
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
