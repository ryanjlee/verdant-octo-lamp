function find_deviation(v, d) {
    
    var maxDev = 0;
    var max = Number.NEGATIVE_INFINITY;
    var min = Number.POSITIVE_INFINITY;
    for (var i = 0; i < v.length; i++) {
        var sequence = v.slice(i, d + i);
        if (sequence[d - 1] > max || sequence[d - 1] < min) {
            max = Math.max.apply(null, sequence);
            min = Math.min.apply(null, sequence);
            var currDev = max - min;
            maxDev = currDev > maxDev ? currDev : maxDev;
        }
    }
    console.log(maxDev);

    
    // var maxDev = 0;
    // for (var i = 0; i < v.length; i++) {
    //     var sequence = v.slice(i, d + i);
    //     var max = Math.max.apply(null, sequence);
    //     var min = Math.min.apply(null, sequence);
    //     var currDev = max - min;
    //     maxDev = currDev > maxDev ? currDev : maxDev;
    // }
    // console.log(maxDev);
}
