let temp:any = {};

export const removeNullValues = ( obj : any ) => {

    temp = {};
    
    const keyValues = Object.entries(obj);

    if(keyValues.length == 0) return {};

    keyValues.forEach( pair => {
        if( pair[1] != null && typeof pair[1] != "object"){
            temp[pair[0]] = pair[1];
        }  
    })

    return temp;
}