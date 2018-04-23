const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
const Schema = mongoose.Schema;

let RoomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    isOpen: {
        type: Boolean,
        default: true
    }
});

let FloorSchema = new Schema({
    floorNumber: {
        type: Number,
        unique: true,
        required: true
    },
    rooms: [RoomSchema]
});

// FacilitySchema defines how the Facility is stored in the database
let FacilitySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    isOpen: {
        type: Boolean,
        default: true
    },
    floors: [FloorSchema],
    
    // issues:[{type: Schema.Types.ObjectId, ref: 'Issue'}]
});

// Get the Facility by the id
module.exports.getFacilityByID = function(id, callback){
    Facility.findbyId(id, callback);
}

// Export the models
const Facility = mongoose.model("Facility", FacilitySchema);
const Floor = mongoose.model("Floor", FloorSchema);
const Room = mongoose.model("Room", RoomSchema);

module.exports = 
{
    Facility: Facility,
    Floor: Floor,
    Room: Room
};