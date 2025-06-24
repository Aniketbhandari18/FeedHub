import { ApiError } from "@/lib/apiError";
import { getDbUserId } from "@/lib/getDbUserId";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const dbUserId = await getDbUserId();
    const { title, description } = await req.json();

    // validations
    if (typeof title !== "string"){
      throw new ApiError("Title must be a string", 400);
    }
  
    if (!title.trim()){
      throw new ApiError("Title cannot be empty", 400);
    }
    if (title.trim().length > 30){
      throw new ApiError("Title must be within 30 characters", 400);
    }
    if (title.trim().length < 3){
      throw new ApiError("Title must be atleast 3 charachters", 400);
    }
    if (typeof description === "string" && description.length > 200){
      throw new ApiError("Description must be within 200 characters", 400);
    }
  
    // create new hub
    const newHub = await prisma.hub.create({
      data: {
        title,
        description: typeof description === "string" ? description : "",
        createdById: dbUserId,
      }
    });

    // add current user as admin in hubUser
    const newHubUser = await prisma.hubUser.create({
      data: {
        userId: dbUserId,
        hubId: newHub.id,
        role: "ADMIN",
      }
    });

    return NextResponse.json(
      { message: "New Hub created successfully", newHub, newHubUser },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error creating new hub:", error);
    
    if (error instanceof ApiError){
      return NextResponse.json({ message: error.message }, { status: error.status });
    }

    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}