const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({
    inventoryType:{
        type:String,
        required:[true, 'Inventory type require'],
        enum:['in','out']
    },
    bloodGroup:{
        type:String,
        required: [true, 'blood group is required'],
        enum:['O+','O-','AB+','AB-','A+','A-','B+','B-']
    },
    quantity:{
        type:Number,
        required: [true, 'blood quantity is require']
    },
    donerEmail:{
        type: String,
        required: [true, 'Doner email is required']
    },
    organisations:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required:[true, 'organisation is require']
    },
    hospital:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: function(){
            return this.inventoryType === "out"
        }
    },
    doner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        // required: function(){
        //     return this.inventoryType === 'in';
        // },
    },
},
{timestamps: true}
);

module.exports = mongoose.model('Inventory', inventorySchema)