import dotenv from 'dotenv';

export const imageData = async (imageUrl) => {
    
    const PAT = import.meta.env.VITE_API_KEY;
    const USER_ID = import.meta.env.VITE_USER_ID;       
    const APP_ID = import.meta.env.VITE_APP_ID;

    const MODEL_ID = 'apparel-classification-v2';
    const MODEL_VERSION_ID = '651c5412d53c408fa3b4fe3dcc060be7';    
    const IMAGE_URL = imageUrl;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
    
    try {
        const response = await fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions);
        const rawData = await response.text();
        const data = JSON.parse(rawData);
        console.log(data.outputs[0]);
        if (data.outputs[0]){
            console.log(data.outputs[0].data.concepts[0].name + ' ' + data.outputs[0].data.concepts[1].name );
            return (data.outputs[0].data.concepts[0].name + ' ' + data.outputs[0].data.concepts[1].name );
        }
        return '';
    } catch (error) {
        console.log('error',error);
        return ('');
    }
};

