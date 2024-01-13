import { supabase } from '../utils/supabaseClient';
import type { Ride } from '../types/types';

const RideService = {
    async createRide(rideData: Ride){
        const response = await supabase
            .from('rides')
            .insert([rideData]);
        if (response.error) throw response.error;
        return response.data;
    },

    async getRides(): Promise<Ride[]> {
        const response = await supabase
            .from('rides')
            .select('*');
        if (response.error) throw response.error;
        return response.data as Ride[];
    },

    async getRideById(rideId: number): Promise<Ride> {
        const response = await supabase
            .from('rides')
            .select('*')
            .eq('id', rideId)
            .single();
        if (response.error) throw response.error;
        return response.data as Ride;
    },

    async updateRide(rideId: number, updateData: Partial<Ride>){
        const response = await supabase
            .from('rides')
            .update(updateData)
            .eq('id', rideId);
        if (response.error) throw response.error;
        return response.data;
    },

    async deleteRide(rideId: number){
        const response = await supabase
            .from('rides')
            .delete()
            .eq('id', rideId);
        if (response.error) throw response.error;
        return response.data;
    },
};

export default RideService;



