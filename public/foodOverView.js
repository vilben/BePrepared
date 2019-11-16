class foodOverView {
    constructor() {
        this.showList();
    }

    showList() {
        let file;
        $.get("getFood").done((response) => {
            console.log(response);
            this.readJsonFile(response);
        });

    }

    readJsonFile(json) {
        let $foodList = $("#foodList");

        var foodList = json.foodList;
        console.log(foodList);

        var table = document.createElement("table");
        table.setAttribute("class", "grid");
        var tbody = document.createElement("tbody");
        tbody.setAttribute("class", "gridBody");
        table.append(tbody);

        var th = document.createElement("tr");
        th.setAttribute("class", "gridHeader");
        var thd = document.createElement("th");
        thd.innerText = "Foods";
        th.append(thd);
        tbody.append(th);

        let alternate = false;
        foodList.forEach(food => {
            alternate = !alternate;
            let tr = document.createElement("tr");
            if (alternate) {
                tr.setAttribute("class", "gridAlterRow");
            }
            else {
                tr.setAttribute("class", "gridRow");
            }
            let td = document.createElement("td");
            td.innerText = food.name + ": " + food.stock;
            tr.append(td);
            tbody.append(tr);
        });
        $("#tablePlaceholder").append(table);

    }

    addFood(foodItem, quantity) {
        // foodList.put(quantity, foodItem);
        alert("Heya");
    }

    removeFood() {
        // foodList.remove()
    }

}

$("document").ready(function () {
    let food = new foodOverView();
});


