<script>
    export let videoDetails;
    import Comments from './Comments.svelte'
</script>

<div class="playlistItem grid row-start-auto grid-cols-12 m-1">
    <img
        class="thumbnail col-start-1 col-span-1"
        src={videoDetails.snippet.thumbnails.default.url}
        width={videoDetails.snippet.thumbnails.default.width}
        height={videoDetails.snippet.thumbnails.default.height}
    />
    <div class="col-start-2 col-span-3 justify-self-start">
        {videoDetails.snippet.title}
    </div>
    <div class="col-start-5 flex-col">
        Creation Date: <div>{videoDetails.snippet.publishedAt}</div>
        Id:
        <div>{JSON.stringify(videoDetails.id)}</div>
    </div>
</div>
<Comments id={videoDetails.id} />
