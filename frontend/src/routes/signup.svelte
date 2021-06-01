<script>
	let mail = "superdima@mail.com";
	let password = "12345678";
    let passwordForCheck = "12345678"
    let outBack = "";
    
    async function signUp(){
        if(mail===""){
            alert("Введите почту!");
            return;
        }
        if(password === "" || passwordForCheck === ""){
            alert("Введите пароли!");
            return;
        }
        if(password !== passwordForCheck){
            alert("Пароли должны совподать!");
            return;
        }   
        await GetUser();
        if(outBack !== "0000" ){
            alert("Такой пользователь уже существует!");
            return;
        }
        CreateUser();
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
            alert("Пользователь создан!");
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
</script>


<svelte:head>
	<title>Signup</title>
</svelte:head>

<h1>Sign up</h1>

<div class="box">
    <input bind:value={mail} type="text" placeholder="mail">
    <input bind:value={password} type="text" placeholder="password">
    <input bind:value={passwordForCheck} type="text" placeholder="password">
    
    <button on:click={signUp}>SigUP</button>
</div>
