// Function remove information on input tag
function removeInfo() {
    var inputArr = document.querySelectorAll('.main__item--sign-up .main__item-input');
    for (var i = 0; i < inputArr.length; i++) {
        inputArr[i].value = '';
    }
}
// Toast
function toast(content) {
    const main = document.querySelector('#toast');
    if (main) {
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.innerHTML = `
            <i class="fa-solid fa-circle-exclamation toast__icon-alert"></i>
            <div class="toast__content">
                <p class="toast__content-heading">Error!</p>
                <p class="toast__content-body">${content}</p>
            </div>
            <i class="fa-solid fa-xmark toast__icon-exit"></i>
        `;
        main.appendChild(toast);
        setTimeout(function() {
            main.removeChild(toast);
        }, 4000);   
    }
}
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
var alertContent = "";
var userNameArr = [];
var passWordArr = [];
var signInAllow = false;

signIn.addEventListener('click', function () {
    userName = document.querySelector('.main__item--sign-in > .main__item-input.username').value;
    passWord = document.querySelector('.main__item--sign-in > .main__item-input.password').value;
    if (userName === "" || passWord === "") {
        alertContent = "Please enter all fields!";
        toast(alertContent);
    } else {
        userNameArr = JSON.parse(localStorage.getItem('username'));
        passWordArr = JSON.parse(localStorage.getItem('password'));
        if (userNameArr === null || passWordArr === null) {
            alertContent = "Username not exits!";
            toast(alertContent);
        } else {
            for (var i = 0; i < userNameArr.length; i++) {
                if (userName === userNameArr[i] && passWord === passWordArr[i]) {
                    signInAllow = true;
                    break;
                }
            }
            if (signInAllow === false) {
                alertContent = "Username not exits!";
                toast(alertContent);
            } else {
                document.querySelector('#sign-in').href = 'homepage.html';
            }
        }
    }
})

signUp.addEventListener('click', function () {
    userName = document.querySelector('.main__item--sign-up > .main__item-input.username').value;
    passWord = document.querySelector('.main__item--sign-up > .main__item-input.password').value;
    confirmPassWord = document.querySelector('.main__item--sign-up > .main__item-input.confirm-password').value;
    if (userName === "" || passWord === "" || confirmPassWord === "") {
        alertContent = "Please enter all fields!";
        toast(alertContent);
    }
    if (passWord === confirmPassWord) {
        userNameArr = JSON.parse(localStorage.getItem('username'));
        var flagIn = true;
        if (userNameArr === null) {
            userNameArr = [];
            passWordArr = [];
            userNameArr.push(userName);
            passWordArr.push(passWord);
            localStorage.setItem('username', JSON.stringify(userNameArr));
            localStorage.setItem('password', JSON.stringify(passWordArr));
            removeInfo();
            modal.classList.remove('turn');
        } else {
            for (var i = 0; i < userNameArr.length; i++) {
                if (userNameArr[i] === userName) {
                    alertContent = "Username already exits!";
                    toast(alertContent);
                    flagIn = false;
                    break;
                }
            }
            if (flagIn === true) {
                userNameArr.push(userName);
                passWordArr.push(passWord);
                localStorage.setItem('username', JSON.stringify(userNameArr));
                localStorage.setItem('password', JSON.stringify(passWordArr));
                removeInfo();
                modal.classList.remove('turn');
            }
        }
    } else {
        toast("Confirm password not match!"); 
    }
})
// Responsive sign in and sign up animation
if (window.innerWidth <= 768) {
    turnSignUp.addEventListener('click', function () {
        document.querySelector('.main__item--sign-in').style.display = "none";
        document.querySelector('.main__item--sign-up').style.display = "flex";
    });
    turnSignIn.addEventListener('click', function () {
        document.querySelector('.main__item--sign-up').style.display = "none";
        document.querySelector('.main__item--sign-in').style.display = "flex";
    });
}
