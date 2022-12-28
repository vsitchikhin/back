const Services = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    date: '',
    imageId: '',
    staffId: '',
    staffName: '',
    staffSurname: '',
    staffPrice: '',
    staffJobTitle: '',
    staffImageId: '',

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.price = data.price;
        this.date = data.date;
        this.imageId = data.imageId;
        this.staffId = data.staffId;
        this.staffName = data.staffName;
        this.staffSurname = data.staffSurname;
        this.staffPrice = data.staffPrice;
        this.staffJobTitle = data.staffJobTitle;
        this.staffImageId = data.staffImageId;
    },

    async getShortService(service, connection) {
        let errorMessage = 'OK';

        const queryGetShortService = `SELECT * FROM services
                                      JOIN images ON services.image_id=images.id
                                      WHERE services.id = "${service.id}"`;

        const [shortServiceRows, shortServiceFields] = connection.execute(queryGetShortService);

        return {
            error: false,
            errorMessage: errorMessage,
            payload: shortServiceRows,
        }
    },

    async getFullService(id, connection) {
        let errorMessage = 'OK';

        const queryGetFullService = `SELECT * FROM services
                                    JOIN staff ON services.staff_id=staff.id
                                    JOIN images ON services.image_id=images.id
                                    JOIN free_dates ON staff.id=free_dates.staff_id
                                    WHERE services.id = "${id}"`;

        const [fullServiceRows, fullServiceFields] = connection.execute(queryGetFullService);

        return {
            error: false,
            errorMessage: errorMessage,
            payload: fullServiceRows,
        }
    },
}

module.exports = Services;
