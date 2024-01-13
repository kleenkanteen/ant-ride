import { supabase } from '../utils/supabaseClient';
import type { Participant } from '../types/types';

const ParticipantService = {
    async createParticipant(participantData: Participant){
        const response = await supabase
            .from('participants')
            .insert([participantData]);
        if (response.error) throw response.error;
        return response.data;
    },

    async getParticipants(): Promise<Participant[]> {
        const response = await supabase
            .from('participants')
            .select('*');
        if (response.error) throw response.error;
        return response.data as Participant[];
    },

    async getParticipantById(participantId: number): Promise<Participant> {
        const response = await supabase
            .from('participants')
            .select('*')
            .eq('id', participantId)
            .single();
        if (response.error) throw response.error;
        return response.data as Participant;
    },

    async updateParticipant(participantId: number, updateData: Partial<Participant>){
        const response = await supabase
            .from('participants')
            .update(updateData)
            .eq('id', participantId);
        if (response.error) throw response.error;
        return response.data;
    },

    async deleteParticipant(participantId: number){
        const response = await supabase
            .from('participants')
            .delete()
            .eq('id', participantId);
        if (response.error) throw response.error;
        return response.data;
    },
};

export default ParticipantService;


