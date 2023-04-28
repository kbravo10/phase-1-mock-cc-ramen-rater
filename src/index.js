// write your code here



//event listener: wait until the page has loaded to start
document.addEventListener("DOMContentLoaded",(e) => {
    e.preventDefault();

//Necessary function() 
//changing input "name" attribute of comment to "comment"
document.getElementById('new-comment').setAttribute("name", "comment")
//creating button image to display all ramen choices
    function addMenuItems(items){
        const ramenMenu = document.querySelector("div#ramen-menu")

        const img = document.createElement("img");
        const btn = document.createElement("button")

        img.setAttribute("src", items["image"])
        btn.setAttribute("type", "click");
        btn.setAttribute("id", items["id"]);
        btn.appendChild(img);
        ramenMenu.appendChild(btn)
    
    
        btn.addEventListener("click", (event) =>{
            event.preventDefault();
            loadMenuInfo(items)})

 
    
}
    
//Display ramen information based on button selected
    function loadMenuInfo(ramenInfo){
        const ramDetails = document.getElementById("ramen-detail");
        const detailImg = ramDetails.querySelector("img.detail-image");
        const name = ramDetails.querySelector("h2.name");
        const restaurant = ramDetails.querySelector("h3.restaurant");
        const rating = document.getElementById("rating-display");
        const comment = document.getElementById("comment-display");
    
        
        detailImg.setAttribute('src',ramenInfo["image"]);
        name.textContent = ramenInfo["name"];
        restaurant.textContent = ramenInfo["restaurant"];
        rating.textContent = ramenInfo["rating"];
        comment.textContent = ramenInfo["comment"];

        //add event listener to change comments and rating
        /*
        const editForm = document.getElementById("edit-ramen");
        editForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const editInfo = Object.fromEntries(new FormData(editForm));
            rating.textContent = editForm.rating.value;
            comment.textContent = editInfo["new-comment"]
            
        
        
    })*/
    }

//GET the default ramen and info 
    fetch("http://localhost:3000/ramens",{
        method:"GET",
        headers:{
            "Content-Type":"applications/json",
            "Accespt":"application/json" 
        },
    })
    .then(res => res.json())
    .then((menuRes) => {
        loadMenuInfo(menuRes[0])
        menuRes.forEach(menuItems => {
            addMenuItems(menuItems);
        })})


    //Get the user input
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
       
        const userNewRamen = Object.fromEntries(new FormData(form));
        addMenuItems(userNewRamen)
    })


});