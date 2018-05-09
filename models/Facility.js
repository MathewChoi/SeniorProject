const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// RoomSchema defines how the rooms are stored in the FloorSchema
let RoomSchema = new Schema({
    name: {
        type: String,
        required: true,
        sparse: true        
    },
    isOpen: {
        type: Boolean,
        default: true
    }
});

// FloorSchema defines how the floor is stored in the FacilitySchema
// TODO find out why floors with identical floor numbers can be added to the floor lists
let FloorSchema = new Schema({
    floorNumber: {
        type: String,
        required: true,
        sparse: true
    },
    rooms: []
});

// FacilitySchema defines how the Facility is stored in the database
let FacilitySchema = new Schema({
    name: {
        type: String,
        unique: true,
        sparse: true,
        required: true
    },
    isOpen: {
        type: Boolean,
        default: true
    },
    floors: []
    // issues : [{type: Schema.Types.ObjectId, ref: 'Issue'}]
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