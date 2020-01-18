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

//chcek if project already exists
function checkProject(x){
    storage = projectStorage("fetch");
 if(storage){
    let projectss = Object.keys(storage);
    for(let i = 0;i<projectss.length;i++){
    if( projectss[i] == x){return true}
    }
 }
    return false
}

function treatProject(){
    storage = projectStorage("fetch");
    // //console.log(storage);
    if(storage == undefined){storage = {}}
    let toDoProjcect = document.getElementById("project_option");
    let opt = toDoProjcect.options[toDoProjcect.selectedIndex];
    let project = document.getElementById("project");
    switch(opt.value){
        case "-select an option-":   //when no option is selected
            alert("Please select an option for the project to continue");
            break;
        case "add":
            //for add
            //check if project already exists
            let check = checkProject(project.value);
            if (check == true){
                //console.log('here');
                alert("Project already exists");
                return;
            }
            //console.log('passed');
            if(!storage){storage={}}
            storage[project.value]= []
            //console.log(opt.value);
            //console.log(storage);
            project.value = "";
            break;
        case "delete":
            //for delete
            delete storage[project.value];
            project.value = "";
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
        //if no ptoject is selected, stop executing
        if(optP == "-choose"){
            alert("Choose a project to process");
            return;
        }
        let action = document.getElementById("new_action");
        let getIndex = storage[optP].indexOf(action.value);
        switch(opt){
            case "-select an option-":  //if no option is selected
                alert("Please select an action option to process");
                break;
            case "add":
                //console.log(optP);
                //console.log(typeof(optP));
                //console.log(storage.optP);
                //if project not found
                if(!storage[optP]){break}
                //if project found, check if action already exists
                if(storage[optP]){
                    // let check_action = storage[optP].indexOf(action.value);
                    if(getIndex != -1){
                        alert("Action already added");
                        return;
                    }
                }
                storage[optP].push(action.value);
                action.value = "";
                break;
            case "delete":
                if(!storage[optP]){return}
                // let getIndex = storage[optP].indexOf(action.value); //get index of the action
                storage[optP].splice(getIndex,1);  //remove the action
                action.value = "";
                break;
            default:
                break;
        }
    projectStorage("save");
    //console.log(projectStorage("fetch"));
    showActions();
    }
    function clearActions(){

    }
    function updateClientProjects(){
        //clear the content first
        document.getElementById("project_list").innerHTML="<option  value='-choose a project- '' style='opacity: 0.3;''>-choose a project-</option>";
        document.getElementById("projects").innerHTML="<option value=-choose a project -'' style='opacity: 0.3;''>-choose a project-</option>";
        storage = projectStorage("fetch");
        //console.log(storage);
        if(!storage){return}
        projects = Object.keys(storage);
        //console.log(projects)
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

    //console.log('getted');
    //get selected project
    let project = document.getElementById("project_list");
    let selected_project = project.options[project.selectedIndex].value; 
    //console.log(selected_project);
    if(!storage){return}
    get_content = storage[selected_project];
    //console.log(get_content);
    if(!get_content){
        // document.getElementById("actions_list").style.background="unset";
        // document.getElementById("actions_list").style.border="none";
        return
    }   //If no content present
    //create contents to be added
   for(let  i=0;i<get_content.length;i++){
    let element = document.createElement("li");
    element.setAttribute("class","actions_displayed");
    let attribute = document.createTextNode(get_content[i]);
    element.appendChild(attribute);
    document.getElementById("actions_list").appendChild(element);
   }
}