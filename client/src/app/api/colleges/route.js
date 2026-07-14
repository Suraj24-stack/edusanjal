import { NextResponse } from 'next/server';
import { CollegeController } from '../../../../../server/controllers/collegeController';

export async function GET() {
  const result = await CollegeController.getAllColleges();
  return NextResponse.json(result, { status: result.status });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await CollegeController.createCollege(body);
    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid request payload' },
      { status: 400 }
    );
  }
}
