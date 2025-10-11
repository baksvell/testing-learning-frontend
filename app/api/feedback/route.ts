import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, message, email } = body

    // Валидация
    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Сообщение не может быть пустым' },
        { status: 400 }
      )
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: 'Сообщение слишком длинное (максимум 2000 символов)' },
        { status: 400 }
      )
    }

    // В реальном проекте здесь можно:
    // 1. Сохранить в базу данных
    // 2. Отправить на email
    // 3. Отправить в Telegram
    // 4. Отправить в Slack/Discord

    // Создаем объект отзыва
    const feedback = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      type,
      message,
      email: email || '',
      timestamp: new Date().toISOString()
    }

    // Логируем в консоль
    console.log('📝 Новый отзыв:', {
      id: feedback.id,
      type,
      message: message.substring(0, 100) + '...',
      email: email || 'не указан',
      timestamp: feedback.timestamp,
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
    })

    // В будущем можно добавить отправку в Telegram:
    /*
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      const telegramMessage = `
🐛 Новый отзыв от пользователя:

Тип: ${type}
Email: ${email || 'не указан'}
Время: ${new Date().toLocaleString('ru-RU')}

Сообщение:
${message}
      `
      
      await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: telegramMessage
        })
      })
    }
    */

    return NextResponse.json(
      { 
        success: true, 
        message: 'Отзыв успешно отправлен' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Ошибка при обработке отзыва:', error)
    
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}
