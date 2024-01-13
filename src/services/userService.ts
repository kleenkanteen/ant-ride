import { supabase } from '../utils/supabaseClient';
import type { User } from '../types/types';

const UserService = {
    async createUser(userData: User){
        const response = await supabase
            .from('users')
            .insert([userData]);
        if (response.error) throw response.error;
        return response.data;
    },

    async getUsers(): Promise<User[]> {
        const response = await supabase
            .from('users')
            .select('*');
        if (response.error) throw response.error;
        return response.data as User[];
    },

    async getUserById(userId: number): Promise<User> {
        const response = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();
        if (response.error) throw response.error;
        return response.data as User;
    },

    async updateUser(userId: number, updateData: Partial<User>){
        const response = await supabase
            .from('users')
            .update(updateData)
            .eq('id', userId);
        if (response.error) throw response.error;
        return response.data;
    },

    async deleteUser(userId: number){
        const response = await supabase
            .from('users')
            .delete()
            .eq('id', userId);
        if (response.error) throw response.error;
        return response.data;
    },
};

export default UserService;

