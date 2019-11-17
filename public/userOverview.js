class UserOverview {

    constructor(){
        this.users = [];
        this.loadData();
        
    }

    addUserClick(){
        this.showAddUserPanel();
        initFloats();
    }

    saveUserClick(){

        var elements = document.getElementById("newUserForm").elements

        var obj ={};
        for(var i = 0 ; i < elements.length ; i++){
            var item = elements.item(i);
            obj[item.name] = item.value;
        }
        obj["id"] = Math.round(Math.random() * 100000000);
        
        if(this.users){
            this.users.push(obj);
        } else {
            this.users = []
            this.users.push(obj);
        }
        
        this.saveData();
        this.hideAddUserPanel();
    }
    
    hideAddUserPanel(){
        $("#addUserPanel").css("display", "none");
    }
    
    showAddUserPanel(){
        $("#addUserPanel").css("display", "block");
    }

    removeUser(userId){
        this.users = this.users.filter(function( obj ) {
            return obj.id != userId;
        });

        this.saveData()
    }

    loadData() {
        $.get("getUsers").done((response) => {
            this.users = response.userList;

            if (this.users) {
                this.showData();
            } else {
                $("#userList").html("No users found, add them using the button above!");
            }            
        });   
        
    }

    saveData(){
        var jsonData = {
            userList: this.users
        };

        $.post("getUsers", jsonData).done((response) => {
            this.loadData();
        });  
    }

    showData(){

        var myTableDiv = $("#userList");
        var table = document.createElement('TABLE');
        table.setAttribute("class", "grid");
        var tableBody = document.createElement('TBODY');
        tableBody.setAttribute("class", "gridBody");
            
        table.appendChild(tableBody);
            
        var heading = new Array();
        heading[0] = "Name"
        heading[1] = "Surname"
        heading[2] = "Birth"
        heading[3] = "Gender"
        heading[4] = "Actions"
            
        var stock = this.users
           
        var tr = document.createElement('TR');
        tr.setAttribute("class", "gridHeader");
        tableBody.appendChild(tr);

        for (var i = 0; i < heading.length; i++) {
            var th = document.createElement('TH')
            th.width = '75';
            th.appendChild(document.createTextNode(heading[i]));
            tr.appendChild(th);
           
        }
            
        let alternating = false;
        for (var i = 0; i < stock.length; i++) {
            alternating = !alternating;
            var tr = document.createElement('TR');
            if(alternating){
                tr.setAttribute("class", "gridAlterRow");
            }
            else{
                tr.setAttribute("class", "gridRow");
            }
            
            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(stock[i].name));
            tr.appendChild(td)

            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(stock[i].surName));
            tr.appendChild(td)

            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(stock[i].birth));
            tr.appendChild(td)

            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(stock[i].gender));
            tr.appendChild(td)

            var td = document.createElement('TD')
            var a = document.createElement('A');
            a.setAttribute('class', "iconButton mdi mdi-light mdi-19px btnWarning mdi-account-plus");
            a.setAttribute('onclick',"UserOverview.removeUser(" + stock[i].id + ")")
            a.innerHTML = "Remove";

            td.appendChild(a);
            tr.appendChild(td);
            tableBody.appendChild(tr);
        }

        $("#userList").html(table);
        
    }
}

class User {
    
    constructor(id, name, surName, birth, gender){
        this.id = id;
        this.name = name;
        this.surName = surName;
        this.birth = birth;
        this.gender = gender;
    }
}