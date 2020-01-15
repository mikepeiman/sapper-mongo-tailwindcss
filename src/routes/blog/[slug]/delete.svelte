<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`blog/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { post: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import DetailPage from "../[slug].svelte";
  export let post;
  async function deleteRecord() {
    const response = await fetch(`blog/${post.slug}.json`, {
      method: "DELETE"
    });
    if (response.ok) {
      history.back();
    }
  }
</script>

<h2>Are you sure you want to delete the following post?</h2>
<button class="btn btn-primary" on:click={deleteRecord}>Yes: DELETE</button>
<button class="btn btn-secondary" on:click={() => history.back()}>No: CANCEL</button>
<hr />
<DetailPage {post} />
