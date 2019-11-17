class DisasterSituation {

    constructor(userOverview, foodOverView){
        this.userOverview = userOverview;
        this.foodOverView = foodOverView;

        this.carbohydrates = 0;
        this.fat = 0;
        this.proteins = 0;
        this.users = 0;

        this.getFoods();
        this.getUsers();

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
        });
    }

    calcTotalValues(){

        this.foodList.forEach(food => {
           this.carbohydrates += food.stock * food.carbohydrates;
           this.fat += food.stock * food.fat;
           this.proteins += food.stock * food.proteins;
        });
        
    }

    calcTotalUsers(){

        this.userList.forEach(user => {
            this.users++;
         });

    }

}