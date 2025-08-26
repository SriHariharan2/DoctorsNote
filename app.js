class note{
    constructor(Tokenno , name , age , visit , date ){
        this.Tokennumber = Tokenno;
        this.PatientName = name;
        this.PatientAge = age;
        this.Purposeofvisit = visit;
        this.dateofvisit = date;
    }
}

class UI{
    adddata(note){
       const pd=  document.querySelector(".patient-data")

       const tr = document.createElement("tr")
       tr.className="collection-item";
        tr.innerHTML =`<td>${note.Tokennumber}</td>
                    <td>${note.PatientName}</td>
                    <td>${note.PatientAge}</td>
                    <td>${note.Purposeofvisit}</td>
                    <td>${note.dateofvisit}</td>
                    <td><span class="btn btn-danger" id="delete">X</span></td>`
        pd.appendChild(tr);
        }

        clearfields(){
           
             document.querySelector("#Tokennumber").value = "";
             document.querySelector("#PatientName").value = "";
             document.querySelector("#PatientAge").value =  "";
             document.querySelector("#visit").value = "";
             document.querySelector("#date").value = "";
        }

        clearall(){
            document.querySelector(".patient-data").innerHTML= null;
            this.showalert("Your Data Reset Successfully","success")
        }

        removesep(e){
            if(e.classList.contains("collection-item"))
                {
                    if(confirm("You want to delete this Patient Data"))
                    {
                        e.remove();
                    }  
                }
        }

    

        showalert(msg, classname){
            const alert = document.querySelector("#alertmsg");
            alert.className = `alert alert-${classname}`;
            alert.innerText = msg;
            alert.style.display ="block";

            setTimeout(function(){
                alert.style.display ="none";
            },2000)
        }

       
}



class Storage{

    getdata(){
        let lsdata;

        if(localStorage.getItem("Patientsdata") === null){
            lsdata=[];
        }
        else{
            lsdata =  JSON.parse(localStorage.getItem("Patientsdata"));
        }

        return lsdata;
    }

    adddata(padata){

        const pdata = this.getdata();
        pdata.push(padata);
        localStorage.setItem("Patientsdata",JSON.stringify(pdata));
    }

    removealldata(){
        localStorage.removeItem("Patientsdata");
    }
    
    removesepdata(tkn){
        const padata = this.getdata();
        padata.forEach(function(e,index){
            if(e.Tokennumber === tkn)
            {
                padata.splice(index,1);
            }
        })
        localStorage.setItem("Patientsdata",JSON.stringify(padata))
    }
   
        displaydata(){
           const pdat = this.getdata();

           pdat.forEach(function(datas){

            const ui = new UI();
            ui.adddata(datas);
           })
        }
}





document.addEventListener("DOMContentLoaded",function(){
    const storage = new Storage();
    storage.displaydata()
});






//save the data
const save = document.querySelector("#doctor-form")

save.addEventListener("submit",function(e){

    e.preventDefault();

    const Tokennumber = document.querySelector("#Tokennumber").value;
    const PatientName = document.querySelector("#PatientName").value
    const PatientAge = document.querySelector("#PatientAge").value
    const Purposeofvisit = document.querySelector("#visit").value
    const dateofvisit = document.querySelector("#date").value


    //AlreadyExist
    
    let alreadyexist = false;
    const existdata = document.querySelectorAll(".patient-data tr")
    for(const alreadyy of existdata){
        const existtoken = alreadyy.querySelector("td:nth-child(1)").innerText;
        // console.log(`your token :${existtoken}`)
            if(existtoken === Tokennumber){
                alreadyexist = true;
                break;
            }
    }




    if(Tokennumber === "" || PatientName === "" ||PatientAge === "" ||Purposeofvisit === "" ||dateofvisit ==="")
    {
        const ui = new UI();
        ui.showalert("Please fill the DataFields","danger");
    }else{
            if(alreadyexist){
                const ui = new UI();
                ui.showalert("TokenNumber Already Exist","danger");
            }
            else{
            const dnote = new note(Tokennumber,PatientName,PatientAge,Purposeofvisit,dateofvisit);
            console.log(dnote);

            const ui = new UI();
            ui.adddata(dnote);
            ui.showalert("Saved Successfully","success");
            ui.clearfields();
            const storage = new Storage();
            storage.adddata(dnote);
            }
        }
        })


    //clear all
    document.querySelector("#Clearall").addEventListener("click",function(){
        if(confirm("You want to Reset Data Permanently ?")){
        const ui = new UI();
        ui.clearall();
        const storage = new Storage();
        storage.removealldata();
        }
        
    })

//clear separate
document.querySelector(".patient-data").addEventListener("click",function(e){

    const remove = e.target.parentElement.parentElement;
    const Tknno = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
    
    console.log(Tknno)
    const ui = new UI();
    ui.removesep(remove);
    const storage = new Storage();
    storage.removesepdata(Tknno);


})


//search

document.querySelector("#search-input").addEventListener("keyup",function(e){
    let searchno = e.target.value;
    const storage = new Storage();
    var getdatas = storage.getdata();

    let found=null;
    getdatas.forEach(function(datas){
        if(datas.Tokennumber === searchno)
        {
            found = datas;
        }
    })

    if(found !== null){
        document.querySelector("#patient-details").style.display= "block";
        document.querySelector("#detail-token").innerText=found.Tokennumber;
         document.querySelector("#detail-name").innerText=found.PatientName;
          document.querySelector("#detail-age").innerText=found.PatientAge;
           document.querySelector("#detail-purpose").innerText=found.Purposeofvisit;
            document.querySelector("#detail-date").innerText=found.dateofvisit;
    }
    else{
                document.querySelector("#patient-details").style.display= "block";
                 document.querySelector("#detail-token").innerText="NO DATA";
        
    }

})