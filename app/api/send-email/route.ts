import nodemailer from 'nodemailer'
import type { CreatorData } from '@/lib/encode'

interface EmailBody {
  creator: CreatorData
  restaurant: string
  date: string
}

export async function POST(request: Request) {
  const body: EmailBody = await request.json()
  const { creator, restaurant, date } = body

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

  const isKawaii = creator.theme === 'kawaii'

  const subject = isKawaii
    ? `💕 C'est un OUI ! Quelqu'un a accepté ton invitation !`
    : `✉️ Réponse à votre invitation`

  const html = isKawaii
    ? `
      <div style="font-family: sans-serif; max-width: 500px; margin: auto; background: #FFF0F5; border-radius: 20px; padding: 32px; border: 2px solid #FFB3D1;">
        <div style="text-align: center; font-size: 48px;">🎊</div>
        <h1 style="color: #FF6B9D; text-align: center; font-size: 28px; margin: 16px 0;">C'est un OUI !! 💕</h1>
        <p style="color: #2D0A1E; font-size: 16px;">Hey <strong>${creator.name}</strong> ! Quelqu'un a accepté ton invitation ! Voilà les détails :</p>
        <div style="background: white; border-radius: 16px; padding: 20px; margin: 20px 0; border: 2px solid #FFB3D1;">
          <p style="margin: 8px 0; color: #2D0A1E;">🍽️ <strong>Restaurant :</strong> ${restaurant}</p>
          <p style="margin: 8px 0; color: #2D0A1E;">📅 <strong>Date :</strong> ${date}</p>
        </div>
        <p style="color: #7A3A5A; text-align: center; font-size: 14px;">Bonne soirée ! ✨🌸💕</p>
      </div>
    `
    : `
      <div style="font-family: Georgia, serif; max-width: 500px; margin: auto; background: #FDF5F0; border-radius: 20px; padding: 40px; border: 2px solid #C9856E;">
        <div style="text-align: center; font-size: 48px;">🌹</div>
        <h1 style="color: #8B1A3A; text-align: center; font-size: 26px; margin: 16px 0;">Une réponse à votre invitation</h1>
        <p style="color: #1A0008; font-size: 16px; line-height: 1.6;">Cher(e) <strong>${creator.name}</strong>,</p>
        <p style="color: #1A0008; font-size: 16px; line-height: 1.6;">Vous avez reçu une réponse à votre invitation. Voici les détails :</p>
        <div style="background: #FFF8F5; border-radius: 16px; padding: 24px; margin: 20px 0; border: 1px solid #C9856E;">
          <p style="margin: 10px 0; color: #1A0008; font-size: 15px;">🍽️ <strong>Type de restaurant :</strong> ${restaurant}</p>
          <p style="margin: 10px 0; color: #1A0008; font-size: 15px;">📅 <strong>Date proposée :</strong> ${date}</p>
        </div>
        <p style="color: #5C2A35; text-align: center; font-size: 14px; font-style: italic;">Passez une merveilleuse soirée. 🌹</p>
      </div>
    `

  try {
    await transporter.sendMail({
      from: `"Date Request 💌" <${process.env.GMAIL_USER}>`,
      to: creator.email,
      subject,
      html,
    })
    return Response.json({ success: true })
  } catch (err) {
    console.error('Email error:', err)
    return Response.json({ success: false }, { status: 500 })
  }
}
