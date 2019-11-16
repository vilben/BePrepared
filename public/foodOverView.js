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
        let file;

        $.get("getFood").done((response) => {
            console.log(response);
            file = response;
        });

        var $foodList = $("#foodList");
        var listElement = document.createElement("li");

        listElement.value = "hello";

        $foodList.append('<li><p>New List Item</p></li>');
        console.log(listElement);
    }
}

$("document").ready(function () {
    let food = new foodOverView();

    food.showList();
});


