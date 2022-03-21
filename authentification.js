

/* pour verifier l'authentification*/ 
let ver=0;//on va utuliser cette variable pour eviter la repitition du message
function verify()
{
  
    event.preventDefault();  
    var nom=document.getElementById("idinp1").value; 
    
    var pass=document.getElementById("idinp2").value;
    
    
    var utilisateur=localStorage.getItem(nom);
    var data=JSON.parse(utilisateur);
    console.log(data);

   if(utilisateur==null){
    if(ver==0){
    var x=document.createElement("P");
    x.innerHTML="wrong usename";
    x.setAttribute("id","Faa");
    x.classList.add("Faa");
    document.getElementById("message").appendChild(x);
    ver=1;
   
    }
    }
else if(nom==data.user && cryptPass(pass)==data.pass){
    if(ver==0){
  
    var x=document.createElement("P");
    x.innerHTML="loged in";
    x.setAttribute("id","Tr");
    x.classList.add("Tr");
    document.getElementById("message").appendChild(x);
    ver=1;
  
    }

}
else
{
if(ver==0){

    var x=document.createElement("P");
    x.innerHTML="wrong password";
    x.setAttribute("id","Faa");
    x.classList.add("Faa");
    document.getElementById("message").appendChild(x);
    ver=1;
    
}
}

}  









/*pour s'inscrire  */ 
function Ajouter()
{
    event.preventDefault();
    var nomm=document.getElementById("nom").value;
    var mdp=document.getElementById("pass").value;
    var utilisateur={
        "user":nomm,
        "pass":cryptPass(mdp),
    };

    localStorage.setItem(nomm,JSON.stringify(utilisateur));
    console.log('-------------------------------------');
  


}



/*  des fonctions pour vider les inputs l orsqu on clique une deuxieme fois  */ 

function fct1(){
    document.getElementById("nom").value="";
    
}





function fct3(){
    document.getElementById("idinp1").value="";
    document.getElementById('message').innerHTML = "";

    ver=0;
}

function fct4(){
    document.getElementById("idinp1").value="";
    document.getElementById('message').innerHTML = "";

    ver=0;ver2=0;
}









//fonction de hasgage 
const cryptPass = function(str) {
    const hs=[0xdeadbeef ^ 0,0x41c6ce57 ^ 0,0xfae69b63 ^ 0,0xbadcaffe ^ 0];
    const imu2prm=[2654435761,1597334677,9745628194,6219433873,
                   2246822507,3266489909,9807643451,4576128788];
    let hash,i,ch;
    for (i = 0; i < str.length; i++) {
        ch = str.charCodeAt(i);
        for(let j=0;j<4;j++){
            hs[j] = Math.imul(hs[j] ^ ch, imu2prm[j]);
        }
    }  
    for(i=0;i<4;i+=2){
        hs[i] = Math.imul(hs[i] ^ (hs[i]<<32), imu2prm[i+4]) ^ Math.imul(hs[i+1] ^ (hs[i+1]<<9), imu2prm[i+5]);
        hs[i+1] = Math.imul(hs[i+1] ^ (hs[i+1]<<32), imu2prm[i+4]) ^ Math.imul(hs[i] ^ (hs[i]<<9), imu2prm[i+5]);
    } 

    hash=(hs[1]>>>0).toString(32).padStart(16,(hs[2]>>>0).toString(16).padStart(8,0));
    hash+=(hs[0]>>>0).toString(32).padStart(16,(hs[3]>>>0).toString(16).padStart(8,0));
    return hash;
 };