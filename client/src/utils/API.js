import axios from 'axios';

const apiKey = 'acc_610f9d50ba64eb6';
const apiSecret = '51a8b3d1a96476853ef200a27d9dd894';

export const tagSearch = async function(image) {
    const url = 'https://api.imagga.com/v2/tags?image_url=' + encodeURIComponent(image);

    try {
        const response = await axios.get(url, {
            auth: {
                username: apiKey,
                password: apiSecret
            }
        });
        const body = response.data;
        return body.result.tags[0].tag.en;
    } catch (error) {
        console.log(error.response);
    }
};

export const colorSearch = async function(image) {
    const url = 'https://api.imagga.com/v2/colors?image_url=' + encodeURIComponent(image);

    try {
        const response = await axios.get(url, {
            auth: {
                username: apiKey,
                password: apiSecret
            }
        });
        const body = response.data;
        return body.result.colors.foreground_colors[0].closest_palette_color_parent;
    } catch (error) {
        console.log(error.response);
    }
};


