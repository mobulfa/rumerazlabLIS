(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})();

const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
    myInput.focus()
});




const button = document.getElementById('searchbtn')
const form = document.querySelector('#search')

form.addEventListener('submit', async function (e) {
    const allLetters = /^[A-Za-z]+$/;
    const name = document.getElementById('name')
    const address = document.getElementById('address')
    const gender = document.getElementById('gender')
    const age = document.getElementById('age')
    e.preventDefault();

    name.innerHTML = customerCaseno.fname


})


