import { NextResponse } from 'next/server';

export async function GET() {
  // Имитируем задержку для демонстрации в Network
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return NextResponse.json({
    message: "DevTools Demo API",
    timestamp: new Date().toISOString(),
    data: {
      lessons: [
        { id: 1, name: "Elements", completed: true },
        { id: 2, name: "Console", completed: true },
        { id: 3, name: "Network", completed: false },
        { id: 4, name: "Sources", completed: false },
        { id: 5, name: "Performance", completed: false },
        { id: 6, name: "Device", completed: false }
      ],
      stats: {
        totalLessons: 6,
        completedLessons: 2,
        progress: 33
      }
    }
  });
}

export async function POST() {
  // Имитируем задержку для демонстрации в Network
  await new Promise(resolve => setTimeout(resolve, 150));
  
  return NextResponse.json({
    message: "DevTools Demo POST API",
    timestamp: new Date().toISOString(),
    success: true,
    data: {
      action: "lesson_completed",
      lessonId: 3,
      completedAt: new Date().toISOString()
    }
  });
}
