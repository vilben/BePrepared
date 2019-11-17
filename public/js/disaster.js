class DisasterSituation {

    constructor(userOverview, foodOverView){
        this.userOverview = userOverview;
        this.foodOverView = foodOverView;

        this.carbohydrates = 0;
        this.fat = 0;
        this.proteins = 0;
        this.calories = 0;

        this.users = 0;

        this.minCal = 1000;

        this.getFoods();
        
    }

    calculateValues(){
        this.calcCalories();
        this.calcDaysAvailable();
        this.calcAvailablePerDay();
        this.calcDiet();
    }

    getFoods(){

        $.get("getFood").done((response) => {
            this.foodList = response.foodList;

            if (!this.foodList) {
                alert("No foods found!");
                return;
            } else {
                this.calcTotalValues();
            }
            this.getUsers();         
        });
    }

    getUsers(){

        $.get("getUsers").done((response) => {
            this.userList = response.userList;

            if (!this.userList) {
                alert("No users found!");
                return;
            } else {
                this.calcTotalUsers();
            }
            this.calculateValues();       
        });
    }

    calcTotalValues(){

        this.foodList.forEach(food => {
           this.carbohydrates += food.weight / 100 * food.carbohydrates;
           this.fat += food.weight / 100 * food.fat;
           this.proteins += food.weight / 100 * food.proteins;
        });
        
    }

    calcTotalUsers(){

        this.userList.forEach(user => {
            this.users++;
         });

    }

    calcCalories(){
        this.calories += this.carbohydrates * 4;
        this.calories += this.fat * 9;
        this.calories += this.proteins * 4;
    }

    calcDaysAvailable(){
        this.daysAvailableCalories = Math.round((this.calories / (this.users * this.minCal)));
        $("#daysAvailable").html("Foods for days..: " + this.daysAvailableCalories);
    }

    calcAvailablePerDay(){
        var availableCarbsPerDay = Math.round(this.carbohydrates / this.daysAvailableCalories / this.users);
        var availableFatPerDay = Math.round(this.fat / this.daysAvailableCalories / this.users);
        var availableProteinPerDay = Math.round(this.proteins / this.daysAvailableCalories / this.users);

        $("#CarbsPerDay").html("Carbohydrates available per day: " + availableCarbsPerDay);
        $("#ProteinsPerDay").html("Protein available per day: " + availableProteinPerDay);
        $("#FatPerDay").html("Fat available per day: " + availableFatPerDay);
    }


    calcDiet(){
        var outerSpan = $("<span>");
        var html = ""
        var foodSortedByDaysLeft = this.foodList.sort((a,b) => (parseInt(a.daysLeft) > parseInt(b.daysLeft)) ? 1 : ((parseInt(b.daysLeft) > parseInt(a.daysLeft)) ? -1 : 0)); 
        var maxDays = Math.round(this.daysAvailableCalories);
        var caloriesPerDay = this.minCal * this.users;
        var currentCalories = 0
        for(var i = 1; i <= maxDays; i++){
            var middleSpan = $("<span>");
            middleSpan.append("<br />");
            middleSpan.append($("<span class='label'>" + "Day: " + i + "<br>" + "</span>"));
            //html = html + "Day: " + i + "<br>";
            var foodNoLongerStorable = foodSortedByDaysLeft.filter(function( obj ) {
                return obj.daysLeft <= i;
            })

            currentCalories = 0;
            while (currentCalories < (caloriesPerDay - 5) && foodSortedByDaysLeft.length > 0){

                if(foodNoLongerStorable.length != 0){
                    var currentFood = foodNoLongerStorable[0];
                    var caloriesPer100G = currentFood.carbohydrates * 4;
                    caloriesPer100G += currentFood.fat * 9;
                    caloriesPer100G += currentFood.proteins * 4;
    
                    
                    var caloriesAvailable = caloriesPer100G * currentFood.weight / 100
                    currentCalories += caloriesAvailable;
                    foodNoLongerStorable.shift();
                    foodSortedByDaysLeft.shift();
                    middleSpan.append($("<span class='entry'>" + "Eat " + Math.round(currentFood.weight) + " gramms of " + currentFood.name + " resulting in " + Math.round(caloriesAvailable) + " kcal</span>"))
                } else {
                    var currentFood = foodSortedByDaysLeft[0];

                    var caloriesPer100G = currentFood.carbohydrates * 4;
                    caloriesPer100G += currentFood.fat * 9;
                    caloriesPer100G += currentFood.proteins * 4;

                    caloriesPer100G = Math.round(caloriesPer100G);

                    var caloriesAvailable = Math.round(caloriesPer100G * currentFood.weight / 100);
                    var caloriesMissing = Math.round(caloriesPerDay - currentCalories);

                    var foodAmount = Math.round(caloriesMissing / caloriesPer100G * 100);

                    if (foodAmount < currentFood.weight){
                        middleSpan.append($("<span class='entry'>" + "Eat " + Math.round(foodAmount) + " gramms of " + currentFood.name + " resulting in " + Math.round(foodAmount / 100 * caloriesPer100G) + " kcal</span>"))
                        foodSortedByDaysLeft[0].weight = Math.round(foodSortedByDaysLeft[0].weight - foodAmount);
                        currentCalories += Math.round(foodAmount / 100 * caloriesPer100G);
                    } else {
                        middleSpan.append($("<span class='entry'>" + "Eat " +  Math.round(currentFood.weight) + " gramms of " + currentFood.name + " resulting in " + Math.round(currentFood.weight / 100 * caloriesPer100G) + " kcal</span>"))
                        currentCalories += Math.round(currentFood.weight / 100 * caloriesPer100G);
                        foodSortedByDaysLeft.shift();
                    }
                }
            }

            outerSpan.append(middleSpan);
        }

        //$("#DietPlan").html(html);
        $("#DietPlan").html(outerSpan);
    }
}