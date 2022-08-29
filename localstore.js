class Note {
    constructor(t,n,k,d) {
        this.key=k;
        this.title=t;
        this.note=n;
        this.date=d;
    }
}

let toEdit=null;

if(window.localStorage.getItem('lastkey')==null) 
{
    window.localStorage.setItem('lastkey','1');
}

document.addEventListener("DOMContentLoaded", function() {
    const noteForm=document.querySelector('form');
    noteForm.addEventListener("submit",function(event) {
        const title=document.getElementById('title');
        const note=document.getElementById('note');
        let today,key;
        if(toEdit==null) {
            today = new Date().toLocaleDateString();
            //let n = JSON.parse(localStorage.getItem(localStorage.key(localStorage.length-1)));
            //if(n!=null){key = n.key+1;}else{key=1;}
            key=parseInt(localStorage.getItem('lastkey'));
            //alert(key);
        }
        else {
            today = toEdit.date;
            key = toEdit.key;
        }
        const N=new Note(title.value,note.value,key,today);
        if(title.value!='') {
            window.localStorage.setItem(key,JSON.stringify(N));
            if(toEdit==null) {
                localStorage.setItem('lastkey',key+1);
                //alert(parseInt(localStorage.getItem('lastkey')));
            }
            toEdit=null;
        } 
        else {
            alert("Enter title");
        }
    });
    const showNotes=document.getElementById('notes');
    //showNotes.innerHTML='<div class="container">';
    let n;
    for(let i=0;i<localStorage.length;i++) {
        n=JSON.parse(localStorage.getItem(localStorage.key(i)));
        if(n.key!=null) {
            //showNotes.innerHTML+='<div class="container"><div class="ctr2"><div class="noteinput">'+localStorage.key(i)+'</div></div><div class="ctr2"><div class="noteinput">'+ localStorage.getItem(localStorage.key(i))+'</div></div></div>';
            showNotes.innerHTML+='<div class="container"><div class="noteinput">'+n.title+'</div><div class="noteinput">'+n.note+'</div><div class="noteinput">'+n.date+'</div><div class="ctr2"><button class="del" data-key="'+n.key+'">Delete</button><button class="edit" data-key="'+n.key+'">Edit</button></div></div>';
        }
    }
    //showNotes.innerHTML+="</div>";
    document.querySelectorAll(".del").forEach(function(button) {
        button.onclick=function() {
            //console.log(button.dataset.key);
            localStorage.removeItem(button.dataset.key);
            location.reload(); 
        }
    });
    document.querySelectorAll(".edit").forEach(function(button) {
        button.onclick=function() {
            let n = JSON.parse(localStorage.getItem(button.dataset.key));
            //console.log(n);
            toEdit=n;
            const title=document.getElementById('title');
            const note=document.getElementById('note');
            title.value=n.title;
            note.value=n.note;
        }
    });
    document.getElementById('clr').addEventListener('click',function() {
        toEdit=null;
        const title=document.getElementById('title');
        const note=document.getElementById('note');
        title.value='';
        note.value='';
    });
    document.getElementById('clearall').addEventListener('click', function() {
        toEdit=null;
        window.localStorage.clear();
        window.localStorage.setItem('lastkey','1');
        location.reload();
    });
});