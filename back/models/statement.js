const mongoose = require("mongoose");
const moment = require("moment");

const statementSchema = new mongoose.Schema({
  //Partie 1 :
  date: {
    type: Date,
    required: true,
  },
  //Partie 2 :
  location: {
    type: String,

    match: [
      /^[a-zA-Z0-9\s,'-]*$/,
      "Location should only contain letters, numbers, spaces, commas, apostrophes and hyphens",
    ],
    required: true,
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
  witness_a: [
    {
    firstName_w: {
      type: String,
      maxlength: [50, "First name should not exceed 50 characters"],
      required: false,
    },
    lastName_w: {
      type: String,
      maxlength: [50, "Last name should not exceed 50 characters"],
      required: false,
    },
    addressWitness: {
      type: String,
      required: false,
    },
    phoneWitness: {
      type: String,
      required: false,
    },
  }
  ],
witness_b: [
  {
  firstName_w: {
    type: String,
    maxlength: [50, "First name should not exceed 50 characters"],
    required: false,
  },
  lastName_w: {
    type: String,
    maxlength: [50, "Last name should not exceed 50 characters"],
    required: false,
  },
  addressWitness: {
    type: String,
    required: false,
  },
  phoneWitness: {
    type: String,
    required: false,
  },
},],

  //Partie 6
  //Vehicule A
  vehicule_a: {
    assureBy: {
      type: String, // Vehicule assure par (in english)
      required: true,
    },
    contractNumber: {
      type: String, // Police D'assurance Number
      required: true,
    },
    agency: {
      type: String, // Agence (id_agence foreign key)
      required: true,
    },
    contractValidity: {
      start_date: {
        type: Date,
        default: Date.now,
        required: true,
      },
      end_date: {
        type: Date,
        required: true,
      },

    },

  },
  //vehicule B

  vehicule_b: {
    assureBy: {
      type: String, // Vehicule assure par (in english)
      required: true,
    },
    contractNumber: {
      type: String, // Police D'assurance Number
      required: true,
    },
    agency: {
      type: String, // Agence (id_agence foreign key)
    },
    contractValidity: {
      start_date: {
        type: Date,
        default: Date.now,
        required: true,
      },
      end_date: {
        type: Date,
        required: true,
      },
    },
  },

  //Partie7
  drivers_identity_a: {
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
      match: [
        /^[a-zA-Z0-9]+$/,
        "driver_license should only contain letters and numbers",
      ],

    },
  },

  drivers_identity_b: {
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
      match: [
        /^[a-zA-Z0-9]+$/,
        "driver_license should only contain letters and numbers",
      ],

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
    addr: {
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
    addr: {
      type: String,
      required: true,
    },
  },
  //Partie 9
  vehicule_identity_a: {
    brand: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Car", "Truck", "MotoCycle"],
      required: true,
    },
    matriculation: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      enum: [
        "Tunisia",
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivia",
        "Bosnia and Herzegovina",
        "Botswana",
        "Brazil",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Côte d'Ivoire",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Democratic Republic of the Congo",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "North Korea",
        "North Macedonia",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
      ],
      required: true,
    },
  },
  vehicule_identity_b: {
    brand: {
      type: String,
      coming_from: {
        type: String,
        required: true,
      },
      going_to: {
        type: String,
        required: true,
      },
    },
    type: {
      type: String,
      enum: ["Car", "Truck", "MotoCycle"],
      required: true,
    },
    matriculation: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      enum: [
        "Tunisia",
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivia",
        "Bosnia and Herzegovina",
        "Botswana",
        "Brazil",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Côte d'Ivoire",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Democratic Republic of the Congo",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "North Korea",
        "North Macedonia",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
      ],
      required: true,
    },
    coming_from_b: {
      type: String,
    },
    going_to_b: {
      type: String,
    },
  },

  //Partie 10
  hits_a: [{
    type: String,
    required: true,
  }

  ],

  hits_b: [{
    type: String,
    required: true,
  }
  ],
  //Partie 11
  apparent_damages_a: [{
    type: String,
    required: true,
  }
  ],
  damage_direction_a: {
    type: String,
    enum: ["Front", "Back", "Left", "Right"],
  },

  apparent_damages_b: [{
    type: String,
    required: true,
  }
  ],

  damage_direction_b: {
    type: String,
    enum: ["Front", "Back", "Left", "Right"],

  },

  //Partie 12
  circumstances_a: [{
    type: String,
    required: true,
  }
  ],


  circumstances_b: [{
    type: String,
    required: true,
  }
  ],

  //Partie 13
  accident_croquis: {
    type: String,
    required: true,
  },
  // Partie 14
  notes_a: {
    type: String,
    required: true,
  },
  notes_b: {
    type: String,
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

  // Partie 16     const [case_state, setCase_state] = useState(true); // waiting / treated /closed ma3adech boolean

  case_state: {
    type: String,

    enum: ["waiting", "treated", "inProgress", "closed"],
  },

  assign_to_expert: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Expert",
  },
  decision: {
    type: String,
    required: false,
    enum: ["a", "b"],
  },
});

const Statement = mongoose.model("Statement", statementSchema);
module.exports = Statement;
