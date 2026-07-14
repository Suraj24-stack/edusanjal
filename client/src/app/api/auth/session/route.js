import { NextResponse } from 'next/server';
import { AuthController } from '../../../../../../server/controllers/authController';

export async function GET(request) {
  const token = request.cookies.get('session_token')?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, user: null, message: 'No active session' },
      { status: 200 }
    );
  }

  const result = await AuthController.getUserSession(token);

  if (result.success) {
    return NextResponse.json(
      { success: true, user: result.user },
      { status: 200 }
    );
  }

  // If session is invalid/expired, remove the invalid cookie
  const response = NextResponse.json(
    { success: false, user: null, message: result.message },
    { status: 200 }
  );
  response.cookies.delete('session_token');
  return response;
}
