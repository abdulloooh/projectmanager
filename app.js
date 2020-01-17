var project_count = 0;
var storage = {};
var projects;
// var toDoProjcect = document.getElementById("project_option");
// var project = document.getElementById("project");

function projectStorage(what){
    //save in storage
    if(what == "save"){localStorage.setItem('userProject',JSON.stringify(storage))}
    //fetch from storage
    else if(what == "fetch"){return JSON.parse(localStorage.getItem("userProject"))}
    //clear storage
    else if (what="reset"){localStorage.clear()}
}
function treatProject(){
    storage = projectStorage("fetch");
    // console.log(storage);
    if(storage == undefined){storage = {}}
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
            delete storage[project];
            break;
        default:
            break;
        }

        projectStorage("save");
        updateClientProjects();
    }

    function treatAction(){
        storage = projectStorage("fetch");
        // updateClientProjects();
        //waht action to perform
        let toDoAction = document.getElementById("action_option");
        let opt = toDoAction.options[toDoAction.selectedIndex].value;
        //what project to perform it on
        let onProject = document.getElementById("projects");
        let optP = onProject.options[onProject.selectedIndex].value;  //selected project title
        let action = document.getElementById("new_action").value;
        switch(opt){
            case "add":
                console.log(optP);
                console.log(typeof(optP));
                console.log(storage.optP);
                //if project not found
                if(!storage[optP]){break}
                storage[optP].push(action);
                break;
            case "delete":
                if(!storage[optP]){return}
                let getIndex = storage[optP].indexOf(action); //get index of the action
                storage.splice(getindex,1);  //remove the action
                break;
            default:
                break;
        }
    projectStorage("save");
    console.log(projectStorage("fetch"));
    }
    function updateClientProjects(){
        storage = projectStorage("fetch");
        console.log(storage);
        projects = Object.keys(storage);
        console.log(projects)
        for(let i=0;i<projects.length;i++){
            let element1 = document.createElement("option");
            let element2 = document.createElement("option");
            element1.setAttribute("value",projects[i]);
            element2.setAttribute("value",projects[i]);
            let attribute1 = document.createTextNode(projects[i]);
            let attribute2 = document.createTextNode(projects[i]);
            element1.appendChild(attribute1);
            element2.appendChild(attribute2);
            //bottom project list
            document.getElementById("project_list").appendChild(element1);
            //top project list
            document.getElementById("projects").appendChild(element2);
        }
    }
