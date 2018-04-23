const User = require('../models/User');
const Issue = require('../models/Issue');
const Models = require('../models/Facility');



module.exports = {
    // get all issues
    index: async (req, res, next) => {
        const facilities = await Models.Facility.find({}).sort({"name": 1});
        res.status(200).json(facilities);
    },

    // create a new facility
    create: async (req, res, next) => {
        const newFacility = new Models.Facility({
            "name": req.body.name,
            "isOpen": req.body.isOpen,
            "floors":[],
        });
        await newFacility.save();
        res.status(201).json(newFacility);
    },

    // retrieves a facility using the id from the url params
    read: async (req, res, next) => {
        const {id} = req.params;
        const facility = await Models.Facility.findById(id);
        res.status(200).json(facility);
    },

    // adds a floor to the facility with the id from the url params
    addFloor: async (req, res, next) => {
        let STATUS = 200;
        let SUCCEEDED = true;
        // get the facility from the url
        const { id } = req.params;

        let newFacility = await Models.Facility.findById(id, function(err, facility){
            if (err) {
                console.log(err);
                STATUS = 400;
                SUCCEEDED = false;
            }
        });

        // get the floornumber and rooms in the request body
        const floorNumber = req.body.floorNumber;
        const roomsStr = req.body.rooms;

        await Models.Facility.findOne({"floorNumber":floorNumber}, function(err, facility){
            if (err) {
                console.log(err);
                STATUS = 400;
                SUCCEEDED = false;
            }  
        });

        if (SUCCEEDED){
            // add the rooms to the list of rooms for the floor
            let roomlist = roomsStr.split(', ');
            let roomSchemas = [];   
            roomlist.forEach(function(room){
                const newRoom = new Models.Room({
                    "name":room.trim(),
                });
                roomSchemas.push(newRoom);
            });

            // creates the new floor document and stores it in the db
            const newFloor = new Models.Floor({
                "floorNumber": floorNumber,
                "rooms": roomSchemas
            });

            // add the floor to facility
            newFacility["floors"].push(newFloor);

            await newFacility.save();
        }
        
        // // update the facility object
        await Models.Facility.findByIdAndUpdate(id, newFacility, function(err, facility){
            if (err) {
                console.log(err);
                STATUS = 400;
                SUCCEEDED = false;
            }
        });

        res.status(STATUS).json({success: SUCCEEDED});        
    },
    updateFloor: async (req, res, next) => {
        let floorNumber = req.body.floorNumber;

        let newFacility = await Models.Facility.findOneAndUpdate(
            {"_id":id, "floors":{ $elemMatch: {"floorNumber": floorNumber}}}, 
            {upsert:true}, 
            {"floors":{ $elemMatch: {"floorNumber": floorNumber, "floorNumber.rooms":{$push : {roomSchemas}}}}}
        );
        console.log(newFacility);
    }
}