
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
var storage = firebase.storage();
var defaultPfp: string;


const loginEnterButton = document.getElementById('log-in-enter') as HTMLElement;
const userProfile = document.getElementById('user-profile') as HTMLElement;
const userProfileName = document.getElementById('user-profile-name') as HTMLElement;
const userProfilePic = document.getElementById('user-profile-pic') as HTMLImageElement;
const editUsername = document.getElementById('edit-username') as HTMLElement;
const editPfp = document.getElementById('edit-pfp') as HTMLElement;
const logoutButton = document.getElementById('logout') as HTMLElement;

storage.ref('profilepic.jpeg').getDownloadURL()
.then((url) => {
  defaultPfp = url;
  userProfilePic.src = url;
});

function login() {
  const user = firebase.auth().currentUser;
  userProfileName.textContent = user?.displayName!;
  const photoUrl = user?.photoURL;
  // if(photoUrl){ userProfilePic.src = photoUrl;}

  loginEnterButton.style.display = 'none';
  userProfile.style.display = 'flex';
  editUsername.style.display = 'flex';
  editPfp.style.display = 'flex';
  logoutButton.style.display = 'flex'; 
  // $("#settings-container").css("height",""+$("#log-in-menu").height()); 
}
function logout() {
  loginEnterButton.style.display = 'flex';
  userProfile.style.display = 'none';
  editUsername.style.display = 'none';
  editPfp.style.display = 'none';
  logoutButton.style.display = 'none'; 
  // $("#settings-container").css("height",""+$("#log-in-menu").height()); 
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    login();
  } else {
    // No user is signed in.
  }
});


loginEnterButton.addEventListener('click', () => {
  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // Handle the result
        login();
        return false;
      },
    },
    // Other config options...
  });
});

// editUsername.addEventListener('click', () => {
//   const user = firebase.auth().currentUser;
//   user?.updateProfile({
//     displayName: "Jane Q. User"
//   }).then(() => {
//     // Update successful
//     // ...
//   }).catch((error) => {
//     // An error occurred
//     // ...
//   });  
  
// });

// editPfp.addEventListener('click', () => {
//   const user = firebase.auth().currentUser;
//   user?.updateProfile({
//     photoURL: "https://example.com/jane-q-user/profile.jpg"
//   }).then(() => {
//     // Update successful
//     // ...
//   }).catch((error) => {
//     // An error occurred
//     // ...
//   });  
// });

logoutButton.addEventListener('click', () => {
  firebase.auth().signOut()
  .then(logout)
  .catch(function(error) {
    // An error happened
  });
});
