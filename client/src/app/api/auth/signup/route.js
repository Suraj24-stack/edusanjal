import { NextResponse } from 'next/server';
import { AuthController } from '../../../../../../server/controllers/authController';

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await AuthController.registerUser(body);
    return NextResponse.json(
      { message: result.message, success: result.success },
      { status: result.status }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Invalid request payload', success: false },
      { status: 400 }
    );
  }
}
