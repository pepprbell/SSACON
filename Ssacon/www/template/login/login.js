let errorMsg = document.querySelector(".container-modal-content--error");
let successMsg = document.querySelector(".container-modal-content--success");
let userName = document.querySelector('input[name="username"]');
let userPassWord = document.querySelector('input[name="password"]');
let loginForm = document.getElementById("form");
let successModal = document.querySelector("#check_mark");
let failmodal = document.querySelector("#fail_mark");
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

// overlay.addEventListener("click", closeModal);
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
        modalLogin.innerHTML = "로그인 성공";
        failmodal.classList.add("modalenabled");
        openModal();
        window.localStorage.setItem("userInfo", JSON.stringify(result));
        setTimeout(() => {
          if (result.data.admin) {
            window.location = "../adminlist/adminlist.html";
          } else {
            window.location = "../employeelist/employeelist.html";
          }
        }, 2000);
        setTimeout(() => {
          failmodal.classList.remove("modalenabled");
        }, 2100);
      } else {
        modalLogin.classList.add("red");
        modalLogin.innerHTML = "로그인 실패";
        successModal.classList.add("modalenabled");
        openModal();
        setTimeout(() => {
          closeModal();
          modalLogin.classList.remove("red");
        }, 2000);
        setTimeout(() => {
          successModal.classList.remove("modalenabled");
        }, 2100);
      }
    })
    .catch((error) => {
      modalLogin.classList.add("red");
      modalLogin.innerHTML = "로그인 실패";
      successModal.classList.add("modalenabled");
      console.log(error);
      openModal();
      setTimeout(() => {
        closeModal();
        modalLogin.classList.remove("red");
        successModal.classList.remove("modalenabled");
      }, 2000);
      setTimeout(() => {
        successModal.classList.remove("modalenabled");
      }, 2100);
    });
}
