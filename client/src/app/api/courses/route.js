import { NextResponse } from 'next/server';
import { CourseController } from '../../../../../server/controllers/courseController';

export async function GET() {
  const result = await CourseController.getAllCourses();
  return NextResponse.json(result, { status: result.status });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await CourseController.createCourse(body);
    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid request payload' },
      { status: 400 }
    );
  }
}
