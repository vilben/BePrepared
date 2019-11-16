class UserOverview {

    constructor(){
        this.users = []

        this.loadDemoData()
        this.showData()
        this.saveData()
    }

    saveData(){
        localStorage.setItem("userData", JSON.stringify(this.users));
    }

    loadDemoData(){

        if (localStorage.getItem("userData") === null) {
            var demoUser1 = new User("Simon", "Noser", "23.01.1998", "m");
            var demoUser2 = new User("Moritz", "Schiesser", "23.01.1998", "m");
            var demoUser3 = new User("Benny Joe", "Villiger", "23.01.1998", "m");
            var demoUser4 = new User("Zuzanna ", "Lottenbach", "23.01.1998", "w");
            var demoUser5 = new User("Aldin", "Delic", "23.01.1998", "m");

            this.users.push(demoUser1);
            this.users.push(demoUser2);
            this.users.push(demoUser3);
            this.users.push(demoUser4);
            this.users.push(demoUser5);
        } else {
            this.users = JSON.parse(localStorage.getItem("userData"))
        }
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