import { NextResponse } from 'next/server';
import CarpoolController from '../../../controllers/createController';
import { z } from 'zod';
import { CarpoolDataSchema, CarpoolData } from '../../../types/types';

export async function POST(request: Request) {
    try {
        // Assert the type of the JSON data
        const carpoolData = (await request.json()) as CarpoolData;
        const newCarpool = await CarpoolController.createCarpool(carpoolData);
        return NextResponse.json(newCarpool, { status: 201 });
    } catch (error) {
        // Handle different types of errors appropriately
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        } else {
            return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        }
    }
}
