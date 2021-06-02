<script>
    import {goto} from "$app/navigation";
    import {validateEmail} from "$lib/function.js"
	let mail = "";
	let password = "";
    let outBack = "";
    let message = "";

    
    async function signIn(){
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
        await GetUser();
        console.log(outBack);
        if(outBack === "0000"){
            message = "Такого пользователя не существует!";
            return;
        }
        if(outBack === "1111"){
            message = "Пароль неверный!";
            return;
        }
        localStorage.setItem("ID", outBack);
        goto("/");
    }

    //ответы сервера: 0000 - нет такого пользователя
    //                1111 - неверный пароль
    //                <token> - успешно
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

    function regWithSN(name){
        //заглушка с сервера, которая меняет outBack по аналогии с запросом GetUser
        outBack = "32k12dsi12kdoek3";//тестовый токен
        // outBack = "0000";
        //----
        if(outBack === "0000"){
            message = "Пользователя с привязкой к " + name +" не существует";
            return;
        }
        localStorage.setItem("ID", outBack);
        goto("/");
    }
</script>



<svelte:head>
	<title>Signin</title>
</svelte:head>



<div class="box">
    <h1>Авторизация</h1>
    <input bind:value={mail} type="text" placeholder="E-mail">
    <input bind:value={password} type="text" placeholder="Пароль">
    {#if message !== ""}
        <h3 class="errMessage">{message}</h3> 
    {/if} 
    <a class="passLost" href="/recoveryPass">Забыли пароль?</a>
    <div class="buttons">
        <button class="blackButton" on:click={signIn}>Вход</button>
        <a class="whiteButton" href="/signup">Регистрация</a>
    </div>
    <svg viewBox="0 0 100 10">
        <style>
            .or{ font: bold 3px sans-serif; fill: #E1E3E6; }
        </style>
        <line x1="0" y1="5" x2="45" y2="5" style="stroke: #E1E3E6; stroke-width: 0.5px;"/>
        <text x="48" y="6" class="or">OR</text>
        <line x1="55" y1="5" x2="100" y2="5" style="stroke: #E1E3E6; stroke-width: 0.5px;" />
    </svg>
    <div class="socialNet">   
        <img on:click={() => regWithSN("google")} src="\static\google.svg" alt="">
        <img on:click={() => regWithSN("github")} src="\static\github.svg" alt="">
        <img on:click={() => regWithSN("vk")} src="\static\vk.svg" alt="">
        <img on:click={() => regWithSN("facebook")} src="\static\facebook.svg" alt="">
    </div>
</div>

<style>
    .socialNet{
        display: flex;
        justify-content: space-evenly;
    }
    .passLost{
        text-align: center;
        font-family: 'Ubuntu', sans-serif;
        font-size: var(--smallText);
        color: gainsboro;
        width: 30%;
        margin: auto;
        text-decoration: none;
        padding-bottom: 10px;
        font-size: var(--smallText);
        transition: all 0.3s ease;
    }
    .passLost:hover{
        color: grey;
    }
</style>