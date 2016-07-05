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
    let Customers = mongoose.Schema({
        name : {
            type : String,
            required : true,
            lowercase : true
        },
        isCompany : {
            type : Boolean
        },
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
        bills : [{
            link : {
                type : String,
                required : true
            },
            state : {
                type : Boolean,
                required : true
            },
            quotation_id : {
                type : Number
            },
            createdAt : {
                type : Date,
                required : true
            },
            deadLine : {
                type : Date
            },
            payedAt : {
                type : Date
            }
        }],
        quotations : [{
            link : {
                type : String,
                required : true
            },
            state : {
                type : Boolean,
                required : true
            },
            createdAt : {
                type : Date, 
                required : true
            }
        }],
        memo : {
            type : String
        },
        createdAt : {
            type : Date,
            required : true
        },
        updatedAt : {
            type : Date,
            default : Date.now
        }
    });

    let Company = mongoose.Schema({
        name : {
            type : String,
            required : true,
            lowercase : true
        },
        logo : {
            type : String
        },
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
            },
            pwd : {
                type : String,
                required : true
            }
        }, 
        customers : [Customers],
        paymentInfo : {
            bank : [{
                name : {
                    type : String,
                    required : true
                },
                iban : {
                    type : String,
                    required : true
                },
                bic : {
                    type : String,
                    required : true
                }
            }],
            paypal : [{
                name : {
                    type : String,
                    required : true
                },
                mail : {
                    type : String, 
                    required : true
                }
            }]
        },
        templates : {
            bill : {
                type : Number
            },
            quotation : {
                type : Number
            }
        },
        createdAt : {
            type : Date
        },
        updatedAt : {
            type : Date
        }
    });

    // we use a hook to say "when you want to save data using the model do this before"
    Customers.pre('save', function(next) {
        // to avoid a scoop problem => this self contain now the data
        var self = this;
        // use the find function of the constructor from the model
        this.constructor.find({
            'billingInfo.street': self.billingInfo.street,
            'billingInfo.number': self.billingInfo.number,
            'billingInfo.zip': self.billingInfo.zip,
            'billingInfo.town': self.billingInfo.town,
            'billingInfo.country': self.billingInfo.country
        }, function(err, docs) {
            // if the address is different
            if (!docs.length) {
                next();
            // if the address is the same
            } else {
                next(new Error("customer exists!"));
            }
        });
    });

    // we return the schema type "Company" called "company" for the collection "companies" 
    return mongoose.model('company', Company,'companies');
};

// export of the model like a singleton [export an instance of the model] so be carefull of the ()
module.exports = new companyModel();




// let Customers = new Schema({
    //     title     : String
    //     , body      : String
    //     , date      : Date
    // });

    // let Company = new Schema({
    //     author    : ObjectId
    //     , title     : String
    //     , body      : String
    //     , date      : Date
    //     , comments  : [Comments]
    //     , meta      : {
    //             votes : Number
    //         , favs  : Number
    //         }
    // });

    // mongoose.model('BlogPost', BlogPost);