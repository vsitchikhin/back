const Staff = {
    id: 0,
    name: '',
    surname: '',
    price: '',
    jobTitle: '',
    imageId: '',
    imageURL: '',

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.surname = data.surname;
        this.price = data.price;
        this.jobTitle = data.job_title;
        this.imageId = data.image_id;
        this.imageURL = data.image_url
    },

    async getStaff(connection) {
        let errorMessage = 'OK';
        const queryGetStaff = 'SELECT * FROM staff JOIN images ON staff.image_id=images.id';

        const [staffRows, staffFields] = await connection.execute(queryGetStaff);

        return {
            error: false,
            errorMessage: errorMessage,
            payload: staffRows,
        }
    }
}

module.exports = Staff;
