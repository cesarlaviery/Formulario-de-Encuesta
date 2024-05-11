const form = document.querySelector(".survey");
const inputs = document.querySelectorAll(".data__input");

const expressions = {
    name: /^([A-ZÁ-ŸÀÉÍÓÚÑ][a-zá-ÿçñáéíóúñ]+)(?:\s([A-ZÁ-ŸÀÉÍÓÚÑ][a-zá-ÿçñáéíóúñ]+))?$/,
    age: /^(18|19|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|90)$/,
    email: /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(\”.+\”))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
}

const fields = {
    name: false,
    age: false,
    email: false
}

const verificationTest = (expressionsName, input, field) => {
    const group = document.querySelector(`.group__${field}`)
    const icon = document.querySelector(`.group__${field} i`)

    if (expressionsName.test(input.value)) {
        group.classList.remove("wrong-group");
        group.classList.add("correct-group");
        icon.classList.remove("fa-circle-xmark");
        icon.classList.add("fa-circle-check");
        fields[field] = true;
    } else {
        group.classList.add("wrong-group");
        icon.classList.remove("fa-circle-check");
        icon.classList.add("fa-circle-xmark");
        fields[field] = false;
    }
};

const validateForm = (e) => {
    switch (e.target.name) {
        case "name":
            verificationTest(expressions.name, e.target, "name");
            break;
        case "last-name":
            verificationTest(expressions.name, e.target, "last-name");
            break;
        case "age":
            verificationTest(expressions.age, e.target, "age");
            break;
        case "email":
            verificationTest(expressions.email, e.target, "email");
            break;
    }
}

inputs.forEach((input) => {
    input.addEventListener("blur", validateForm);
    input.addEventListener("input", validateForm);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (fields.name && fields.age && fields.email) {
        form.reset();

        const successfulValidation = document.querySelector(".successful-message");
        successfulValidation.classList.add("successful-validation");
        setTimeout(() => {
            successfulValidation.classList.remove("successful-validation");
        }, 5000);

        const icons = document.querySelectorAll(".data-group i");
        icons.forEach((element) => {
            element.classList.remove("fa-circle-check");
        });
    }
});