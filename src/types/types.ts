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
    id: number; // or string
    name: string;
    email: string;
    phone_number: string;
}

// Interface for Participants
export interface Participant {
    id: number; // or string
    user_id: number; // or string
    event_id: number; // or string
    role: 'driver' | 'rider';
    address: string;
    pickup_capacity?: number; // Optional, only for drivers
    edit_code: string;
}

// Interface for Rides
export interface Ride {
    id: number; // or string
    carpool_event_id: number; // or string
    driver_id: number; // or string
    rider_ids: number[]; // or string[] if using UUIDs
}