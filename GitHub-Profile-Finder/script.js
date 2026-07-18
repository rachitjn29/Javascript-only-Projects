const avatar=document.getElementById("avatar");
const name=document.getElementById("name");
const usernameText=document.getElementById("username");
const bio=document.getElementById("bio");
const locationText=document.getElementById("location");
const company=document.getElementById("company");
const followers=document.getElementById("followers");
const following=document.getElementById("following");
const repos=document.getElementById("repos");
const profileLink=document.getElementById("profile-link");
const input=document.getElementById("search-input");
const button=document.getElementById("search-btn");

button.addEventListener("click",async function(){

let username=input.value;

let response = await fetch(`https://api.github.com/users/${username}`);
let data = await response.json();
console.log(data)

document.querySelector(".profile-card").style.display="block";

avatar.src=data.avatar_url;
name.textContent=data.name;
usernameText.textContent="@"+data.login;
bio.textContent=data.bio || "Not Available";
locationText.textContent="📍 "+(data.location || "Not Available");
company.textContent="🏢 "+(data.company|| "Not Available");

followers.textContent=data.followers;
following.textContent=data.following;
repos.textContent=data.public_repos;

profileLink.href=data.html_url;

});