class food{
    minCalories = 400;
    minProteine = 75;
    minFat = 20;
    
    /*
     * kcal, proteins and fat per 100 gramms
     */
    constructor(name, kcal, proteins, fat){
        this.name = name;
        this.kcal = kcal;
        this.proteins = proteins;
        this.fat = fat;
    }

    getNutritionValue(){
        return -1;
    }

    calcRatioPerDay(days, amountInGramms){
        // todo: wtf even is this
        var grammsPerDay = amountInGramms / days;
        let kcalPerDay = (this.kcal / 100) * gramsPerDay;
        let proteinePerDay = (this.proteins / 100) * gramsPerDay;
        let minFatPerDay = (this.fat / 100) * gramsPerDay;

        return grammsPerDay;
    }

    calcMaxDays(amountInGramms){
        // todo: wtf even is this
        let minGrammsPerDay = -1;

        return amountInGramms / minGrammsPerDay;
    }
}