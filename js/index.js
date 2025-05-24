var SiteName=document.getElementById("SiteName")
var SiteURL=document.getElementById("SiteURL")
var deletebtn=document.getElementById("delete")
var visitbtn=document.getElementById("visit")
const dialog = document.getElementById("rulesDialog");
var bookmarks
if(localStorage.getItem("bookmarks")!=null){
    bookmarks=JSON.parse(localStorage.getItem("bookmarks"))
    display()
}
else{
    bookmarks=[]
}
function openDialog() {
    dialog.showModal();
}
function closeDialog() {
    dialog.close(); 
}
function validation(element){
    var regex={
        SiteName:/^(https?:\/\/)[^\s/$.?#].[^\s]*$/,
        SiteURL:/https:\/\/[a-z]+\.com/
    }
    if(regex[element.id].test(element.value)){
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        element.nextElementSibling.classList.replace("d-block","d-none")
    }
    else{
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
        element.nextElementSibling.classList.replace("d-none","d-block")
        SiteURL.addEventListener('blur', function() {
            openDialog();
        });
    }

}
function addbookmark(){
    var bookmark={
        Bname:SiteName.value,
        URL:SiteURL.value,
    }
    for(var i=0; i<bookmarks.length; i++){
        if(bookmarks[i].Bname.toUpperCase()===SiteName.value.toUpperCase()){
            alert("cant add same name!")
            return;
        }
    }
    bookmarks.push(bookmark)
    console.log(bookmarks);
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
    display()
}
function display(){
    var output = ""
    for(var i=0;i<bookmarks.length;i++){
        output+=`
                    <tr>
                        <td>${i}</td>
                        <td>${bookmarks[i].Bname}</td>
                        <td><button id="visit" class="text-capitalize rounded border-0 text-white px-3 py-2" onClick="visit(${i})"><i class="fa-solid fa-eye"></i> visit</button></td>
                        <td><a href="#" id="delete" class="text-decoration-none text-capitalize rounded border-0 text-white px-3 py-2" onClick="deleteBookmark(${i})"><i class="fa-solid fa-trash-can"></i> delete</a></td>
                    </tr>
                `
    }
    document.getElementById("tbody").innerHTML=output
    console.log(SiteURL.value);
}
function deleteBookmark(id){
    bookmarks.splice(id,1)
    display()
    localStorage.setItem("bookmaeks",JSON.stringify(bookmarks))
}
function visit(id){
    window.open(bookmarks[id].URL, "_blank");
}
