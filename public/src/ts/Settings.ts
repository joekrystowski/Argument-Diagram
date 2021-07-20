
const settingsDropdown = document.getElementById("settings-dropdown") as HTMLElement;
export function toggleSettings() {
  if($('#settings-dropdown').css('display') == 'none') {
    settingsDropdown.style.display = "flex";
  }
  else {
    settingsDropdown.style.display = "none";
  }
}

const loginButton = document.getElementById('log-in-button') as HTMLElement;
loginButton.addEventListener('click', () => {
    $("#settings-menu").css("transform","translateX(-110%)");
    $("#log-in-menu").css("transform","translateX(0%)");
    $("#settings-container").css("height",""+$("#log-in-menu").height());
});
const loginBackButton = document.getElementById('log-in-back') as HTMLElement;
loginBackButton.addEventListener('click', () => {
    $("#settings-menu").css("transform","translateX(0%)");
    $("#log-in-menu").css("transform","translateX(110%)");
    $("#settings-container").css("height",""+$("#settings-menu").height());
});
var firebase = window.firebase.default
var firebaseui = window.firebaseui
var ui = new firebaseui.auth.AuthUI(firebase.auth());
console.log('here');
const loginEnterButton = document.getElementById('log-in-enter') as HTMLElement;
loginEnterButton.addEventListener('click', () => {
    ui.start('#firebaseui-auth-container', {
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
          signInSuccessWithAuthResult: function (authResult, redirectUrl) {
              // Handle the result
              return false;
          },
        },
        // Other config options...
      });
});

