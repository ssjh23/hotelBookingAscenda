const splitFirst50 = (dataArray, page, setData) =>{

    var n = dataArray.length
    var numOfBlocks = Math.floor(n/50)
    console.log(numOfBlocks)

    var remaindingEntries = n%50
    console.log(remaindingEntries)

    console.log("This is splitFirst50")
    console.log("This is the current page number" + page)
    

    var firstBlock = dataArray.slice(0,50)

    //** Calls setData(array of data) to show in the list page **/
    setData(firstBlock)


}

const split50 = (dataArray, page, setData, startIndex, endIndex) =>{
    console.log('Hey this is split50');
    console.log("This is page number: " + page);
    const slicedArray = dataArray.slice(startIndex, endIndex);
    setData(slicedArray);
    if(slicedArray.length === dataArray.length){
        return false;
    }
    return true;
}



const blockMap = (dataArrayLength)=>{

    var map = new Map();

    var n = dataArrayLength

    let initialBlock = 1

    for (let i =0; i<n; i=i+50){
        map.set(initialBlock, i+50)    //When i = 0, map[1] = 0+50 (0-49)
        initialBlock += 1             //When i = 50, map[2] = 50 + 50 = 100  (50-99)
    }                               //When i = 100, map[3] = 100+50 = 150 (100-149)

    return map
}

module.exports = {splitFirst50, split50, blockMap};