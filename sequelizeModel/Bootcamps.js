module.exports = (sequelize, DataTypes) => {
    const Bootcamp = sequelize.define('bootcamp', {
        name: {
            type: DataTypes.STRING,
            required: true,
            len: [2, 50],
            unique: true,
            trim: true,
        },
        slug: {
            type: DataTypes.STRING,
            defaultValue: "slug"

        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [2, 50],
            unique: true,
        },
        website: {
            type: DataTypes.STRING,
            // match: [
            //     /https ?: \/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            //     'Please use a valid URL with HTTP or HTTPS'
            // ]
        },
        phone: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Please enter a valid email address.',
                },
            },
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.GEOMETRY('POINT'),
            allowNull: false,
        },
        formattedAddress: {
            type: DataTypes.STRING
        },
        street: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        },
        zipcode: {
            type: DataTypes.STRING
        },
        country: {
            type: DataTypes.STRING
        },
        careers: {
            type: DataTypes.ENUM,
            values: ['Web Development',
                'Mobile Development',
                'UI/UX',
                'Data Science',
                'Business',
                'Other'],
            defaultValue: 'Other', // Optional: Set a default value
        },
        averageRating: {
            type: DataTypes.INTEGER,
            len: [1, 10],
        },
        averageCost: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        housing: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        jobAssistance: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        jobGuarantee: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        acceptGi: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: 'bootcamps',
    })
    return Bootcamp
}