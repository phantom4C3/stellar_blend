import { NextResponse } from 'next/server';
import { fetchPoolsFromContract } from '@/lib/soroban.js';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const pools = await fetchPoolsFromContract();
    const template = pools.find((t) => t.template_id === params.id);
    if (!template) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }
    return NextResponse.json(template);
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to fetch template' }, { status: 500 });
  }
}
