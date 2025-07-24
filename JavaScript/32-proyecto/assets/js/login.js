window.addEventListener("load", () => {
    let loginForm = document.querySelector(".aside__login");
    let inputName = document.querySelector("#name");
    let inputEmail = document.querySelector("#email");
    let inputPassword = document.querySelector("#password");
    let adideData = document.querySelector(".aside__data");
    let dataName = document.querySelector(".data__name");
    let dataLogout = document.querySelector(".data__logout");

    let getUser = () => {

        let myUser = localStorage.getItem("user");

        if(myUser){
            let identity = JSON.parse(myUser);
            adideData.classList.remove("aside__data--hide");
            dataName.innerHTML = identity.name;
            loginForm.classList.add("aside__login--hide");
        }

    }

    loginForm.addEventListener("submit", (e) => {

        e.preventDefault();

        //Recoger los valores de los inputs

        let name = inputName.value;
        let email = inputEmail.value;
        let password = inputPassword.value;
        
        //Comrpobar que no esten vacios

        let usuario = {};

        if(name && email && password){

            //Guardar los datos en un objeto
            usuario = {name, email, password};

            //Guardar los datos en localStorage
            localStorage.setItem("user", JSON.stringify(usuario));

            //Vaciar el formulario
            loginForm.reset();

            //Mostrar los datos en el aside
            getUser();

        }

    });

    //Mostrar los datos si existen en localStorage
    getUser();

    //Cerrar sesión
    dataLogout.addEventListener("click", () => {
        localStorage.clear();
        adideData.classList.add("aside__data--hide");
        loginForm.classList.remove("aside__login--hide");
    });
    
    
});