import { NextResponse } from 'next/server';
import { AuthController } from '../../../../../../server/controllers/authController';

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await AuthController.loginUser(body);

    if (result.success) {
      const response = NextResponse.json(
        { message: result.message, success: true, user: result.user },
        { status: result.status }
      );

      // Set JWT in HTTP-only cookie for session management
      response.cookies.set({
        name: 'session_token',
        value: result.token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { message: result.message, success: false },
      { status: result.status }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Invalid request payload', success: false },
      { status: 400 }
    );
  }
}
