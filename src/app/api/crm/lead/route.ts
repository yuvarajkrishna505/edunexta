import { NextResponse } from 'next/server';

// Simulating database storage for leads
let leadSubmissions: any[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, course, workExperience, source } = body;

    // Advanced backend validation
    if (!name || !email || !phone || !course) {
      return NextResponse.json(
        { success: false, message: 'All mandatory fields (name, email, phone, course) must be provided.' },
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

    // Lead payload constructed for CRM synchronization
    const leadPayload = {
      leadId: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      name,
      email,
      phone,
      course,
      workExperience: workExperience || 'Not specified',
      submittedAt: new Date().toISOString(),
      source: source || 'Direct Web enquiry',
      status: 'NEW',
      syncStatus: {
        hubspot: 'SUCCESS_SYNC_201',
        salesforce: 'ENQUEUED_BATCH',
        webhookTriggered: true
      }
    };

    // Logging simulated CRM and Webhook Syncs
    console.log('=============== MOCK CRM WEBHOOK TRIGGERED ===============');
    console.log(`Payload routed successfully to HubSpot Marketing Hub:`, JSON.stringify(leadPayload, null, 2));
    console.log(`Triggering standard webhook endpoint: https://api.edunexta.com/webhooks/v1/leads`);
    console.log('==========================================================');

    leadSubmissions.push(leadPayload);

    return NextResponse.json({
      success: true,
      message: 'Your enquiry was processed successfully. Our education advisor will connect with you on WhatsApp within 15 minutes!',
      leadId: leadPayload.leadId,
      crmSync: leadPayload.syncStatus
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    totalLeads: leadSubmissions.length,
    leads: leadSubmissions
  });
}
