
export function DataRemoveTime(date) {
    if(null !== date){
        var noTime = date.split('T')[0];;

        return noTime;
    }
    return 0;
}

export function Logging(text, data, visible) {
    if(true === visible){
        console.log(text);
        console.log(data);
    }
}