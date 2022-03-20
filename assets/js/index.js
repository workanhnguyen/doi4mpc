// Turn between sign up and sign in
var turnSignUp = document.querySelector('#turn-sign-up');
var turnSignIn = document.querySelector('#turn-sign-in');
var modal = document.querySelector('.main__item-modal');
var turnSign = document.querySelector('.main__item-turn');

turnSignUp.addEventListener('click', function () {
    modal.classList.add('turn');
});

turnSignIn.addEventListener('click', function () {
    modal.classList.remove('turn');
});

// Sign in and Sign up
var signIn = document.querySelector('#sign-in');
var signUp = document.querySelector('#sign-up');
var userName;
var passWord;
var confirmPassWord;

signIn.addEventListener('click', function () {
    userName = document.querySelector('.main__item--sign-in > .main__item-input.username').value;
    passWord = document.querySelector('.main__item--sign-in > .main__item-input.password').value;
    if (userName === "" || passWord === "") {
        document.querySelector('p.toast__content-body').innerText = "Please enter all fields!";  
    }
    console.log(userName, passWord);
})

signUp.addEventListener('click', function () {
    userName = document.querySelector('.main__item--sign-up > .main__item-input.username').value;
    passWord = document.querySelector('.main__item--sign-up > .main__item-input.password').value;
    confirmPassWord = document.querySelector('.main__item--sign-up > .main__item-input.confirm-password').value;
    if (userName === "" || passWord === "" || confirmPassWord === "") {
        document.querySelector('p.toast__content-body').innerText = "Please enter all fields!";  
    }
    if (passWord !== confirmPassWord) {
        document.querySelector('p.toast__content-body').innerText = "Confirm password not match!";  
    }
    console.log(userName, passWord, confirmPassWord);
})