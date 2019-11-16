class food{
    minCarbs = 400;
    minProteine = 75;
    minFat = 20;
    
    /*
     * carbohydrates, proteins and fat per 100 gramms and stock
     */
    constructor(name, carbohydrates, proteins, fat, stock){
        this.name = name;
        this.carbohydrates = carbohydrates;
        this.proteins = proteins;
        this.fat = fat;
        this.stock= stock;
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