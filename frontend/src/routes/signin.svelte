<script>
    import {goto} from "$app/navigation";

	let mail = "superdima@mail.com";
	let password = "12345678";
    let outBack = "";

    async function signIn(){
        if(mail===""){
            alert("Введите почту!");
            return;
        }
        if(password === ""){
            alert("Введите пароль!");
            return;
        }
        await GetUser();
        console.log(outBack);
        if(outBack === "0000"){
            alert("Такого пользователя не существует!");
            return;
        }
        if(outBack === "1111"){
            alert("Пароль неверный!");
            return;
        }
        localStorage.setItem("ID", outBack);
        goto("/");
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
</script>



<svelte:head>
	<title>Signin</title>
</svelte:head>

<h1>Sign in</h1>

<div class="box">
    <input bind:value={mail} type="text" placeholder="mail">
    <input bind:value={password} type="text" placeholder="password">
    
    <button on:click={signIn}>SigIN</button>
</div>
