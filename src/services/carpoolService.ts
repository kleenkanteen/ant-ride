import { supabase } from '../utils/supabaseClient';
import type { CarpoolData } from '../types/types';

const carpoolService = {
    async createCarpool(carpoolData: CarpoolData){
        const response = await supabase
            .from('carpool_events')
            .insert([carpoolData]);
        if (response.error) throw response.error;
        return response.data;
    },

    async getCarpoolEvents(): Promise<CarpoolData[]>  {
        const response = await supabase
            .from('carpool_events')
            .select('*');
        if (response.error) throw response.error;
        return response.data as CarpoolData[];
    },

    async getCarpoolEventByEventCode(eventCode: string): Promise<CarpoolData> {
        const response = await supabase
            .from('carpool_events') 
            .select('*')
            .eq('event_code', eventCode)
            .single();
        if (response.error) throw response.error;
        return response.data as CarpoolData; 
    },

    async getCarpoolEventByEventEditCode(eventEditCode: string): Promise<CarpoolData> {
        const response = await supabase
            .from('carpool_events')
            .select('*')
            .eq('event_edit_code', eventEditCode)
            .single();
        if (response.error) throw response.error;
        return response.data as CarpoolData;
    },

    async updateCarpoolEvent(eventId: number, updateData: Partial<CarpoolData>) {
        const response = await supabase
            .from('carpool_events')
            .update(updateData)
            .eq('id', eventId);
        if (response.error) throw response.error;
        return response.data;
    },

    async deleteCarpoolEvent(eventId: number){
        const response = await supabase
            .from('carpool_events')
            .delete()
            .eq('id', eventId);
        if (response.error) throw response.error;
        return response.data;
    },
};

export default carpoolService;


