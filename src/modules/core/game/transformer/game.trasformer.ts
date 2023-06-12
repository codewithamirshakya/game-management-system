
export const transformData = (items) => {
    return transform(items);
};

const transform = (items)=> {
   if(items){
    const value =items?items.map((item)=>{
        return transformItem(item)
    }):[]
    return value ? value : [];
   }
};

const transformItem = (item)=> {
    if (item) {
        let returnData = {
            game_name: item.gametitle,
            game_type: item.gametype,
            // settings: item,
        };
        return returnData;
    }
};

