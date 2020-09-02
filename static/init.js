const sendButton = document.getElementById("send-btn");
let inputField = document.getElementById("input");
const messageList = document.getElementById("messageList");

const title = document.getElementById("title")

const FILE = document.getElementById('file')

const postGroup = document.getElementById("posts-group")
const postText = document.getElementById("text")
const postCaption = document.getElementById("caption")

let currentChat = "";
let currentId = null;
let friendsSuggestionList = document.getElementById("friendsSuggestionList");

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDhFVeFaGlywioDPg-YrwU8K1J7Xs6icsA",
  authDomain: "funny-chat-38d38.firebaseapp.com",
  databaseURL: "https://funny-chat-38d38.firebaseio.com",
  projectId: "funny-chat-38d38",
  storageBucket: "funny-chat-38d38.appspot.com",
  messagingSenderId: "58144990843",
  appId: "1:58144990843:web:5175316c2bb123d3a7a4de"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

