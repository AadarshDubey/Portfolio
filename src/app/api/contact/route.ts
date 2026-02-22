import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // max submissions
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

export async function POST(req: NextRequest) {
    try {
        // Rate limiting
        const ip = req.headers.get("x-forwarded-for") || "unknown";
        const now = Date.now();
        const limiter = rateLimit.get(ip);

        if (limiter) {
            if (now < limiter.resetTime) {
                if (limiter.count >= RATE_LIMIT) {
                    return NextResponse.json(
                        { error: "Too many requests. Please try again later." },
                        { status: 429 }
                    );
                }
                limiter.count++;
            } else {
                rateLimit.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
            }
        } else {
            rateLimit.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
        }

        const body = await req.json();
        const { name, email, message } = body;

        // Validation
        if (!name || typeof name !== "string" || name.trim().length < 2) {
            return NextResponse.json(
                { error: "Name is required (at least 2 characters)." },
                { status: 400 }
            );
        }

        if (
            !email ||
            typeof email !== "string" ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {
            return NextResponse.json(
                { error: "Please provide a valid email address." },
                { status: 400 }
            );
        }

        if (!message || typeof message !== "string" || message.trim().length < 10) {
            return NextResponse.json(
                { error: "Message is required (at least 10 characters)." },
                { status: 400 }
            );
        }

        // Log the contact submission
        // TODO: Replace with email service (Resend, SendGrid, etc.)
        console.log("📧 New contact submission:", {
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
            timestamp: new Date().toISOString(),
        });

        return NextResponse.json({ success: true, message: "Message received!" });
    } catch {
        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        );
    }
}
