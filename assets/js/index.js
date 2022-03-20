// Turn between sign up and sign in
var turnSignUp = document.querySelector('#sign-up');
var turnSignIn = document.querySelector('#sign-in');
var modal = document.querySelector('.main__item-modal');
var turnSign = document.querySelector('.main__item-turn');

turnSignUp.addEventListener('click', function () {
    modal.classList.add('turn');
});

turnSignIn.addEventListener('click', function () {
    modal.classList.remove('turn');
});

