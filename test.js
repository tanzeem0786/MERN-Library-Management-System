
const date = Date.now();

let vfexp;

console.log(date);

setTimeout(() => {
    const cdexp = Date.now();
    vfexp = new Date(cdexp).getTime()
    console.log(vfexp);
    
    if( date > vfexp){
        console.log("code expire");
    }
    else {console.log("code executed");}
}, 2000)




    

