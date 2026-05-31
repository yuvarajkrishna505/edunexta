import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    // Advanced backend validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, message: 'All mandatory fields (name, email, phone) must be provided.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address format.' },
        { status: 400 }
      );
    }
    
    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { success: false, message: 'Invalid WhatsApp number format. Must be exactly 10 digits.' },
        { status: 400 }
      );
    }

    // Google Sheets Integration
    const webhookUrl = process.env.GOOGLE_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.warn('GOOGLE_WEBHOOK_URL is not set. Simulating success for local testing.');
      return NextResponse.json({
        success: true,
        message: 'Your enquiry was processed successfully.',
      });
    }

    // Sanitize inputs slightly
    const sanitizedData = {
      name: name.trim().replace(/[<>]/g, ''),
      email: email.trim().toLowerCase(),
      phone: phone.trim()
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sanitizedData),
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script responded with status: ${response.status}`);
    }

    const resData = await response.json();

    if (resData.status === 'success') {
      return NextResponse.json({
        success: true,
        message: 'Your enquiry was processed successfully. Our education advisor will connect with you on WhatsApp within 15 minutes!',
      });
    } else {
      throw new Error(resData.message || 'Unknown error from Google Apps Script');
    }
  } catch (error: any) {
    console.error('Lead Submission Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to process submission. Please try again later.' }, { status: 500 });
  }
}
