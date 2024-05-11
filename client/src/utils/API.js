import got from 'got';

const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;


export const tags = (imageUrl) => {

const url1 = 'https://api.imagga.com/v2/tags?image_url=' + encodeURIComponent(imageUrl);

(async () => {
    try {
        const response = await got(url1, {username: apiKey, password: apiSecret});
        const body = JSON.parse(response.body);
        return body.result.tags[0].tag.en;
    } catch (error) {
        console.log(error.response);
    }
})();
};

export const colors = (imageUrl) => {
const url2 = 'https://api.imagga.com/v2/colors?image_url=' + encodeURIComponent(imageUrl);

(async () => {
    try {
        const response = await got(url2, {username: apiKey, password: apiSecret});
        const body = JSON.parse(response.body);
        return body.result.colors.foreground_colors[0].closest_palette_color_parent;
    } catch (error) {
        console.log(error.response);
    }
})();

};

