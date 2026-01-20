import { NextRequest, NextResponse } from 'next/server';

// TinaCMS local development API handler
// This proxies requests to the TinaCMS local GraphQL server

const TINA_GQL_URL = 'http://localhost:4001/graphql';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();

    const response = await fetch(TINA_GQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('TinaCMS API Error:', error);
    return NextResponse.json(
      { error: 'TinaCMS server not running. Start with: npm run dev:tina' },
      { status: 503 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'TinaCMS GraphQL API',
    hint: 'Run "npm run dev:tina" to start the CMS server'
  });
}
