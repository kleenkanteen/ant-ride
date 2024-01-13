import { NextResponse } from 'next/server';
import validateEventController from '../../../controllers/validateEventController';

export async function POST(request: Request) {
    try {
        const { eventCode } = await request.json();
        const isValid = await validateEventController.validateEventCode(eventCode);
        return NextResponse.json({ isValid }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
    }
}