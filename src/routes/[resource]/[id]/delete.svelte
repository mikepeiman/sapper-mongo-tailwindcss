<script>
  import { stores } from "@sapper/app";
  const { page } = stores();
  const [_, resource_name, id] = $page.path.split("/");
  async function handleSubmit() {
    const url = `${resource_name}/${id}.json`;
    await fetch(url, { method: "DELETE" });
    history.back();
  }
  function handleReset() {
    history.back();
  }
</script>

<h1>Deleting {resource_name}</h1>
<h3 title={id}>Are you sure you want to delete this record?</h3>
<form on:submit|preventDefault={handleSubmit} on:reset={handleReset}>
  <button class="btn btn-primary" type="submit">Yes: DELETE</button>
  <button class="btn btn-secondary" type="reset">No: CANCEL</button>
</form>
