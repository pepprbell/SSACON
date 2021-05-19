const navbar__body = document.querySelector("body");

const navbar = document.createElement("div");
const navbar__backButton = document.createElement("button");
const navbar__title = document.createElement("div");
const navbar__menuButton = document.createElement("button");

const blank = document.createElement("div");
blank.className = "blank";
navbar__body.appendChild(blank);

const sidemenu = document.createElement("div");
sidemenu.classList.add("sidemenu");
sidemenu.classList.add("hide");

let navbar__userInfo = window.localStorage.getItem("userInfo");
navbar__userInfo = JSON.parse(navbar__userInfo);

//근무자

const navbar__WorkerCheckSheet = document.createElement("div");
navbar__WorkerCheckSheet.innerHTML =
  "<img class='navbar__menu__icon' src='file:///android_asset/www/template/navbar/icons/checksheet_side.png'>" +
  "<div class='navbar__menu__title'>체크시트</div>";
navbar__WorkerCheckSheet.className = "navbar__menu";
navbar__WorkerCheckSheet.addEventListener("click", function () {
  window.location =
    "file:///android_asset/www/template/checklist/checklist.html";
});

const navbar__WorkerMessage = document.createElement("div");
navbar__WorkerMessage.innerHTML =
  "<img class='navbar__menu__icon' src='file:///android_asset/www/template/navbar/icons/message_side.png'>" +
  "<div class='navbar__menu__title'>인수인계</div>";
navbar__WorkerMessage.className = "navbar__menu";
navbar__WorkerMessage.addEventListener("click", function () {
  window.location = "file:///android_asset/www/template/message/message.html";
});

//관리자

const navbar__CheckSheet = document.createElement("div");
navbar__CheckSheet.innerHTML =
  "<img class='navbar__menu__icon' src='file:///android_asset/www/template/navbar/icons/checksheet_side.png'>" +
  "<div class='navbar__menu__title'>체크시트</div>";
navbar__CheckSheet.className = "navbar__menu";
navbar__CheckSheet.addEventListener("click", function () {
  window.location =
    "file:///android_asset/www/template/checklist/checklist.html";
});

const navbar__CheckSheetList = document.createElement("div");
navbar__CheckSheetList.innerHTML =
  "<img class='navbar__menu__icon' src='file:///android_asset/www/template/navbar/icons/checksheets_side.png'>" +
  "<div class='navbar__menu__title'>체크시트 현황</div>";
navbar__CheckSheetList.className = "navbar__menu";
navbar__CheckSheetList.addEventListener("click", function () {
  window.location =
    "file:///android_asset/www/template/seeChecklist/seeChecklist.html";
});

const navbar__BeaconMonitor = document.createElement("div");
navbar__BeaconMonitor.innerHTML =
  "<img class='navbar__menu__icon' src='file:///android_asset/www/template/navbar/icons/monitoring_side.png'>" +
  "<div class='navbar__menu__title'>비콘 모니터링</div>";
navbar__BeaconMonitor.className = "navbar__menu";
navbar__BeaconMonitor.addEventListener("click", function () {
  window.location = "file:///android_asset/www/template/monitor/monitor.html";
});

const navbar__BeaconManagement = document.createElement("div");
navbar__BeaconManagement.innerHTML =
  "<img class='navbar__menu__icon' src='file:///android_asset/www/template/navbar/icons/management_side.png'>" +
  "<div class='navbar__menu__title'>비콘 관리</div>";
navbar__BeaconManagement.className = "navbar__menu";
navbar__BeaconManagement.addEventListener("click", function () {
  window.location =
    "file:///android_asset/www/template/beacon_crud/beacon_crud.html";
});

const navbar__MainMenu = document.createElement("div");
navbar__MainMenu.innerHTML =
  "<img class='navbar__menu__icon' src='file:///android_asset/www/template/navbar/icons/hamburger_side.png'>" +
  "<div class='navbar__menu__title'>목록</div>";
navbar__MainMenu.className = "navbar__menu";
navbar__MainMenu.addEventListener("click", function () {
  window.location =
    "file:///android_asset/www/template/adminlist/adminlist.html";
});

const navbar__profile = document.createElement("div");
navbar__profile.className = "navbar__profile";

const navbar__profile__img = document.createElement("img");
navbar__profile__img.className = "navbar__profile__img";
navbar__profile__img.src =
  "file:///android_asset/www/template/navbar/icons/leessafy.png";

const navbar__profile__name = document.createElement("div");
navbar__profile__name.className = "navbar__profile__name";
navbar__profile__name.innerHTML = "이싸피";

const navbar__profile__description = document.createElement("div");
navbar__profile__description.className = "navbar__profile__description";
navbar__profile__description.innerHTML = "010-1234-5678";

const navbar__profile__left = document.createElement("div");
const navbar__profile__right = document.createElement("div");
navbar__profile__left.className = "navbar__profile__left";
navbar__profile__right.className = "navbar__profile__right";

navbar__profile__left.appendChild(navbar__profile__img);
navbar__profile__right.appendChild(navbar__profile__name);
navbar__profile__right.appendChild(navbar__profile__description);

navbar__profile.appendChild(navbar__profile__left);
navbar__profile.appendChild(navbar__profile__right);

sidemenu.appendChild(navbar__profile);
const line = document.createElement("div");
line.className = "line";
sidemenu.appendChild(line);
sidemenu.appendChild(navbar__MainMenu);
// if(navbar__userInfo.data.admin) {
//     sidemenu.appendChild(navbar__WorkerCheckSheet)
//     sidemenu.appendChild(navbar__WorkerMessage)
// } else {
sidemenu.appendChild(navbar__CheckSheet);
sidemenu.appendChild(navbar__CheckSheetList);
sidemenu.appendChild(navbar__BeaconMonitor);
sidemenu.appendChild(navbar__BeaconManagement);
// }

const sidemenu__footer = document.createElement("div");
sidemenu__footer.className = "sidemenu__footer";
const line2 = document.createElement("div");
line2.className = "line";
sidemenu__footer.appendChild(line2);
const navbar__logout = document.createElement("div");
navbar__logout.addEventListener("click", logout);
function logout() {
  // /user/logout/{userId}
  let userId = navbar__userInfo.data.userId;
  console.log(navbar__userInfo);
  console.log(userId);
  fetch(`http://k4b101.p.ssafy.io/api/user/logout/${userId}`, {
    method: "POST",
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("로그아웃됐나?");
      localStorage.clear();
      setTimeout(() => {
        window.location = "../login/login.html";
      }, 1000);
    })
    .catch((error) => console.log("error", error));
}
navbar__logout.innerHTML =
  "<img class='navbar__menu__icon' src='file:///android_asset/www/template/navbar/icons/logout_side.png'>" +
  "<div class='navbar__menu__title'>로그 아웃</div>";
navbar__logout.className = "navbar__menu";
sidemenu__footer.appendChild(navbar__logout);

sidemenu.appendChild(sidemenu__footer);

const black__bg = document.createElement("div");
black__bg.classList.add("black__bg");
black__bg.classList.add("hide");

black__bg.addEventListener("click", function () {
  if (sidemenu.classList.contains("moveright")) {
    sidemenu.classList.remove("moveright");
  }
  console.log("왼쪽이동");
  sidemenu.classList.add("hide");
  sidemenu.classList.add("moveleft");

  black__bg.classList.add("hide");
});

navbar__body.appendChild(black__bg);
navbar__body.appendChild(sidemenu);

const hamburger = document.createElement("img");
hamburger.className = "icon";
hamburger.src = "file:///android_asset/www/template/navbar/icons/hamburger.png";
const chevelon__back = document.createElement("img");
chevelon__back.className = "icon";
chevelon__back.src =
  "file:///android_asset/www/template/navbar/icons/chevelon__back.png";

navbar__backButton.appendChild(chevelon__back);
navbar__menuButton.appendChild(hamburger);

const title = document.title;

navbar.className = "navbar";
navbar__backButton.className = "navbar__backButton";
navbar__title.className = "navbar__title";
navbar__title.innerHTML = title;
navbar__menuButton.className = "navbar__menuButton";

// navbar__backButton.innerHTML = "<"
navbar__backButton.addEventListener("click", function () {
  window.history.back();
});

navbar__menuButton.addEventListener("click", function () {
  console.log("메뉴 오른쪽이동");
  black__bg.classList.remove("hide");
  if (sidemenu.classList.contains("moveleft")) {
    sidemenu.classList.remove("moveleft");
  }
  sidemenu.classList.remove("hide");
  sidemenu.classList.add("moveright");
});

// navbar__menuButton.innerHTML="메뉴"

navbar.appendChild(navbar__backButton);
navbar.appendChild(navbar__title);
navbar.appendChild(navbar__menuButton);
navbar__body.appendChild(navbar);
