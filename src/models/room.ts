import mongoose, { Schema, Document, Types } from "mongoose";

interface Location {
    latitude: number;
    longitude: number;
}

interface Food {
    name: string;
    price: number;
}

export interface IRoom extends Document {
    rating: number;
    roomOwner: string;
    nearByCentre: string;
    address: {
        street: string;
        city: string;
        state: string;
        pincode: number;
    };
    pricePerHour: number;
    currentlocation: Location;
    amenities: ('wifi' |'AC' | 'parking' | 'FAN')[];
    noOfPeople: number
    images: string[]
    userId: Types.ObjectId;
    description?: string;
    dist_btw_room_and_centre: number;
    isAvailable: boolean;
    reviews: Types.ObjectId[];
    foods?: Food[];
}

const foodSchema = new Schema<Food>({
    name: { type: String, required: true },
    price: { type: Number, required: true },
});

const roomSchema = new Schema<IRoom>({
    roomOwner: {
        type: String,
        required: true,
    },
    nearByCentre: {
        type: String,
        required: true,
    },
    address: {
        street: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        pincode: {
            type: Number,
            required: true,
        },
    },
    pricePerHour: {
        type: Number,
        required: true,
    },
    currentlocation: {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
    },
    amenities: {
        type: [String],
        required: true,
    },
    noOfPeople: {
        type: Number,
        required: true,
    },
    images: {
        type: [String],
        required: false,
        default: [],
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    description: {
        type: String,
        required: false,
    },
    dist_btw_room_and_centre: {
        type: Number,
        required: true,
    },
    foods: {
        type: [foodSchema],
        default: [],
    },
}, { timestamps: true });

export default mongoose.models.Room || mongoose.model<IRoom>('Room', roomSchema);