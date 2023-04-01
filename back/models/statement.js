const mongoose = require("mongoose");
const moment = require("moment");

const statementSchema = new mongoose.Schema({
//Partie 1 : 
date: {
  type: Date,
  required: true,
  validate: {
    validator: function (value) {
      return moment(value).isValid();
    },
    message: "Invalid date format",
  },
},
//Partie 2 : 
location: {
  type: String,
  required: true,
  match: [
    /^[a-zA-Z0-9\s,'-]*$/,
    "Location should only contain letters, numbers, spaces, commas, apostrophes and hyphens",
  ],
},
//Partie 3 : 
injured: {
  type: String,
  required: true,
},
//Partie 4 
material_damage: {
  type: String,
  required: true,
},
//Partie 5 
witness: {
  type: String,
  required: true,
  maxlength: [50, "Witness name should not exceed 50 characters"],
  match: [/^[A-Za-z\s'À-ÖØ-öø-ÿ]+$/, "Witness name should only contain letters, spaces, quotes, and French characters"],
  required: false,
},
//Partie 6 
//Vehicule A
vehicule_a: {
  assureBy: {
    type: String, // Vehicule assure par (in english)
  },
  contractNumber: {
    type: String, // Police D'assurance Number
  },
  agency: {
    type: String, // Agence (id_agence foreign key)
    ref: 'Agence', // replace 'Agency' with the actual name of the Agency model
  },
  contractValidity: {

    start_date: {
      type: Date,
      default: Date.now,
    },
    end_date: {
      type: Date,
    },
  },
},
//vehicule B

vehicule_b: {
  assureBy: {
    type: String, 
    required: true
  },
  contractNumber: {
    type: String, // Police D'assurance Number
    required: true

  },
  agency: {
    type: String, // Agence (id_agence foreign key)
    ref: 'Agence', // replace 'Agency' with the actual name of the Agency model
    required: true  
  },
  contractValidity: {

    start_date: {
      type: Date,
      default: Date.now,
      required : true 
    },
    end_date: {
      type: Date,
      required : true 
    },
  },
},

  //Partie7
  drivers_identity_a: {
    type: String,
    maxlength: [50, "drivers_identity_a"],
    match: [/^\d+$/, "drivers_identity_a should only contain numbers"],
    required: true,
    
    first_name: {
    type: String,
    maxlength: [50, "first_name"],
    required: true,
    },
    last_name: {
    type: String,
    maxlength: [50, "last_name"],
    required: true,
    },
    address: {
    type: String,
    maxlength: [100, "address"],
    required: true,
    },
    drivers_license_issue_date: {
      type: Date,
      required: true,
    }, 
    driver_license: {
    type: String,
    maxlength: [20, "driver_license"],
    match: [/^[a-zA-Z0-9]+$/, "driver_license should only contain letters and numbers"],
    required: true,
    },
  },

    drivers_identity_b: {
      type: String,
      maxlength: [50, "drivers_identity_b"],
      match: [/^\d+$/, "drivers_identity_b should only contain numbers"],
      required: true,
      
      first_name: {
      type: String,
      maxlength: [50, "first_name"],
      required: true,
      },
      last_name: {
      type: String,
      maxlength: [50, "last_name"],
      required: true,
      },
      address: {
      type: String,
      maxlength: [100, "address"],
      required: true,
      },
      drivers_license_issue_date: {
        type: Date,
        required: true,
      }, 
      driver_license: {
      type: String,
      maxlength: [20, "driver_license"],
      match: [/^[a-zA-Z0-9]+$/, "driver_license should only contain letters and numbers"],
      required: true,
      },
      drivers_license_issue_date: {
        type: Date,
        required: true,
      },
    },
  //Partie 8 
  insured_a: {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
  },
  insured_b: {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
  },
 //Partie 9 
vehicule_identity_a : {
  brand: {
    type: String,
    enum: ["Toyota", "Honda", "Ford", "Chevrolet", "Nissan","Audi","Isuzu" , "BMW" , "Golf"
     ,"Tesla","Chevrolet" , "Hyundai" , "Infiniti" , "Volkswagen" , "Volvo" , "Alfa Romeo" 
     , "Mitsubishi"],
    required: true,
  },
  type: {
    type: String,
    enum: ["Car" , "Truck" ,"MotoCycle" ],
    required: true,
  },
  matriculation: {
    type: String,
    required: true,
  },
    country: {
      type: String,
      enum: ["Tunisia", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
        "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh",
        "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina",
        "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Côte d'Ivoire", "Cabo Verde",
        "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia",
        "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Democratic Republic of the Congo",
        "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
        "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany",
        "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary",
        "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
        "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
        "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali",
        "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
        "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
        "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
        "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
        "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
        "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia"],
        required: true ,
  }
  
},
vehicule_identity_b : {
  brand: {
    type: String,
    enum: ["Toyota", "Honda", "Ford", "Chevrolet", "Nissan","Audi","Isuzu" , "BMW" , "Golf"
     ,"Tesla","Chevrolet" , "Hyundai" , "Infiniti" , "Volkswagen" , "Volvo" , "Alfa Romeo" 
     , "Mitsubishi"],
    required: true,
  },
  type: {
    type: String,
    enum: ["Car" , "Truck" ,"MotoCycle" ],
    required: true,
  },
  matriculation: {
    type: String,
    required: true,
  },
    country: {
      type: String,
      enum: ["Tunisia", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
        "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh",
        "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina",
        "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Côte d'Ivoire", "Cabo Verde",
        "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia",
        "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Democratic Republic of the Congo",
        "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
        "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany",
        "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary",
        "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
        "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
        "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali",
        "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
        "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
        "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
        "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
        "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
        "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia"],
        required: true ,
  },
  coming_from: {
    type: String,
    required: true,
  },
  going_to: {
    type: String,
    required: true,
  }
},

 //Partie 10 
 hits_a: {
  type: String,
  possible_place: [
    "Front Left Fender",
    "Front Right Fender",
    "Rear Left Fender",
    "Rear Right Fender",
    "Front Bumper",
    "Rear Bumper",
    "Hood",
    "Trunk",
    "Roof",
    "Front Windshield",
    "Rear Windshield",
    "Side Mirrors",
    "Doors",
    "Other"
  ],
  required: true
},
hit_direction: {
  type: String,
  enum: ["Front", "Back", "Left", "Right"],
  required: true
},

hits_b: {
  type: String,
  possible_place: [
    "Front Left Fender",
    "Front Right Fender",
    "Rear Left Fender",
    "Rear Right Fender",
    "Front Bumper",
    "Rear Bumper",
    "Hood",
    "Trunk",
    "Roof",
    "Front Windshield",
    "Rear Windshield",
    "Side Mirrors",
    "Doors",
    "Other"
  ],
  required: true
},
hit_direction: {
  type: String,
  enum: ["Front", "Back", "Left", "Right"],
  required: true
},
  //Partie 11 
  apparent_damages_a: {
    type: [String],
    damageplaces: [
    "Scratches",
    "Dents",
    "Cracks",
    "Paint Damage",
    "Broken Lights",
    "Broken Windows",
    "Missing Parts",
    "Other"
    ],
    required: true
    },
    damage_direction_a: {
    type: String,
    enum: ["Front", "Back", "Left", "Right"],
    required: true
    },

    apparent_damages_b: {
      type: [String],
      damageplaces: [
      "Scratches",
      "Dents",
      "Cracks",
      "Paint Damage",
      "Broken Lights",
      "Broken Windows",
      "Missing Parts",
      "Other"
      ],
      required: true
      },
      damage_direction_b: {
      type: String,
      enum: ["Front", "Back", "Left", "Right"],
      required: true
      },
  
//Partie 12 
circumstances_a: {
  type: String,
  enum: [
    "Driving in a normal and careful manner",
    "Driving under the influence of drugs or alcohol",
    "Speeding",
    "Ignoring traffic signals or signs",
    "Distracted driving",
    "Driving while fatigued",
    "Reckless driving",
    "Tailgating",
    "Changing lanes without signaling",
    "Making an illegal turn",
    "Backing up without looking",
    "Driving in the wrong lane",
    "Driving in a construction zone",
    "Driving during inclement weather",  
    "Other"
  ],
  required: true
},

circumstances_b: {
  type: String,
  enum: [
    "Driving in a normal and careful manner",
    "Driving under the influence of drugs or alcohol",
    "Speeding",
    "Ignoring traffic signals or signs",
    "Distracted driving",
    "Driving while fatigued",
    "Reckless driving",
    "Tailgating",
    "Changing lanes without signaling",
    "Making an illegal turn",
    "Backing up without looking",
    "Driving in the wrong lane",
    "Driving in a construction zone",
    "Driving during inclement weather",
    "Other"
  ],
  required: true
},
//Partie 13 
accident_croquis: {
  type: String,
  required: true
},
 // Partie 14 
 notes_a: {
  type: mongoose.Schema.Types.Mixed,
  required: true,
},
notes_b: {
  type: mongoose.Schema.Types.Mixed,
  required: true,
},
 //Partie 15 
  signature_a: {
    type: String,
    required: true,
  },
  signature_b: {
    type: String,
    required: true,
  },

// Partie 16     const [case_state, setCase_state] = useState(true); // waiting / treated /claused ma3adech boolean

  case_state:{
    type: Boolean,
    required :true,
  },
});

const Statement = mongoose.model("Statement", statementSchema);
module.exports = Statement;
