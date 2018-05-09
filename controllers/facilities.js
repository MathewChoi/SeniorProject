// import { STATES } from 'mongoose';

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
            "isOpen": req.body.isOpen==='true',
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
        let STATUS = 400;
        let SUCCEEDED = false;

        // get the facility id from the url
        const { id } = req.params;

        let newFacility = await Models.Facility.findById(id, function(err, facility){
            if (err) {
                console.log(err);
            }
        });

        // get the floornumber and rooms in the request body
        const floorNumber = req.body.floorNumber;
        const roomsStr = req.body.rooms;

        //  check to see if the floor already exists
        const matchingFloor = await Models.Facility.findOne(
            {"_id":id, "floors":{ $elemMatch: {"floorNumber": floorNumber}}},
            function(err, facility){
                if (err) {
                    console.log(err);
                }  
        });
        
        console.log("The matching floor is ...");
        console.log(matchingFloor);

        if (matchingFloor === null) {
            STATUS = 201;
            SUCCEEDED = true;

            // add the rooms to the list of rooms for the floor
            let roomlist = roomsStr.split(',');
            let roomSchemas = [];
            let roomSet = new Set(); 
            roomlist.forEach(function(room){
                room = room.trim();
                if (!roomSet.has(room)) {
                    const newRoom = {
                        "name": room,
                        "isOpen": true,
                    };
                    roomSchemas.push(newRoom);
                    roomSet.add(room);
                }                                      
            });
            
            const newFloor = {
                "floorNumber": floorNumber,
                "rooms" : roomSchemas
            };

            // add the floor to facility
            newFacility["floors"].push(newFloor);

            await newFacility.save();
        }

        res.status(STATUS).json({success: SUCCEEDED});        
    },
    // TODO update such that no duplicate rows are added
    updateFloor: async (req, res, next) => {
        let STATUS = 404;
        let SUCCEEDED = false;

        const {id, floorNumber} = req.params;
        let roomsStr = req.body.rooms;

        // get the floor that we want to update
        Models.Facility.findOne({"_id": id}).then(function(facility, err){
            // get the updated floor from the client 
            const rooms = req.body.rooms;

            // parse the updated floor
            let roomsList = rooms.split(", ");
            let roomSet = new Set();
            roomsList.forEach(function(room){
                if (!roomSet.has(room)){
                    let newRoom = {
                        "name":room,
                        isOpen:true
                    }
                    roomsList.push(room);
                    roomSet.add(room);
                }
            });
            // TODO update the facility
            console.log(facility.floors);
        });
        
        res.status(STATUS).json({success: SUCCEEDED})
    },
    deleteFloor: async (req, res, next) => {
        // get the URL params
        const {id, floorNumber} = req.params;
        let STATUS = 404;
        let SUCCEEDED = false;
        
        // find the facility with the desired floor and remove the floor
        Models.Facility.findOne({"_id":id}).then(function(facility,err){
            if (err){
                console.log(err);
            }
            const numFloors = facility.floors.length;
            facility.floors.pop({"floorNumber":floorNumber});
            // save the updated floor and confirm the floor has been removed
            facility.save().then(function(){
                Models.Facility.findOne({"_id":id}).then(function(result, err){
                    if (result.floors.length < numFloors){
                        STATUS = 200;
                        SUCCEEDED = true;
                    }
                });
            });
        });
        res.status(STATUS).json({"success": SUCCEEDED});
    },
    deleteFacility: async(req, res, next) => {
        const {id} = req.params;
        let STATUS = 400;
        let SUCCEEDED = false;

        const response = await Models.Facility.deleteOne({"_id":id});
        if (response["n"] !== 0){
            STATUS = 200;
            SUCCEEDED = true;
        }

        res.status(STATUS).json({"success": SUCCEEDED});
    }
}