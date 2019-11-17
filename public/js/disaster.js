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
        this.calcTotalValues();
        this.calcCalories();
        this.calcDaysAvailable();
        this.calcAvailablePerDay();
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
        this.daysAvailableCalories = (this.calories / (this.users * this.minCal)) + 3;
        $("#daysAvailable").html("Calories for days..: " + this.daysAvailableCalories);
    }

    calcAvailablePerDay(){
        var availableCarbsPerDay = this.carbohydrates / this.daysAvailableCalories / this.users;
        var availableFatPerDay = this.fat / this.daysAvailableCalories / this.users;
        var availableProteinPerDay = this.proteins / this.daysAvailableCalories / this.users;

        $("#CarbsPerDay").html("Carbohydrates available per day: " + availableCarbsPerDay);
        $("#ProteinsPerDay").html("Protein available per day: " + availableProteinPerDay);
        $("#FatPerDay").html("Fat available per day: " + availableFatPerDay);

    }


    calcDiet(){

        var foodSortedByDaysLeft = this.foodList.sort((a,b) => (parseInt(a.daysLeft) > parseInt(b.daysLeft)) ? 1 : ((parseInt(b.daysLeft) > parseInt(a.daysLeft)) ? -1 : 0)); 
        var maxDays = 3;
        var caloriesPerDay = this.minCal * this.users;

        for(var i = 0; i <= maxDays; i++){
            console.log("Day: " + i)
            var currentCalories = 0;
            var foodNoLongerStorable = foodSortedByDaysLeft.filter(function( obj ) {
                return obj.daysLeft <= i;
            })

            while (currentCalories < caloriesPerDay){
                if(foodNoLongerStorable.length != 0){
                    var currentFood = foodNoLongerStorable[0];
                    var caloriesPer100G = currentFood.carbohydrates * 4;
                    caloriesPer100G += currentFood.fat * 9;
                    caloriesPer100G += currentFood.proteins * 4;
    
                    
                    var caloriesAvailable = caloriesPer100G * currentFood.weight / 100
                    currentCalories += caloriesAvailable;
                    foodNoLongerStorable.shift();
                    console.log("Eat: " + currentFood.name + " how many: " + currentFood.weight + " resulting in " + caloriesAvailable)
                } else {
                    var currentFood = foodSortedByDaysLeft[0];

                    var caloriesPer100G = currentFood.carbohydrates * 4;
                    caloriesPer100G += currentFood.fat * 9;
                    caloriesPer100G += currentFood.proteins * 4;

                    caloriesPer100G = Math.round(caloriesPer100G);

                    var caloriesAvailable = Math.round(caloriesPer100G * currentFood.weight / 100);
                    var caloriesMissing = Math.round(caloriesPerDay - currentCalories);

                    var foodAmount = Math.round(caloriesMissing / caloriesPer100G);
                    console.log("In Else CalMissing:" + caloriesMissing);
                    console.log("In Else Cal100G:" + caloriesPer100G);
                    console.log("Food Amount:" + foodAmount);

                    if (foodAmount < currentFood.weight){

                        console.log("Eat: " + currentFood.name + " how many: " + foodAmount + " resulting in " + foodAmount / 100 * caloriesPer100G)
                        foodSortedByDaysLeft[0].weight = Math.round(foodSortedByDaysLeft[0].weight - foodAmount);

                        currentCalories += Math.round(foodAmount / 100 * caloriesPer100G);
                    } else {
                        console.log("Eat: " + currentFood.name + " how many: " + currentFood.weight + " resulting in " + currentFood.weight / 100 * caloriesPer100G)
                        currentCalories += Math.round(currentFood.weight / 100 * caloriesPer100G);

                        foodSortedByDaysLeft.shift();
                    }
                }

                console.log(currentCalories);
            }
        }

    }
    calcDiet2(){

        var foodSortedByDaysLeft = this.foodList.sort((a,b) => (parseInt(a.daysLeft) > parseInt(b.daysLeft)) ? 1 : ((parseInt(b.daysLeft) > parseInt(a.daysLeft)) ? -1 : 0)); 
        var maxDays = 3;
        var caloriesPerDay = this.minCal;

        for(var i = 0; i <= maxDays; i++){
            var toEat = []
            var foodNoLongerStorable = foodSortedByDaysLeft.filter(function( obj ) {
                return obj.daysLeft <= i;
            })

            var currentCalories = 0;

            while (currentCalories < caloriesPerDay){

                if (foodNoLongerStorable.length != 0){
                    currentCalories += foodNoLongerStorable[0].carbohydrates * foodNoLongerStorable[0].weight * 4;
                    currentCalories += foodNoLongerStorable[0].fat * foodNoLongerStorable[0].weight * 9;
                    currentCalories += foodNoLongerStorable[0].proteins * foodNoLongerStorable[0].weight * 4;

                    toEat.push(foodNoLongerStorable[0]);
                    foodNoLongerStorable.shift();

                } else {
                    var currentFood = foodSortedByDaysLeft[0];
                    var caloriesAvailable = currentFood.carbohydrates * currentFood.weight / 100 * 4;
                    caloriesAvailable += currentFood.fat * currentFood.weight / 100 * 9;
                    caloriesAvailable += currentFood.proteins * currentFood.weight / 100 * 4;

                    console.log("caloriesAvailable: " + caloriesAvailable);
                    var caloriesPer100G = currentFood.carbohydrates * 4;
                    caloriesPer100G += currentFood.fat * 9;
                    caloriesPer100G += currentFood.proteins * 4;
                    console.log("caloriesPer100G: " + caloriesPer100G);
                    var gramsNeeded = caloriesPerDay / caloriesPer100G * 100;
                    console.log("gramsNeeded: " + gramsNeeded);

                    if (gramsNeeded < currentFood.weight){
                        console.log("Eat: " + gramsNeeded + " " + currentFood.name)
                        foodSortedByDaysLeft[0].weight =  currentFood.weight - gramsNeeded * 3;
                    } else {
                        console.log("Eat: " + currentFood.name)
                        foodSortedByDaysLeft.shift();
                    }
                    
                    currentCalories += caloriesAvailable;
                }

                currentCalories++;

                
            }
            
            console.log(toEat);
        }

    }
}