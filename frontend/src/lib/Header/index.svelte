<script>
	import { page } from '$app/stores';
</script>

<div class="navPanel">
	<div class="mainBut">
		<a href="/signin">Вход</a>
		<a href="/changePass">Смена</a>
		<a href="/recoveryPass">Восстановление</a>
		<a href="/">Аккаунт</a>
	</div>
</div>
	


<style>
	.navPanel{
		margin-top: 20px;
		display: flex;
		justify-content: space-between;
	}
	a{
		text-decoration: none;
	}
	.mainBut{
		display: flex;
		margin: auto;
	}
	.mainBut *{
		padding-right: 1em;
		color: var(--heading-color);
		font-size: calc(14px + (18 - 14) * ((100vw - 300px) / (1440 - 300)));
		text-align: center;
		margin-top: 0;
		font-family:'Franklin Gothic Medium', sans-serif;
	}
</style>
