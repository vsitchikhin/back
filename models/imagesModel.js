const MainImages = {
    url: '',

    constructor(data) {
        this.url = data.url;
    },

    async getImages(connection) {
        let errorMessage = 'OK';
        const queryGetImages = 'SELECT * FROM main_images';

        const [imagesRows, imagesFields] = await connection.execute(queryGetImages);

        return {
            error: false,
            errorMessage: errorMessage,
            payload: imagesRows,
        }
    },
}

module.exports = MainImages;
