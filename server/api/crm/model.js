let mongoose = require('mongoose');
let validate = require('mongoose-validator');

// define some condition for one validator thx to mongoose-validator
let stringValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: '{VALUE} should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

let numberValidator = [
    validate({
        validator : "isNumeric",
        message : "{VALUE} should be a numeric value"
    })
];

let dateValidator = [
    validate({
        validator : "isDate",
        message : "Date should be in a Date format"
    })
];

let quoteValidator = [
    validate({
        validator : "isNumeric",
        message : "{VALUE} should be a numeric value"
    }),
    validate({
        validator: 'isLength',
        arguments: [0, 5],
        message: '{VALUE} should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

let urlValidator = [
    validate({
        validator : "isURL",
        message : "The url is not valid"
    })
];

// creation of the model of the db
let companyModel = function() {
    // new Schema with definition of the data
    let schema = mongoose.Schema({
        name : {
            type : String,
            required : true,
            lowercase : true,
            validate : stringValidator
        },
        pwd : {
            type : String,
            required : true
        },
        logo : String,
        tva : {
            num : {
                type : String,
                required : true
            },
            siren : {
                type : String
            },
            rcs : {
                type : String
            }
        },
        contact : {
            street : {
                type : String,
                required : true,
                lowercase: true
            },
            number : {
                type : Number,
                required : true
            },
            box : {
                type : String,
            },
            zip : {
                type : String,
                required : true
            },
            town : {
                type : String,
                required : true,
                lowercase: true
            },
            country : {
                type : String,
                required : true,
                lowercase: true
            },
            mail : {
                type : String,
                required : true
            },
            phoneMain : {
                type : String,
                required : true
            },
            phoneSec : {
                type : String
            },
            fax : {
                type : String
            },
            web : {
                type : String
            }
        },
        contactPerson : {
            civility : {
                type : String,
                required : true
            },
            firstname : {
                type : String,
                required : true,
                lowercase : true
            },
            lastname : {
                type : String,
                required : true,
                lowercase : true
            },
            post : {
                type : String,
                lowercase : true
            },
            mail : {
                type : String,
                required : true
            },
            phoneMain : {
                type : String,
                required : true
            },
            phoneSec : {
                type : String
            }
        },
        customers : [{
            name : {
                type : String,
                required : true,
                lowercase : true
            },
            isCompany : Boolean,
            tva : {
                num : {
                    type : String,
                    required : true
                },
                siren : {
                    type : String
                },
                rcs : {
                    type : String
                }
            },
            billingInfo : {
                civility : {
                    type : String,
                    required : true
                },
                firstname : {
                    type : String,
                    required : true,
                    lowercase : true
                },
                lastname : {
                    type : String,
                    required : true,
                    lowercase : true
                },
                street : {
                    type : String,
                    required : true,
                    lowercase: true
                },
                number : {
                    type : Number,
                    required : true
                },
                box : {
                    type : String
                },
                zip : {
                    type : String,
                    required : true
                },
                town : {
                    type : String,
                    required : true,
                    lowercase: true
                },
                country : {
                    type : String,
                    required : true,
                    lowercase: true
                },
                mail : {
                    type : String,
                    required : true
                },
                phoneMain : {
                    type : String,
                    required : true
                },
                phoneSec : {
                    type : String
                },
                fax : {
                    type : String
                }
            },
            deliveryInfo : {
                civility : {
                    type : String,
                    required : true
                },
                firstname : {
                    type : String,
                    required : true,
                    lowercase : true
                },
                lastname : {
                    type : String,
                    required : true,
                    lowercase : true
                },
                company : {
                    type : String,
                    required : true
                },
                street : {
                    type : String,
                    required : true,
                    lowercase: true
                },
                number : {
                    type : Number,
                    required : true
                },
                box : {
                    type : String
                },
                zip : {
                    type : String,
                    required : true
                },
                town : {
                    type : String,
                    required : true,
                    lowercase: true
                },
                country : {
                    type : String,
                    required : true,
                    lowercase: true
                }
            },
            contactPerson : {
                 civility : {
                    type : String,
                    required : true
                },
                firstname : {
                    type : String,
                    required : true,
                    lowercase : true
                },
                lastname : {
                    type : String,
                    required : true,
                    lowercase : true
                },
                post : {
                    type : String,
                    lowercase : true
                },
                mail : {
                    type : String,
                    required : true
                },
                phoneMain : {
                    type : String,
                    required : true
                },
                phoneSec : {
                    type : String
                },
                pwd : {
                    type : String,
                    required : true
                }
            },
            bills : {
                
            }
        }]

        
        
        createdAt : {
            type : Date,
            required : true,
            validate : dateValidator
        },
        // updateAt will be auto updated when we modify data with the current date
        updatedAt : { type : Date, default : Date.now}
    });

    // we use a hook to say "when you want to save data using the model do this before"
    schema.pre('save', function(next) {
        // to avoid a scoop problem => this self contain now the data
        var self = this;
        // use the find function of the constructor from the model
        this.constructor.find({
            'customers.billingInfo.street': self.address.street,
            'address.number': self.address.number,
            'address.zip': self.address.zip,
            'address.town': self.address.town,
            'address.country': self.address.country
        }, function(err, docs) {
            // if the address is different
            if (!docs.length) {
                next();
            // if the address is the same
            } else {
                next(new Error("Restaurants exists!"));
            }
        });
    });

    // we return the schema called "resto" with informations of the schema for the collection "restos" 
    return mongoose.model('resto', schema,'restos');
};

// export of the model like a singleton [export an instance of the model] so be carefull of the ()
module.exports = new restoModel();