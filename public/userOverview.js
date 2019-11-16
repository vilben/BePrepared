class UserOverview {

    constructor(){
        this.users = [];
        this.loadData();
        
    }

    addUser(user){
        this.users.push(user);
    }

    loadData() {
        $.get("getUsers").done((response) => {
            this.users = response.userList;
            this.showData();
        });   
        
    }

    saveData(){

        var jsonData = {
            userList: this.users
        };

        
        $.post("getUsers", jsonData).done((response) => {
            console.log("Wrote to file... maaaybe");
        });  

    }


    showData(){

        var myTableDiv = $("#userList");
        var table = document.createElement('TABLE');
        var tableBody = document.createElement('TBODY');
            
        table.border = '1'
        table.appendChild(tableBody);
            
        var heading = new Array();
        heading[0] = "Name"
        heading[1] = "Surname"
        heading[2] = "Age"
        heading[3] = "Gender"
            
        var stock = this.users
           
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);

        for (var i = 0; i < heading.length; i++) {
            var th = document.createElement('TH')
            th.width = '75';
            th.appendChild(document.createTextNode(heading[i]));
            tr.appendChild(th);
           
        }
            
        for (var i = 0; i < stock.length; i++) {

            var tr = document.createElement('TR');
            
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

            tableBody.appendChild(tr);
        }

        $("#userList").append(table)
        
    }
}

class User {
    
    constructor(name, surName, birth, gender){
        this.name = name;
        this.surName = surName;
        this.birth = birth;
        this.gender = gender;
    }
}