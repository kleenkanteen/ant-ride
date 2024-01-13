import { NextResponse } from 'next/server';
import joinController from '../../../controllers/joinController';

export async function POST(request: Request) {
    try {
        const joinCarpoolData = await request.json();
        const result = await joinController.joinCarpool(joinCarpoolData);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        // Handle errors
        return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
    }
}
