function eightBit(spacer , number){
    let top = [
        0.0 + spacer, 0.25, 
        0.2 + spacer, 0.25, 
    ];
    let l1 = [
        top[0] ,top[1],
        top[0] , top[3] - 0.2 ,
    ]
    let l2 = [
        top[0] , l1[3],
        top[0] , l1[3] - 0.2 ,
    ]
    let r1 = [
        top[2],top[3],
        top[2], l1[3]
    ]
    let r2 = [
        top[2], r1[3],
        top[2], l2[3] 
    ]
    let mid = [
        l1[2],l1[3],
        r1[2], r1[3]
    ]
    let bottom = [
        top[0], l2[3],
        top[2] , l2[3]
    ]
    let result
    if (number == 0){
        result = top.concat(l1,l2 ,r2 ,r1 ,bottom)
    }else if (number == 2 ){
        result = top.concat(r1,mid,l2,bottom)
    }

    return result
}