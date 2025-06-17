// This route handles incoming webhooks events from clerk.
// It listens for user related events - user.created, user.updated, user.deleted.

import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { WebhookEvent } from "@clerk/nextjs/webhooks";
import { createUser, deleteUser, updateUser } from "@/actions/userActions";
import { clerkUserPayload } from "@/types/user";

export async function POST(req: NextRequest) {
  const secret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!secret) {
    throw new Error("Please add webhook secret in env");
  }

  const headerPayload = await headers();

  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixSignature || !svixTimestamp) {
    return NextResponse.json(
      { message: "Error occured - No svix headers" },
      { status: 400 }
    );
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(secret);

  let evt: WebhookEvent;
  try {
    evt = (await wh.verify(body, {
      "svix-id": svixId,
      "svix-signature": svixSignature,
      "svix-timestamp": svixTimestamp,
    })) as WebhookEvent;

    console.log(evt);
  } catch (error) {
    console.log(error);
    console.error("Error verifying webhook");

    return NextResponse.json(
      { message: "Error verifying webhook" },
      { status: 400 }
    );
  }

  const { id } = evt.data;
  const eventType = evt.type;

  if (!id) {
    return NextResponse.json(
      { message: "Error occured - No id in event" },
      { status: 400 }
    );
  }

  if (eventType === "user.created" || eventType === "user.updated") {
    const user: clerkUserPayload = {
      clerkId: id,
      email: evt.data.email_addresses[0].email_address,
      first_name: evt.data.first_name,
      last_name: evt.data.last_name,
      avatar: evt.data.image_url,
    };

    if (eventType === "user.created") {
      try {
        const newUser = await createUser(user);

        return NextResponse.json(
          { message: "User created successfully", newUser },
          { status: 201 }
        );
      } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json(
          { message: "Error creating user" },
          { status: 500 }
        );
      }
    } else if (eventType === "user.updated") {
      try {
        const updatedUser = await updateUser(id, user);
        return NextResponse.json(
          { message: "User updated successfully", updatedUser },
          { status: 200 }
        );
      } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
          { message: "Error updating user" },
          { status: 500 }
        );
      }
    }
  }

  if (eventType === "user.deleted") {
    try {
      const deletedUser = await deleteUser(id);

      return NextResponse.json(
        { message: "User deleted successfully", deletedUser },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error deleting user:", error);
      return NextResponse.json(
        { message: "Error deleting user" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    { message: "Webhook processed successfully" },
    { status: 200 }
  );
}
