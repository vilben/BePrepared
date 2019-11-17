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
        this.calcTotalUsers();
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

        var foodNextDay =  foodSortedByDaysLeft.filter(function( obj ) {
            return obj.daysLeft <= 1;
        });
        var foodNext3Days =  foodSortedByDaysLeft.filter(function( obj ) {
            return obj.daysLeft > 1 && obj.daysLeft <= 3;
        });
        var foodNext7Days =  foodSortedByDaysLeft.filter(function( obj ) {
            return obj.daysLeft > 3 && obj.daysLeft <= 7;
        });
        var foodNext14Days =  foodSortedByDaysLeft.filter(function( obj ) {
            return obj.daysLeft > 7 && obj.daysLeft <= 14;
        });

    }
}