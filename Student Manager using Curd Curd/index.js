window.addEventListener("DOMContentLoaded", () => {

    axios.get("https://crudcrud.com/api/6c12b4a946304c9bacf36968dfb7177a/studentManager")
         .then((response) => {
            for(let i=0; i<response.data.length; i++){
               let length = response.data.length;
                showUserOnScreen(response.data[i],length);
            }

         })
         .catch((error) => console.log(error))

} )

function handleFormSubmit(event)
{
    event.preventDefault();
    
    const userName = event.target.name.value;
    const userPhone = event.target.phone.value;
    const userAddress = event.target.address.value;
    
    let userObject = {

        name : userName,
        phonenumber : userPhone,
        address : userAddress,
    };

         
    axios.post("https://crudcrud.com/api/6c12b4a946304c9bacf36968dfb7177a/studentManager", userObject)
         .then((response)=>{
            let length = response.data.length;
    
            showUserOnScreen(response.data,length);
         })
         .catch((error)=>console.log("ERROR"))
 


      //localStorage.setItem(userEmail, JSON.stringify(userObject));
     
}

function showUserOnScreen(userObject,length)
{ 
    //creating new li element COORECT
     const newLi = document.createElement("li");
     newLi.innerHTML = userObject.name + "  " + userObject.phonenumber + "  " + userObject.address ;
    
     const uoList = document.querySelector("ul");

    uoList.appendChild(newLi);
    


    axios.get("https://crudcrud.com/api/6c12b4a946304c9bacf36968dfb7177a/studentManager")
         .then((response) => {
           
               let length = response.data.length;
               document.getElementById("totalStudent").innerHTML = `All Students:${length}`;  

         })
         .catch((error) => console.log(error))



  
    //creating delete button CORRECT
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class","btn btn-danger")
    deleteBtn.textContent = "Delete";
    newLi.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", function(){
        var id = userObject._id;
        
        axios.delete(`https://crudcrud.com/api/6c12b4a946304c9bacf36968dfb7177a/studentManager/${id}`)
             .then((response)=>{

                uoList.removeChild(newLi);

                axios.get("https://crudcrud.com/api/6c12b4a946304c9bacf36968dfb7177a/studentManager")
                .then((response) => {
                    let length = response.data.length;
                    document.getElementById("totalStudent").innerHTML = `All Students:${length}`;       

                })
                .catch((error) => console.log(error))

             })

             .catch((error)=>console.log("ERROR"))  
             
             

    });


  
    //creating edit button
    const editButton = document.createElement("input");
    editButton.type="button";
    editButton.value = "Edit";
    editButton.setAttribute("class","btn btn-primary");

    newLi.appendChild(editButton);
  
    editButton.onclick = () => {

       // uoList.removeChild(newLi);

        var id = userObject._id;

        axios.delete(`https://crudcrud.com/api/6c12b4a946304c9bacf36968dfb7177a/studentManager/${id}`)
             .then((response)=>{

                uoList.removeChild(newLi);

                axios.get("https://crudcrud.com/api/6c12b4a946304c9bacf36968dfb7177a/studentManager")
                .then((response) => {
                    let length = response.data.length;
                    document.getElementById("totalStudent").innerHTML = `All Students:${length}`;       

                })
                .catch((error) => console.log(error))

             })
             .catch((error)=>console.log("ERROR"))


       document.getElementById("name").value=userObject.name;
       document.getElementById("phone").value=userObject.phonenumber;
       document.getElementById("address").value=userObject.address;   
  
    } 
}