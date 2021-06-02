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
	<title>Account</title>
</svelte:head>

<div class="main">
	
	{#if ID===null}
	<div class="buttons">
		<a class="whiteButton" href="/signin"> Войти </a>
	</div>
	{:else}
		<h1>Account token: {ID}</h1>
		<button class="blackButton" on:click={out}>out</button>
	{/if}
	
</div>

<style>
	.main{
		margin-top: 50px;
		margin-left: auto;
		margin-right: auto;
	}
</style>