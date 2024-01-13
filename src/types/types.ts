import { z } from 'zod';
// Zod Schema Definition
export const CarpoolDataSchema = z.object({
    destination: z.string(),
    date_time: z.string(),
    event_code: z.string().optional(),
    organizer_id: z.number(),
    event_edit_code: z.string().optional(),
});

// TypeScript Type Inference from Zod Schema
export type CarpoolData = z.infer<typeof CarpoolDataSchema>;

// Interface for Users
export interface User {
    id: string; 
    name: string;
    email: string;
    phone_number: number;
}

// Interface for Participants
export interface Participant {
    id: string; 
    user_id: string; 
    event_id: string; 
    role: 'driver' | 'rider';
    address: string;
    pickup_capacity?: number; // Optional, only for drivers
    edit_code: string;
}

// Interface for Rides
export interface Ride {
    id: string;
    carpool_event_id: string; 
    driver_id: string; 
    rider_ids: string[]; 
}

// Interface for join car pool request
export interface JoinCarpoolRequest {
    id: string; 
    carpool_event_code: string; 
    name: string; 
    number: number; 
}

// Interface for validate car pool request
export interface ValidateCarpoolRequest {
    carpool_event_code: string; 
}