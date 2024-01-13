import { NextResponse } from 'next/server';
import validateEventController from '../../../controllers/validateEventController';
import { ValidateCarpoolRequest } from '../../../types/types';

export async function POST(request: Request) {
    try {
        const { carpool_event_code } = await request.json() as ValidateCarpoolRequest;
        const isValid = await validateEventController.validateEventCode(carpool_event_code);
        return NextResponse.json({ isValid }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
    }
}