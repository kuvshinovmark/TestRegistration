<script>
	import {validateEmail} from "$lib/function.js";
	let mail = "";
	let code = "";
	let state = 0;
	let outBack = "";



	function giveCode(){
		if(mail===""){
			alert("Введите mail!");
			return;
		}
		if(!validateEmail(mail)){
            message = "Введите корректную почту!";
            return;
        }
		state = 0;
		recover();
	}

	function checkCode(){
		if(code===""){
			alert("Введите код!");
			return;
		}
		GetUserPass();
	}
	async function GetUserPass() {
        const response = await fetch(
            "http://localhost:5000/api/recover",
            {
                method: "POST",
                headers: { Accept: "application/json", "Content-Type": "application/json" },
				body: JSON.stringify({
                mail: mail,
				code: code,
            	}),
            }
        );
        if (response.ok === true) {
            const out = await response.json();
            outBack = out;
			alert(out);
			return out;
        }
    }
	function restart(){
		state = 1;
		alert("Пожалуйста, проверьте правильность ввода почты аккаунта!");
	}

	async function recover(){
		const response = await fetch(
            "http://localhost:5000/api/recover/" + mail,
            {
                method: "POST",
                headers: { Accept: "application/json"},
            }
        );
        if (response.ok === true) {
            const out = await response.json();
            console.log(out);
			return out;
        }
	}
</script>

<svelte:head>
	<title>Recovery</title>
</svelte:head>


<div class="box">
	<h1>Восстановление <span style="color:#43DFA8">пароля</span></h1>
	<input bind:value={mail} type="text" placeholder="E-mail аккаунта">
	{#if state}
		<div class="buttons">
			<button class="blackButton" on:click={giveCode}>Отправить код</button>
		</div>
	{:else}
		<input bind:value={code} type="text" placeholder="Полученный код">
		<div class="buttons">
			<button class="blackButton" on:click={checkCode}>Восстановить</button>
			<button class="whiteButton" on:click={restart}>Не получил код</button>	
		</div>
		
	{/if}	
</div>
