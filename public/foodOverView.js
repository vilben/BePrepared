class foodOverView {
    constructor() {
        this.showList();
    }

    showList() {
        $.get("getFood").done((response) => {
            console.log(response);
            this.generateFoodStockTable(response);
        });

    }

    generateFoodStockTable(json) {

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

        $.get("getFoodComposition").done((response) => {
            console.log(response);
            this.UpdateFoodStock(response, foodItem, quantity);
        });

    }

    UpdateFoodStock(foodCompositionList, foodItem, quantity) {

        var candidates = [];

        foodCompositionList.forEach(foodComposition => {
            if (foodComposition.Name.includes(foodItem)) {
                candidates.push(foodComposition);
            }
        });

        function openSelectionDialog(candidates) {
            return undefined;
        }

        var userChoice = openSelectionDialog(candidates);


        var foodEntry = new food(userChoice.Name, userChoice["Carbohydrates, available (g)"], userChoice["Fat, total (g)"], userChoice["Protein (g)"], quantity)


    }


    removeFood() {
        // foodList.remove()
    }

    readNutritionalValue() {
        //TODO
    }
}

$("document").ready(function () {
    let food = new foodOverView();
});


