import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, details, services } = body;

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email address is required' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      server: 'Next.js App Router Action',
      message: 'Inquiry received successfully',
      inquiryId: `inq_${Math.random().toString(36).substring(2, 9)}`,
      receivedAt: new Date().toISOString(),
      summary: { name, email, servicesCount: services?.length || 1 }
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server processing error' }, { status: 500 });
  }
}
