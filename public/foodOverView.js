class foodOverView {
    constructor() {
        this.showList();
        this.setListeners(this);
        this.candidates = [];
        this.quantity = 0;
    }

    setListeners(obj) {

        //  $("#addFoodButton").setAttribute('onclick',"console.log('hello')");
    }

    showList() {
        $("#tablePlaceholder").html();
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
            } else {
                tr.setAttribute("class", "gridRow");
            }
            let td = document.createElement("td");
            td.innerText = food.name + ": " + food.weight;
            tr.append(td);
            tbody.append(tr);
        });
        $("#tablePlaceholder").append(table);

    }

    addFoodClick() {
        this.showAddFoodPanel();
        initFloats();
    }

    saveFoodClick() {
        let foodItem = $("#userInputFoodName").val();
        let quantity = $("#userInputFoodAmount").val();
        this.hideAddFoodPanel();

        this.addFood(foodItem, quantity);
        showFoodList();
    }

    removeFoodClick() {
        this.showRemoveFoodPanel();
        initFloats();
    }

    removeSaveFoodClick() {
        this.hideRemoveFoodPanel();

        let foodItem = $("#userInputRemoveFoodName").val();
        let quantity = $("#userInputRemoveFoodAmount").val();

        this.removeFood(foodItem, quantity);
    }

    hideAddFoodPanel() {
        $("#addFoodPanel").css("display", "none");
    }

    showAddFoodPanel() {
        $("#addFoodPanel").css("display", "block");
    }

    hideRemoveFoodPanel() {
        $("#removeFoodPanel").css("display", "none");
    }

    showRemoveFoodPanel() {
        $("#removeFoodPanel").css("display", "block");
    }

    addFood(foodItem, quantity) {

        $.get("getFoodComposition").done((response) => {
            console.log(response);
            this.UpdateFoodStock(response, foodItem, quantity);
        });

    }

    UpdateFoodStock(foodCompositionList, foodItem, quantity) {

        this.quantity = quantity;

        foodCompositionList.forEach(foodComposition => {
            if (foodComposition.Name.toUpperCase().includes(foodItem.toUpperCase())) {
                this.candidates.push(foodComposition);
            }
        });

        function openSelectionDialog(candidates) {
            for (let i = 0; i < candidates.length; i++) {
                $('#selection').append($('<option>', {
                    value: i,
                    text: candidates[i].Name
                }));
            }

            $("#addSelection").css("display", "block");
            initFloats();

        }

        openSelectionDialog(this.candidates)

    }

    manageAfterChoiceSelect() {
        $("#selection").css("display", "none");

        let value = $("#selection").val();
        var userChoice = this.candidates[value];

        var foodEntry = new food(userChoice.Name, userChoice["Carbohydrates, available (g)"], userChoice["Fat, total (g)"], userChoice["Protein (g)"], this.quantity, userChoice["Category"]);

        $.get("getFood").done((foodStock) => {

            let foodList = foodStock.foodList;

            let filter = foodList.filter(food => food.name === foodEntry.name);
            if (filter.length < 1) {
                foodList.push(foodEntry);
            } else {
                filter[0].weight = parseInt(filter[0].weight) + parseInt(foodEntry.weight);
            }

            $.post("postFood", { "foodList": foodList });

        });

        showFoodList();
    }

    removeFood(foodItem, quantity) {
        $.get("getFood").done((foodStock) => {

            let foodList = foodStock.foodList;

            foodList.forEach(food => {
                if (food.name === foodItem) {
                    if (parseInt(food.weight) < parseInt(quantity)) {
                        foodList = foodList.filter(food => food.name !== foodItem);
                    } else {
                        food.weight = parseInt(food.weight) - parseInt(quantity);
                    }
                }
            });

            $.post("postFood", { "foodList": foodList }).done(response => {

            });
        });

        showFoodList();
    }

    readNutritionalValue() {
        //TODO
    }
}

$("document").ready(function () {
    let food = new foodOverView();
});




