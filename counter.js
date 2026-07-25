// Kingshot Counter Tool
// Counter Logic
// © Stiefel™
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
