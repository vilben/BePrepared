class foodOverView {
    constructor() {
        this.foodList = [];
    }

    addFood(foodItem, quantity) {
        // foodList.put(quantity, foodItem);
        alert("Heya");
    }

    removeFood() {
        // foodList.remove()
    }


    showList() {
        var $foodList = $("#foodList");

        var listElement = document.createElement("li");
        listElement.value = "hello";

        $foodList.append(listElement);

        $.get("getFood").done((response) => {
            console.log(response);
        });

    }
}




let food = new foodOverView();

food.showList();
