var project_count = 0;
var storage = {};
// var toDoProjcect = document.getElementById("project_option");
// var project = document.getElementById("project");

function projectStorage(what){
    //save in storage
    if(what = "save"){localStorage.setItem('userProject',JSON.stringify(storage))}
    //fetch from storage
    else if(what = "fetch"){JSON.parse(localStorage.getItem("userProject"))}
    //clear storage
    else if (what="reset"){localStorage.clear()}
}
function treatProject(){
    let toDoProjcect = document.getElementById("project_option");
    let opt = toDoProjcect.options[toDoProjcect.selectedIndex];
    let project = document.getElementById("project").value;
    switch(opt.value){
        case "add":
            //for add
            storage[project]= []
            console.log(opt.value);
            console.log(storage);
            break;
        case "delete":
            //for delete
            delete a[project];
            break;
        default:
            break;
        }
    }

    function treatAction(){
        //waht action to perform
        let toDoAction = document.getElementById("action_option");
        let opt = toDoAction.options[toDoAction.selectedIndex];
        //what project to perform it on
        let onProject = document.getElementById("projects");
        let optP = onProject.options[onProject.selectedIndex];
        let action = document.getElementById("project").value;
    }
