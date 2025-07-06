import { NextResponse } from 'next/server';
import { fetchPoolsFromContract } from '@/lib/soroban';

export async function GET() {
  try {
    const templates = await fetchPoolsFromContract();
    return NextResponse.json(templates);
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to fetch templates' }, { status: 500 });
  }
}
