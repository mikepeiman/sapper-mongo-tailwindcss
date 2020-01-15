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
  import { goto } from "@sapper/app";
  export let posts;
  let emptyRecord = { title: "", slug: "", html: "" };
  let record = Object.assign({}, emptyRecord);
  async function handleSubmit() {
    if(record._id) {
      const response = await fetch(`/blog/${record._id}.json`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(record)
      });
      if (response.ok) {
        const result = await response.json();
        record = Object.assign({}, emptyRecord);
        // reload records
        posts = posts;
      }
    } else {
      const response = await fetch("/blog.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(record)
      });
      if (response.ok) {
        const result = await response.json();
        record = Object.assign({}, emptyRecord);
        posts = posts.concat(result);
      }
    }
  }
  function editRecord(r) {
    record = r;
  }
  function deleteRecord(r) {
    goto(`blog/${r.slug}/delete`);
  }
  function cancelEdit(r) {
    record = Object.assign({}, emptyRecord);
  }
</script>

<svelte:head>
  <title>Blog</title>
</svelte:head>

<h1>Recent posts</h1>

<table class="table table-striped">
  <tbody>
    {#each posts as post}
      <tr>
        <td>
          <!-- we're using the non-standard `rel=prefetch` attribute to
            tell Sapper to load the data for the page as soon as
            the user hovers over the link or taps it, instead of
            waiting for the 'click' event -->
          <a rel="prefetch" href="blog/{post.slug}">{post.title}</a>
        </td>
        <td>
          <i class="fa fa-edit" on:click={() => editRecord(post)}/>
        </td>
        <td>
          <i class="fa fa-trash" on:click={() => deleteRecord(post)}/>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<form on:submit|preventDefault={handleSubmit}>
  <p>
  {#if !!record._id}
    ID: {record._id}
  {:else}
    ID: unassgined
  {/if}
  </p>
  <input
    bind:value={record.title}
    type="text"
    placeholder="title"
    class="form-control" />
  <br />
  <input
    bind:value={record.slug}
    type="text"
    placeholder="slug"
    class="form-control" />
  <br />
  <textarea
    bind:value={record.html}
    placeholder="<p>Some HTML</p>"
    class="form-control" />
  <button type="submit" class="btn btn-primary">Submit</button>
  <button type="reset" class="btn btn-secondary" on:click={cancelEdit}>Cancel</button>
</form>
