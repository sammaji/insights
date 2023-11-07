import { NextResponse } from "next/server";

export function GET(): NextResponse {
    return NextResponse.json({message: "hello world"}, {status: 200})
}