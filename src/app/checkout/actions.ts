'use server';

import prisma from '@/lib/prisma';

export async function checkOrderStatus(orderId: string) {
  const order = await prisma.order.findUnique({ 
    where: { id: orderId } 
  });
  
  if (order?.status === 'PAID') {
    return { success: true, courseId: order.courseId };
  }
  
  return { success: false };
}
