// Kingshot Counter Tool
// Counter Logic
// © Stiefel™
const inf = document.getElementById("inf");
const cav = document.getElementById("cav");
const arc = document.getElementById("arc");

const mode = document.getElementById("mode");
const target = document.getElementById("target");
const enemyTier = document.getElementById("enemyTier");
const lang = document.getElementById("lang");

const out = document.getElementById("out");
const copyBtn = document.getElementById("copyBtn");
function autoFill(changed){
    let i = parseInt(inf.value) || 0;
    let c = parseInt(cav.value) || 0;
    let a = parseInt(arc.value) || 0;

    if(changed==="inf"){
        if(i + c <= 100) arc.value = 100 - i - c;
    }

    if(changed==="cav"){
        if(i + c <= 100) arc.value = 100 - i - c;
    }

    if(changed==="arc"){
        if(i + a <= 100) cav.value = 100 - i - a;
    }
}
function calc(){
let i=+inf.value,c=+cav.value,a=+arc.value;
const allout = target.value === "allout";
if (allout) {
    calcAllOut();
    return;
}
if(i+c+a!==100){
    out.innerHTML="<b>100% required.</b>";
    return;
}

const vals={Infantry:i,Cavalry:c,Marksmen:a};
const sorted=Object.entries(vals).sort((x,y)=>y[1]-x[1]);
const enemy=sorted[0][0];
const highest=sorted[0][1];
const second = sorted[1][1];
const gap = highest - second;
const counter={
"Infantry":"Marksmen",
"Marksmen":"Cavalry",
"Cavalry":"Infantry"
};

const names={
de:{Infantry:"Infanterie",Cavalry:"Kavallerie",Marksmen:"Schützen"},
en:{Infantry:"Infantry",Cavalry:"Cavalry",Marksmen:"Marksmen"},
es:{Infantry:"Infantería",Cavalry:"Caballería",Marksmen:"Tiradores"},
zh:{Infantry:"步兵",Cavalry:"骑兵",Marksmen:"射手"}
};

let l=lang.value,t=text[l];
const tier = enemyTier.value;
let stage="Balanced Counter";
let filler=33;
let leaderPercent = 45;
let fillerPercent = filler;

if(highest>=60 || gap>=35){
    stage="Heavy";
    filler=50;
}
else if(highest>=50 || gap>=20){
    stage="Medium";
    filler=46;
}
else if(highest>=40 || gap>=10){
    stage="Light";
    filler=44;
}
else{
    stage="Balanced Counter";
    filler=42;
}
if(tier === "plus1"){
    if(stage === "Balanced Counter") stage = "Light";
    else if(stage === "Light") stage = "Medium";
    else if(stage === "Medium") stage = "Heavy";
}
leaderPercent = 45;
fillerPercent = filler;
if(tier === "plus1"){
    leaderPercent = 50;
}
switch(target.value){

case "castle":

    if(stage === "Balanced Counter"){
        leaderPercent = (tier === "plus1") ? 52 : 50;
        fillerPercent = 42;
    }
    else if(stage === "Light"){
        leaderPercent = (tier === "plus1") ? 58 : 56;
        fillerPercent = 42;
    }
    else if(stage === "Medium"){
        leaderPercent = (tier === "plus1") ? 64 : 62;
        fillerPercent = 44;
    }
    else{
        leaderPercent = (tier === "plus1") ? 70 : 68;
        fillerPercent = 47;
    }

    break;
case "outpost":

    if(stage === "Balanced Counter"){
        leaderPercent = (tier === "plus1") ? 60 : 58;
        fillerPercent = 44;
    }
    else if(stage === "Light"){
        leaderPercent = (tier === "plus1") ? 64 : 62;
        fillerPercent = 45;
    }
    else if(stage === "Medium"){
        leaderPercent = (tier === "plus1") ? 69 : 67;
        fillerPercent = 47;
    }
    else{
        leaderPercent = (tier === "plus1") ? 74 : 72;
        fillerPercent = 50;
    }

    break;

case "shrine":

    if(stage === "Balanced Counter"){
        leaderPercent = (tier === "plus1") ? 66 : 64;
        fillerPercent = 46;
    }
    else if(stage === "Light"){
        leaderPercent = (tier === "plus1") ? 70 : 68;
        fillerPercent = 48;
    }
    else if(stage === "Medium"){
        leaderPercent = (tier === "plus1") ? 76 : 74;
        fillerPercent = 50;
    }
    else{
        leaderPercent = (tier === "plus1") ? 82 : 80;
        fillerPercent = 53;
    }

    break;

}
let main=counter[enemy];

function dist(main,p){
let rest=100-p;
let side=Math.floor(rest/2);

let d={Infantry:side,Cavalry:side,Marksmen:side};
d[main]=p;
let keys=["Infantry","Cavalry","Marksmen"];
let rem=100-(d.Infantry+d.Cavalry+d.Marksmen);
for(let k of keys){
 if(k!=main){d[k]+=rem;break;}
}
return `${d.Infantry}% ${names[l].Infantry}<br>${d.Cavalry}% ${names[l].Cavalry}<br>${d.Marksmen}% ${names[l].Marksmen}`;
}
let leader=dist(main,leaderPercent);
let fillers=dist(main,fillerPercent);
let advantage;
if(mode.value==="rally"){

}
if(stage === "Balanced Counter"){
    advantage = t.advMinimal;
}
else if(stage === "Light"){
    advantage = t.advGood;
}
else if(stage === "Medium"){
    advantage = t.advStrong;
}
else{
    advantage = t.advExcellent;
}

if(tier === "plus1"){
    if(advantage === t.advExcellent){
        advantage = t.advStrong;
    }
    else if(advantage === t.advStrong){
        advantage = t.advGood;
    }
    else if(advantage === t.advGood){
        advantage = t.advMinimal;
    }
}

out.innerHTML = `
<b>${t.enemyFocus}:</b> ${names[l][enemy]} (${highest}%)<br>
<b>${t.counterLevel}:</b> ${stage}<br>
<b>${t.enemyWeakness}:</b> ${advantage}
📤 <b>${t.dist}:</b><br>${leader}<br><br>
👥 <b>${t.fill}:</b><br>${fillers}
`;
copyBtn.style.display="block";
copyBtn.innerText=t.copy;
}else{
out.innerHTML="<b>"+t.lead+":</b><br>"+dist(main,leaderPercent);
copyBtn.style.display="none";

}
}
 
function calcAllOut(){

const l = lang.value;
const t = text[l];

const names = {
    de:{Infantry:"Infanterie",Cavalry:"Kavallerie",Marksmen:"Schützen"},
    en:{Infantry:"Infantry",Cavalry:"Cavalry",Marksmen:"Marksmen"},
    es:{Infantry:"Infantería",Cavalry:"Caballería",Marksmen:"Tiradores"},
    zh:{Infantry:"步兵",Cavalry:"骑兵",Marksmen:"射手"}
};

const vals = {
    Infantry:+inf.value,
    Cavalry:+cav.value,
    Marksmen:+arc.value
};

const sorted = Object.entries(vals).sort((a,b)=>b[1]-a[1]);

const enemy = sorted[0][0];
const highest = sorted[0][1];
const second = sorted[1][1];
const tie = highest === second;
const gap = highest - second;
const counter = {
    Infantry:"Marksmen",
    Marksmen:"Cavalry",
    Cavalry:"Infantry"
};

let main = counter[enemy];

if(tie){
    if(
        (enemy === "Infantry" && sorted[1][0] === "Marksmen") ||
        (enemy === "Marksmen" && sorted[1][0] === "Infantry")
    ){
        main = "Cavalry";
    }

    else if(
        (enemy === "Infantry" && sorted[1][0] === "Cavalry") ||
        (enemy === "Cavalry" && sorted[1][0] === "Infantry")
    ){
        main = "Marksmen";
    }

    else{
        main = "Infantry";
    }
const gap = highest - second;
}
let percent = 42;

const tier = enemyTier.value;
if(tie){
    percent = (tier === "plus1") ? 39 : 42;
}
else{
    percent = Math.round(highest * 0.8 + 14);
}
if(gap >= 20){
    percent += 2;
}

if(gap >= 35){
    percent += 2;
}

if(gap <= 2){
    percent -= 2;
}

if(percent > 70){
    percent = 70;
}

if(percent < 42){
    percent = 42;
}
}
let advantage;
if(tier === "plus1"){
    advantage = "Reduced";
}
else if(gap >= 40){
    advantage = "Extreme";
}
else if(gap >= 30){
    advantage = "High";
}
else if(gap >= 20){
    advantage = "Good";
}
else if(gap >= 10){
    advantage = "Balanced";
}
else{
    advantage = "Low";
}
if(tie){
    advantage = (tier === "plus1") ? "Balanced" : "Good";
}
function dist(main,p){

    let rest = 100 - p;
    let side = Math.floor(rest / 2);

    let d = {
        Infantry:side,
        Cavalry:side,
        Marksmen:side
    };

    d[main] = p;

    let rem = 100 - (d.Infantry + d.Cavalry + d.Marksmen);

    if(main !== "Infantry"){
        d.Infantry += rem;
    }
    else{
        d.Cavalry += rem;
    }

    return d;
}
   
if(advantage === "Extreme"){
    percent += 4;
}
else if(advantage === "High"){
    percent += 2;
}
else if(advantage === "Balanced"){
    percent -= 2;
}

if(percent > 70) percent = 70;
if(percent < 45) percent = 45;
if(tier === "plus1"){
    percent -= 3;
}
const d = dist(main, percent);
out.innerHTML = `
<b>⚔️ All Out Counter</b><br><br>
<b>${t.enemyFocus}:</b>
${tie ? "Mixed (" + highest + "% / " + second + "%)" : names[l][enemy] + " (" + highest + "%)"}<br>

<b>Counter Strength:</b> ${advantage}<br><br>

<b>${t.lead}:</b><br>
${d.Infantry}% ${names[l].Infantry}<br>
${d.Cavalry}% ${names[l].Cavalry}<br>
${d.Marksmen}% ${names[l].Marksmen}
`;

copyBtn.style.display = "none";
}
}
function copyResult(){

    const temp = document.createElement("div");
    temp.innerHTML = out.innerHTML;

    const lines = temp.innerText.split("\n");

    const start = lines.findIndex(line =>
        line.includes("Fillers") ||
        line.includes("Füller") ||
        line.includes("Participantes")
    );

    if(start < 0){
        alert("No filler troops found.");
        return;
    }

    const copyText =
    "👥 Fillers\n\n" +
    lines.slice(start + 1).join("\n");

    navigator.clipboard.writeText(copyText).then(() => {
        copyBtn.innerText = "Copied!";
        setTimeout(() => {
            copyBtn.innerText = text[lang.value].copy;
        },1500);
    });

}
