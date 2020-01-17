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
        showActions();
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
                storage[optP].splice(getIndex,1);  //remove the action
                break;
            default:
                break;
        }
    projectStorage("save");
    console.log(projectStorage("fetch"));
    showActions();
    }
    function updateClientProjects(){
        //clear the content first
        document.getElementById("project_list").innerHTML="<option value='Select'>Select</option>";
        document.getElementById("projects").innerHTML=""<option value='Select'>Select</option>";";
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
function showActions(){
    storage = projectStorage("fetch");
    //clear current state of action box
    document.getElementById("actions_list").innerHTML = "";

    console.log('getted');
    //get selected project
    let project = document.getElementById("project_list");
    let selected_project = project.options[project.selectedIndex].value; 
    console.log(selected_project);
    get_content = storage[selected_project];
    console.log(get_content);
    if(!get_content){return}   //If no content present
    //create contents to be added
   for(let  i=0;i<get_content.length;i++){
    let element = document.createElement("p");
    element.setAttribute("class","actions_displayed");
    let attribute = document.createTextNode(get_content[i]);
    element.appendChild(attribute);
    document.getElementById("actions_list").appendChild(element);
   }
}