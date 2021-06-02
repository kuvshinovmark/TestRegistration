<script>
    import { goto } from "$app/navigation";
    import {validateEmail} from "$lib/function.js";

	let mail = "";
	let password = "";
    let passwordForCheck = ""
    let outBack = "";
    let message = "";

    async function signUp(){
        
        if(mail===""){
            message = "Введите почту!";
            return;
        }
        if(!validateEmail(mail)){
            message = "Введите корректную почту!";
            return;
        }
        if(password === "" || passwordForCheck === ""){
            message = "Введите пароли!";
            return;
        }
        if(password !== passwordForCheck){
            message = "Пароли должны совподать!";
            return;
        }   
        await GetUser();
        if(outBack !== "0000" ){
            message = "Такой пользователь уже существует!";
            return;
        }
        CreateUser();
        goto("/signin");
    }

	async function CreateUser() {
        const response = await fetch("http://localhost:5000/api/users", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mail: mail,
                password: password
            }),
        });
        if (response.ok === true) {
            const user = await response.json();
        }
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
    function authWithSN(name){
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
	<title>Signup</title>
</svelte:head>
 


<div class="box">
    <h1>Регистрация</h1>
    <input bind:value={mail} type="text" placeholder="E-mail">
    <input bind:value={password} type="text" placeholder="Пароль">
    <input bind:value={passwordForCheck} type="text" placeholder="Подтверждение пароля"> 
    {#if message !== ""}
        <h3 class="errMessage">{message}</h3> 
    {/if} 
    <div class="buttons">
        <button class="blackButton" on:click={signUp}>Зарегестрироваться</button>
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
        <img on:click={() => authWithSN("google")} src="\static\google.svg" alt="">
        <img on:click={() => authWithSN("github")} src="\static\github.svg" alt="">
        <img on:click={() => authWithSN("vk")} src="\static\vk.svg" alt="">
        <img on:click={() => authWithSN("facebook")} src="\static\facebook.svg" alt="">
    </div>
</div>

<style>
    .socialNet{
        display: flex;
        justify-content: space-evenly;
    }
</style>