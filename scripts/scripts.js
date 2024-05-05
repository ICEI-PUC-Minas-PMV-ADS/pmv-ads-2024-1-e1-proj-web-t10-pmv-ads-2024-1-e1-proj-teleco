// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAx7QEvYUplmxg7pk6I3Bd99F5y-F1MoO8",
  authDomain: "triton-331e9.firebaseapp.com",
  projectId: "triton-331e9",
  storageBucket: "triton-331e9.appspot.com",
  messagingSenderId: "915939586386",
  appId: "1:915939586386:web:4fd37cee5bfa51f2614a8b",
  measurementId: "G-KQ8MY42QT1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

<script type="text/javascript">
$(document).ready(function(){

  $('.sub-btn').click(function(){
    $(this).next('.sub-menu').slideToggle();
    $(this).find('.dropdown').toggleClass('rotate');
  })

});
</script>