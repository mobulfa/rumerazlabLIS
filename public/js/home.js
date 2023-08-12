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
const form1 = document.querySelector('#search')

form1.addEventListener('submit', async function (e) {
    const allLetters = /^[A-Za-z]+$/;
    const name = document.getElementById('name')
    const address = document.getElementById('address')
    const gender = document.getElementById('gender')
    const age = document.getElementById('age')
    e.preventDefault();

    name.innerHTML = customerCaseno.fname


});


const sendEmailFooter = document.getElementById('myForm-footer');
sendEmailFooter.addEventListener('submit', function (event) {
    event.preventDefault();

    const serviceID = 'default_service';
    const templateID = 'template_aw8rpav';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {

            fetch(scriptURL, { method: 'POST', body: new FormData(form3) })
                .then(response => console.log('Success!', response))
                .catch(error => console.error('Error!', error.message))

            console.log('Send Success');
            document.getElementById('myForm-footer').reset();
            modal.style.display = "none";

        }, (err) => {

            console.log(JSON.stringify(err));
        });
});







