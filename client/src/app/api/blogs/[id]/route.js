import { NextResponse } from 'next/server';
import { BlogController } from '../../../../../../server/controllers/blogController';

export async function GET(request, { params }) {
  const id = parseInt(params.id, 10);
  const result = await BlogController.getBlogById(id);
  return NextResponse.json(result, { status: result.status });
}

export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id, 10);
    const body = await request.json();
    const result = await BlogController.updateBlog(id, body);
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
  const result = await BlogController.deleteBlog(id);
  return NextResponse.json(result, { status: result.status });
}
