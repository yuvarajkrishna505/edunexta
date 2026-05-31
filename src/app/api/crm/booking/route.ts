import { NextResponse } from 'next/server';

let bookedAppointments: any[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, date, timeSlot, advisorType } = body;

    if (!name || !email || !phone || !date || !timeSlot) {
      return NextResponse.json(
        { success: false, message: 'All scheduling parameters (name, email, phone, date, timeSlot) are required.' },
        { status: 400 }
      );
    }

    const bookingPayload = {
      bookingId: `book_${Date.now()}`,
      name,
      email,
      phone,
      date,
      timeSlot,
      advisorType: advisorType || 'Senior Industry Mentor',
      scheduledAt: new Date().toISOString(),
      meetingUrl: `https://meet.google.com/edunexta-demo-${Math.random().toString(36).substring(2, 7)}`,
      syncStatus: {
        calendarEventCreated: true,
        whatsappNotificationSent: true
      }
    };

    console.log('=============== MOCK SCHEDULER SYNC TRIGGERED ===============');
    console.log(`Google Calendar meeting created: ${bookingPayload.meetingUrl}`);
    console.log(`WhatsApp trigger sent to +91 ${phone} with meeting credentials.`);
    console.log('==============================================================');

    bookedAppointments.push(bookingPayload);

    return NextResponse.json({
      success: true,
      message: 'Demo slot successfully booked! A Google Meet link has been dispatched to your email and WhatsApp.',
      booking: bookingPayload
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    totalBookings: bookedAppointments.length,
    bookings: bookedAppointments
  });
}
