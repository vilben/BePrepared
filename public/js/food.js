class food{
    minCarbs = 400;
    minProteine = 75;
    minFat = 20;
    
    /*
     * carbohydrates, proteins and fat per 100 gramms and weight
     */
    constructor(name, carbohydrates, proteins, fat, weight, category){
        this.name = name;
        this.carbohydrates = carbohydrates;
        this.proteins = proteins;
        this.fat = fat;
        this.weight= weight;
        this.daysLeft = this.getDaysLeft(category);
    }

    getDaysLeft(category) {
        if (category.includes("Alcohol")) {
            return 1000;
        } else if (category.includes("Cereal")) {
            return 30;
        } else if (category.includes("Eggs")) {
            return 7;
        } else if (category.includes("Fat")) {
            return 50;
        } else if (category.includes("Fish")) {
            return 10;
        } else if (category.includes("Dried fruit")) {
            return 100;
        } else if (category.includes("Fresh fruit")) {
            return 14;
        } else if (category.includes("Meat")) {
            return 14;
        } else if (category.includes("dairy")) {
            return 7;
        } else if (category.includes("beverages")) {
            return 30;
        } else if (category.includes("Nuts")) {
            return 100;
        } else if (category.includes("Sweets")) {
            return 90;
        } else if (category.includes("snacks")) {
            return 90;
        } else if (category.includes("Fresh vegetable")) {
            return 20;
        } else if (category.includes("Dry vegetable")) {
            return 60;
        } else {
            return 60;
        }
    }



    getNutritionValue(){
        return -1;
    }

    calcRatioPerDay(days, amountInGramms){
        // todo: wtf even is this
        var grammsPerDay = amountInGramms / days;
        let carbohydratesPerDay = (this.carbohydrates / 100) * gramsPerDay;
        let proteinePerDay = (this.proteins / 100) * gramsPerDay;
        let minFatPerDay = (this.fat / 100) * gramsPerDay;

        return grammsPerDay;
    }

    calcMaxDays(amountInGramms, personAmount){
        // todo: wtf even is this
        // todo: something with personAmount
        let minGrammsPerDay = -1;

        return amountInGramms / minGrammsPerDay;
    }
}