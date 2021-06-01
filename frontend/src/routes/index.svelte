<script>
	import { onMount } from "svelte";
	import {goto} from "$app/navigation";

	let ID = "";
	onMount(async () => {
		ID = localStorage.getItem("ID");
	});
	
	function out(){
		localStorage.clear();
		goto("/signin");
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1>Home</h1>

<h1>Account: {ID}</h1>
<button on:click={out}>out</button>