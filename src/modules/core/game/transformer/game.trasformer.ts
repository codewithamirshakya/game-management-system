
export const transformData = (items) => {
    return transform(items);
};

const transform = (items) => {
    if (items) {
        const value = items ? items.map((item) => {
            return transformItem(item)
        }) : []
        return value ? value : [];
    }
};

const transformItem = (data) => {
    if (data) {
        let returnData = {
            game_name: data.game_name,
            game_type: data.game_type,
            game_desc: data ? data.game_desc : null,
            game_id: data.game_id,
            settings: data.settings,
        };
        return returnData;
    }
};

