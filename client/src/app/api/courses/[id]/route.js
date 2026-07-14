import { NextResponse } from 'next/server';
import { CourseController } from '../../../../../../server/controllers/courseController';

export async function GET(request, { params }) {
  const id = parseInt(params.id, 10);
  const result = await CourseController.getCourseById(id);
  return NextResponse.json(result, { status: result.status });
}

export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id, 10);
    const body = await request.json();
    const result = await CourseController.updateCourse(id, body);
    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid request payload' },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  const id = parseInt(params.id, 10);
  const result = await CourseController.deleteCourse(id);
  return NextResponse.json(result, { status: result.status });
}
