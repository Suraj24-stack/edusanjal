import { NextResponse } from 'next/server';
import { BlogController } from '../../../../../server/controllers/blogController';

export async function GET() {
  const result = await BlogController.getAllBlogs();
  return NextResponse.json(result, { status: result.status });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await BlogController.createBlog(body);
    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid request payload' },
      { status: 400 }
    );
  }
}
