import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const scenario = url.searchParams.get('scenario')
  
  switch (scenario) {
    case 'error':
      return NextResponse.json(
        { error: 'Internal Server Error', message: 'Something went wrong!' },
        { status: 500 }
      )
    
    case 'not-found':
      return NextResponse.json(
        { error: 'Not Found', message: 'Resource not found' },
        { status: 404 }
      )
    
    case 'unauthorized':
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Access denied' },
        { status: 401 }
      )
    
    case 'slow':
      // Имитируем медленный запрос
      await new Promise(resolve => setTimeout(resolve, 3000))
      return NextResponse.json({
        method: 'GET',
        message: 'Slow response after 3 seconds',
        timestamp: new Date().toISOString(),
      })
    
    case 'large':
      // Возвращаем большой JSON объект
      const largeData = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        name: `Item ${i}`,
        description: `This is item number ${i} with some description`,
        data: `Some data for item ${i}`,
        timestamp: new Date().toISOString()
      }))
      return NextResponse.json({
        method: 'GET',
        message: 'Large response with 1000 items',
        data: largeData,
        count: largeData.length,
        timestamp: new Date().toISOString(),
      })
    
    default:
      return NextResponse.json({
        method: 'GET',
        message: 'Demo GET response',
        timestamp: new Date().toISOString(),
      })
  }
}

export async function POST(request: Request) {
  const url = new URL(request.url)
  const scenario = url.searchParams.get('scenario')
  const body = await request.json().catch(() => ({}))
  
  switch (scenario) {
    case 'validation-error':
      return NextResponse.json(
        { 
          error: 'Validation Error', 
          message: 'Invalid input data',
          details: ['Name is required', 'Email format is invalid']
        },
        { status: 400 }
      )
    
    case 'slow':
      await new Promise(resolve => setTimeout(resolve, 2000))
      return NextResponse.json({
        method: 'POST',
        message: 'Slow POST response after 2 seconds',
        body,
        timestamp: new Date().toISOString(),
      })
    
    default:
      return NextResponse.json({
        method: 'POST',
        message: 'Demo POST received',
        body,
        timestamp: new Date().toISOString(),
      })
  }
}

export async function PUT(request: Request) {
  const url = new URL(request.url)
  const scenario = url.searchParams.get('scenario')
  const body = await request.json().catch(() => ({}))
  
  switch (scenario) {
    case 'conflict':
      return NextResponse.json(
        { 
          error: 'Conflict', 
          message: 'Resource already exists',
          conflictId: 123
        },
        { status: 409 }
      )
    
    default:
      return NextResponse.json({
        method: 'PUT',
        message: 'Demo PUT received',
        body,
        timestamp: new Date().toISOString(),
      })
  }
}

export async function PATCH(request: Request) {
  const url = new URL(request.url)
  const scenario = url.searchParams.get('scenario')
  const body = await request.json().catch(() => ({}))
  
  switch (scenario) {
    case 'partial-update':
      return NextResponse.json({
        method: 'PATCH',
        message: 'Partial update successful',
        body,
        updatedFields: Object.keys(body),
        timestamp: new Date().toISOString(),
      })
    
    case 'validation-error':
      return NextResponse.json(
        { 
          error: 'Validation Error', 
          message: 'Invalid patch data',
          details: ['Field "email" format is invalid', 'Field "age" must be a number']
        },
        { status: 400 }
      )
    
    case 'not-found':
      return NextResponse.json(
        { error: 'Not Found', message: 'Resource to patch not found' },
        { status: 404 }
      )
    
    default:
      return NextResponse.json({
        method: 'PATCH',
        message: 'Demo PATCH received',
        body,
        timestamp: new Date().toISOString(),
      })
  }
}

export async function DELETE(request: Request) {
  const url = new URL(request.url)
  const scenario = url.searchParams.get('scenario')
  
  switch (scenario) {
    case 'forbidden':
      return NextResponse.json(
        { 
          error: 'Forbidden', 
          message: 'You do not have permission to delete this resource'
        },
        { status: 403 }
      )
    
    case 'not-found':
      return NextResponse.json(
        { error: 'Not Found', message: 'Resource to delete not found' },
        { status: 404 }
      )
    
    default:
      return NextResponse.json({
        method: 'DELETE',
        message: 'Demo DELETE handled',
        timestamp: new Date().toISOString(),
      })
  }
}
