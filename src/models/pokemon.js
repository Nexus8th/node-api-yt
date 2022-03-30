const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']

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
        unique: {
            msg: `Le nom est déjà pris.`
        },
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
                args: [999],
                msg: `La valeur doit être inférieure à 999.`
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
                args: [99],
                msg: `Les dégàts ne peuvent pas dépasser 99.`
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
        },
        validate: {
            isTypeValid(value) {
                if(!value) {
                    throw new Error(`Un pokémon doit au moins avoir un type.`)
                }
                if(value.split(',').length > 3) {
                    throw new Error(`Un pokémon ne peut pas avoir plus de trois types.`)
                }
                value.split(',').forEach(type => {
                    if(!validTypes.includes(type)) {
                        throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante: ${validTypes}`)
                    }
                })
            }
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
