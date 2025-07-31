window.addEventListener("load", () => {
  const validator = new JustValidate("#form");
  let isvalid = false;

  validator
    .addField("#name", [
        {
        rule: "required",
        errorMessage: "El nombre es obligatorio",
        },
        {
        rule: "minLength",
        value: 3,
        errorMessage: "El nombre debe tener al menos 3 caracteres",
        },
        {
        rule: "maxLength",
        value: 16,
        errorMessage: "El nombre no debe tener más de 16 caracteres",
        },
    ])
    .addField("#email", [
        {
        rule: "required",
        errorMessage: "El email es obligatorio",
        },
        {
        rule: "email",
        errorMessage: "El email no es válido",
        },
    ])
    .onSuccess(() => {
        isvalid = true;
        console.log("Formulario válido, listo para enviar");
        // Aquí puedes agregar la lógica para enviar el formulario
        // Por ejemplo, usando fetch o XMLHttpRequest
        console.log("Formulario enviado con éxito");
    })

});
