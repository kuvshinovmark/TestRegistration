<script>
    import {validateEmail} from "$lib/function.js";
	let mail = "";
	let password = "";
	let newPassword = "";
	let outBack = "";
    let message = "";

	async function change(){
		if(mail===""){
            message = "Введите почту!";
            return;
        }
        if(!validateEmail(mail)){
            message = "Введите корректную почту!";
            return;
        }
        if(password === ""){
            message = "Введите пароль!";
            return;
        }
		if(newPassword === ""){
            message = "Введите новый пароль!";
            return;
        }
        await GetUser();
        console.log(outBack);
        if(outBack === "0000"){
            message = "Такого пользователя не существует!";
            return;
        }
        if(outBack === "1111"){
            message = "Изначальный пароль неверный!";
            return;
        }
		EditUser();
        message = "Пароль изменен";
        mail = "";
        password = "";
        newPassword = "";
	}

	async function GetUser() {
        const response = await fetch(
            "http://localhost:5000/api/users/" + mail,
            {
                method: "POST",
                headers: { Accept: "application/json", "Content-Type": "application/json" },
				body: JSON.stringify({
                password: password,
            	}),
            }
        );
        if (response.ok === true) {
            const users = await response.json();
            outBack = users._id;
			return users;
        }
    }
	async function EditUser() {
        console.log("Запись начало "+ mail + " " + newPassword);
        const response = await fetch(
             "http://localhost:5000/api/users/",
            {
                method: "PUT",
                headers: { Accept: "application/json","Content-Type": "application/json"},
                body: JSON.stringify({
                    mail: mail,
                    newPass: newPassword
                })
            } 
		)
	}
</script>

<svelte:head>
	<title>Change</title>
</svelte:head>


<div class="box">
    <h1>Смена <span style="color:#43DFA8">пароля</span></h1>
    <input bind:value={mail} type="text" placeholder="E-mail аккаунта">
	<input bind:value={password} type="text" placeholder="Пароль">
	<input bind:value={newPassword} type="text" placeholder="Новый пароль">
    {#if message !== ""}
        <h3 class="errMessage">{message}</h3> 
    {/if}
	<div class="buttons">
        <button class="whiteButton" on:click={change}>Смена пароля</button>
    </div>
</div>
