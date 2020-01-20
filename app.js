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
    if( projectss[i].trim() == x){return true} //true means project exist
    }
 }
    return false //false means cannot find project
}

function treatProject(){
    // feedback var
    let fback = document.getElementById('saved1')
    storage = projectStorage("fetch");
    // //console.log(storage);
    if(storage == undefined){storage = {}}
    let toDoProjcect = document.getElementById("project_option");
    let opt = toDoProjcect.options[toDoProjcect.selectedIndex];
    let project = document.getElementById("project");
    //avoid empty input
    if(project.value.trim() == ""){
        fback.innerText = "Arrgh!!! Empty input, enter your project's name"
        fback.style.display = "block"
        setTimeout(()=>{ fback.style.display='none';fback.innerText = ""}, 3000)
        project.focus();
        return;
    }
    switch(opt.value){
        case "-select an option-":   //when no option is selected
        fback.innerText = "Kindly select an option!!!"
        fback.style.display = "block"
        setTimeout(()=>{ fback.style.display='none';fback.innerText = ""}, 2000)
            break;
        case "add":
            //for add
            //check if project already exists
            let check = checkProject(project.value.trim());
            if (check == true){
                //console.log('here');
                  //feedback
                fback.style.display = "block"
                fback.innerText = "Project already exists!!!"
                setTimeout(()=>{ fback.style.display='none';fback.innerText=""}, 2000)
                project.focus();
                return;
            }
            //console.log('passed');
            if(!storage){storage={}}
            storage[project.value.trim()]= []
            //console.log(opt.value);
            //console.log(storage);
            //feedback
            fback.innerText = "Saved!!!"
            fback.style.display = "block"
            setTimeout(()=>{ fback.style.display='none';fback.innerText = ""}, 2000)
            project.value = "";
            break;
        case "delete":
            // console.log("here1");
            //for delete
            //check if project exists
            if(checkProject(project.value) == false){
                // console.log("here2");
                fback.innerText = "Thi sproject does not exits or has already been deleted"
                fback.style.display = "block"
                setTimeout(()=>{ fback.style.display='none';fback.innerText = ""}, 2000)
                break;
            }
            delete storage[project.value];
            //feedback
            fback = document.getElementById('saved1')
            fback.innerText = "Deleted!!!"
            fback.style.display = "block"
            setTimeout(()=>{ fback.style.display='none';fback.innerText = ""}, 2000)

            project.value = "";
            project.focus();
            break;
        default:
            break;
        }
        // console.log("here3");
        projectStorage("save");
        updateClientProjects();
        showActions();
    }

    function treatAction(){
        let fback = document.getElementById("saved2");
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
            // fback = document.getElementById("#saved2")
            fback.innerText = "Choose a project to process";
            fback.style.display = "block"
            setTimeout(()=>{ 
                fback.style.display='none';
                fback.innerText = ""}, 2000);
            return;
        }
        let action = document.getElementById("new_action");
        //prevent empty input
        if(action.value.trim() == ""){
            fback.innerText = "Arrgh! Empty input, enter input for action";
            fback.style.display = "block";
            setTimeout(()=>{
                 fback.style.display='none';
                 fback.innerText = "";}, 2000)
            action.focus();
            return;
        }
        let getIndex = storage[optP].indexOf(action.value);
        switch(opt){
            case "-select an option-":  //if no option is selected
            fback.innerText = "Please select an option to process"
            fback.style.display = "block"
            setTimeout(()=>{ fback.style.display='none';fback.innerText = ""}, 2000)
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
                        fback.innerText = "The Action has already been added"
                        fback.style.display = "block"
                        setTimeout(()=>{ fback.style.display='none';fback.innerText = ""}, 2000)
                        action.focus();
                        return;
                    }
                }
                storage[optP].push(action.value);
                //feedback
            // fback = document.getElementById('saved2')
            fback.innerText = "Saved!!!"
            fback.style.display = "block"
            setTimeout(()=>{ fback.style.display='none'}, 2000)
                action.value = "";
                break;
            case "delete":
                if(!storage[optP]){return}
                //check if actions still exists
                if(getIndex == -1){
                    fback.innerText = "Oops!!! The project does not exist or has already been deleted"
                    fback.style.display = "block"
                    setTimeout(()=>{ fback.style.display='none';fback.innerText = ""}, 2000)
                    action.focus();
                    return;
                }
                // remove the action
                storage[optP].splice(getIndex,1);  
                  //feedback
                // fback = document.getElementById('saved2')
                fback.innerText = "Deleted!!!"
                fback.style.display = "block"
                setTimeout(()=>{ fback.style.display='none';fback.innerText=""}, 2000)
                action.value = "";
                break;
            default:
                break;
        }
    projectStorage("save");
    //console.log(projectStorage("fetch"));
    showActions();
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
    // console.log(selected_project);
    //clear view
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
    // let element = document.createElement("li");
    // element.setAttribute("class","actions_displayed");
    // let attribute = document.createTextNode(get_content[i]);
    // element.appendChild(attribute);
    // document.getElementById("actions_list").appendChild(element);
    document.getElementById("actions_list").innerHTML+="<p class = 'act'> <input type='checkbox' class='check' id='' onchange=mark_action()> <span class='content'>"+get_content[i]+"</span></p>"
   }

}

function mark_action(){ //if action is checked
    let check = document.getElementsByClassName('check');
    let act = document.getElementsByClassName("act");
    let content = document.getElementsByClassName("content");
    for(let i =0;i<check.length;i++){
        storage = projectStorage("fetch");
        // console.log(storage)
        if (check[i].checked == true){
            //get the concerned project
            let project = document.getElementById("project_list");
            let selected_project = project.options[project.selectedIndex].value; 
            //get content of span tag which is the action to be deleted before it is deleted and get its index
            let save_content = content[i].innerText;
            let getIndex = storage[selected_project].indexOf(save_content)
            console.log(selected_project)
            //first remove it from display 
            setTimeout(()=>act[i].style.display= "none" , 1000);
            //then delete it from storage
            storage[selected_project].splice(getIndex,1);
            //update storage
            projectStorage("save");
            // showActions();
        }
}
}