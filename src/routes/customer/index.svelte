<script context="module">
  export async function preload(page, session) {
    const response = await this.fetch("customer.json");
    if (response.ok) {
      const records = await response.json();
      return { records };
    }
  }
</script>

<script>
  export let records;
  let emptyRecord = { name: "", phone: "", notes: "" };
  let record = { ...emptyRecord };
  import Table from "@lib/crud/table.svelte";
  import EditForm from "@lib/components/edit_form.svelte";
  const fields = [
    // { label: "Id", key: "_id" },
    { label: "Name", key: "name", required: true },
    { label: "Phone", key: "phone", input_type: "phone" },
    { label: "Date of Birth", key: "dob", input_type: "date" },
    { label: "Notes", key: "notes", input_type: "textarea" }
  ];
  const tableProps = {
    name: "Customer",
    plural: "Customers",
    // don't show "notes", "dob" fields in the table
    fields: fields.filter(f => !["notes", "dob"].includes(f.key)),
    rest_resource: "customer"
  };
  const formProps = {
    fields,
    record,
    records,
    emptyRecord,
    rest_resource: "customer"
  };
  // trigger reactive refresh of EditForm when use clicks on a row edit button
  $: formProps.record = record;
</script>

<svelte:head>
  <title>Customers</title>
</svelte:head>

<h1>Customers</h1>

<div class="row">
  <div class="col-md">
    <Table {...tableProps} bind:records bind:record />
  </div>
  <div class="col-md">
    <EditForm {...formProps} bind:records />
  </div>
</div>
