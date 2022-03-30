module.exports = (sequelize, DataTypes) => {
return sequelize.define(
    "Pokemon",
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: `Veuillez ajouter un nom à votre pokémon.`}, 
            notNull: { msg: `Le nom est une proprité requise.`}
        }
    },
    hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: [0], 
                msg: `Veuillez ajouter une valeur supérieure à 0.`
            },
            max: {
                args: [1000],
                msg: `La valeur doit être inférieure à 1000.`
            },
            isInt: { msg: `Utilisez uniquement des nombres entiers pour les points de vie.`},
            notNull: { msg: `Les points de vie sont une proprité requise.`}
        }
    },
    cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: [0],
                msg: `Veuillez ajouter une valeur supérieure à 0.`
            },
            max: {
                args: [100],
                msg: `Les dégàts ne peuvent pas dépasser 100.`
            },
            isInt: { msg: `Utilisez uniquement des nombres entiers pour les dégàts.`},
            notNull: { msg: `Les dégàts sont une proprité requise.`}
        }
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: { msg: `Veuillez indiquer une URL valide pour l'image.`},
            notNull: { msg: `L'image est une propriété requise.`}
        }
    },
    types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('types').split(',')
        },
        set(types) {
            this.setDataValue('types', types.join())
        }
    }
    },
    {
    timestamps: true,
    createdAt: "created",
    updatedAt: false,
    }
);
};
