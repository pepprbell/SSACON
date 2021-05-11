let errorMsg = document.querySelector(".container-modal-content--error");
let successMsg = document.querySelector(".container-modal-content--success");
let userName = document.querySelector('input[name="username"]');
let userPassWord = document.querySelector('input[name="password"]');
let loginForm = document.getElementById("form");
const modalLogin = document.getElementById("modal__login");
const notification = document.getElementById("notification");
const modal = document.querySelector(".modal");
//HTML에서의 모달 최상위 요소
const overlay = document.querySelector(".modal__overlay");
//모달창이 활성화되면 흐린 배경을 표현하는 요소
const openModal = () => {
  modal.classList.remove("hidden");
};

const closeModal = () => {
  modal.classList.add("hidden");
};
//onModal
//모달창 내부의 닫기 버튼

overlay.addEventListener("click", closeModal);
//모달창 영역 밖
window.onload = init();

function init() {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    userLogin();
  });
}
function userLogin() {
  let nameVal = userName.value,
    passwordVal = userPassWord.value;
  var formdata = new FormData();
  formdata.append("password", passwordVal);
  formdata.append("userid", nameVal);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };
  fetch("http://k4b101.p.ssafy.io/api/user/login/", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result.status);
      if (result.status) {
        notification.innerHTML = "환영합니다!";
        modalLogin.innerHTML = "로그인 성공";
        openModal();
        window.localStorage.setItem("userInfo", JSON.stringify(result));
        setTimeout(() => {
          window.location = "../adminlist/adminlist.html";
        }, 2000);
      } else {
        modalLogin.classList.add("red");
        modalLogin.innerHTML = "로그인 실패";
        openModal();
        setTimeout(() => {
          closeModal();
          modalLogin.classList.remove("red");
        }, 2000);
      }
    })
    .catch((error) => {
      modalLogin.innerHTML = "로그인 실패";
      console.log("error", error);
      // loginCheck(!isLogin);
    });
  // }
}
// function loginCheck(isLogin) {
//   modal.classList.add("enabled");

//   if (isLogin) {
//     successMsg.classList.add("enabled");
//   } else {
//     errorMsg.classList.add("enabled");
//   }
//   setTimeout(function () {
//     modal.classList.remove("enabled");
//     loginForm.reset();
//     modalContent.forEach(function (content) {
//       content.classList.remove("enabled");
//     });
//   }, 3000);
// }
