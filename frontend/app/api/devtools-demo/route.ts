import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    method: 'GET',
    message: 'Demo GET response',
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  return NextResponse.json({
    method: 'POST',
    message: 'Demo POST received',
    body,
    timestamp: new Date().toISOString(),
  })
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => ({}))
  return NextResponse.json({
    method: 'PUT',
    message: 'Demo PUT received',
    body,
    timestamp: new Date().toISOString(),
  })
}

export async function DELETE() {
  return NextResponse.json({
    method: 'DELETE',
    message: 'Demo DELETE handled',
    timestamp: new Date().toISOString(),
  })
}
