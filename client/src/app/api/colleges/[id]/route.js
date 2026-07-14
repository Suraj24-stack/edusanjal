import { NextResponse } from 'next/server';
import { CollegeController } from '../../../../../../server/controllers/collegeController';

export async function GET(request, { params }) {
  const id = parseInt(params.id, 10);
  const result = await CollegeController.getCollegeById(id);
  return NextResponse.json(result, { status: result.status });
}

export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id, 10);
    const body = await request.json();
    const result = await CollegeController.updateCollege(id, body);
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
  const result = await CollegeController.deleteCollege(id);
  return NextResponse.json(result, { status: result.status });
}
