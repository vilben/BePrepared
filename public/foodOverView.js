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

        foodList.forEach(food => {
                let listElement = document.createElement("li");
                listElement.innerText = food.name+": "+food.stock;
                $foodList.append(listElement);
                console.log(listElement);
            }
        );

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


