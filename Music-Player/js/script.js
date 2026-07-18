const audio=document.getElementById("audio");
const cover=document.getElementById("cover");
const title=document.getElementById("title");
const artist=document.getElementById("artist");

const play=document.getElementById("play");
const prev=document.getElementById("prev");
const next=document.getElementById("next");

const progress=document.getElementById("progress");
const current=document.getElementById("current");
const duration=document.getElementById("duration");

const volume=document.getElementById("volume");
const repeat=document.getElementById("repeat");

let index=0;
let playing=false;
let repeatMode=false;

function loadSong(i){
audio.src=`songs/${allMusic[i].src}.mp3`;
cover.src=`images/${allMusic[i].img}.jpg`;
title.innerHTML=allMusic[i].name;
artist.innerHTML=allMusic[i].artist;
}

loadSong(index);

play.onclick=()=>{

if(playing){

audio.pause();
playing=false;
play.innerHTML='<i class="fa-solid fa-play"></i>';
document.querySelector(".ring").classList.remove("play");

}else{

audio.play();
playing=true;
play.innerHTML='<i class="fa-solid fa-pause"></i>';
document.querySelector(".ring").classList.add("play");

}

}

next.onclick=()=>{
index++;
if(index>=allMusic.length)
index=0;
loadSong(index);
audio.play();
playing=true;
play.innerHTML='<i class="fa-solid fa-pause"></i>';
document.querySelector(".ring").classList.add("play");
}

prev.onclick=()=>{
index--;
if(index<0)
index=allMusic.length-1;
loadSong(index);
audio.play();
playing=true;
play.innerHTML='<i class="fa-solid fa-pause"></i>';
document.querySelector(".ring").classList.add("play");
}

function format(time){
let min=Math.floor(time/60)||0;
let sec=Math.floor(time%60)||0;
if(sec<10) sec="0"+sec;
return`${min}:${sec}`;
}

audio.addEventListener("loadedmetadata",()=>{
progress.max=Math.floor(audio.duration);
duration.innerHTML=format(audio.duration);
});

audio.addEventListener("timeupdate",()=>{
progress.value=Math.floor(audio.currentTime);
current.innerHTML=format(audio.currentTime);
});

progress.oninput=()=>{
audio.currentTime=progress.value;
}

volume.oninput=()=>{
audio.volume=volume.value/100;
}

repeat.onclick=()=>{
repeatMode=!repeatMode;
repeat.style.color=repeatMode?"#06b6d4":"#fff";
}

const playlist=document.getElementById("playlist");
const playlistBtn=document.getElementById("playlistBtn");

playlistBtn.onclick=()=>{
playlist.classList.toggle("show");
}

function renderPlaylist(){
playlist.innerHTML="";
allMusic.forEach((song,i)=>{
playlist.innerHTML+=`
<li data-index="${i}">
<img src="images/${song.img}.jpg">
<div>
<h4>${song.name}</h4>
<p>${song.artist}</p>
</div>
</li>`;
});

document.querySelectorAll("#playlist li").forEach((item,i)=>{
item.onclick=()=>{
index=i;
loadSong(index);
audio.play();
playing=true;
play.innerHTML='<i class="fa-solid fa-pause"></i>';
document.querySelector(".ring").classList.add("play");
highlight();
};
});

highlight();
}

function highlight(){
document.querySelectorAll("#playlist li").forEach((li,i)=>{
li.classList.toggle("active",i===index);
});
}

renderPlaylist();

audio.onended=()=>{
if(repeatMode){
audio.currentTime=0;
audio.play();
return;
}

index++;

if(index>=allMusic.length)
index=0;

loadSong(index);
audio.play();
playing=true;
play.innerHTML='<i class="fa-solid fa-pause"></i>';
document.querySelector(".ring").classList.add("play");
highlight();
}