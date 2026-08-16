'use server';

export async function submitInquiryAction(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const details = formData.get('details');

  if (!email) {
    return { success: false, error: 'Email is required.' };
  }

  // Simulate server side operation
  await new Promise((resolve) => setTimeout(resolve, 400));

  return {
    success: true,
    server: 'Next.js Server Action',
    actionId: `sa_${Date.now()}`,
    name,
    email,
    processedAt: new Date().toISOString()
  };
}
