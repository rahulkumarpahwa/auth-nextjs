import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User Does not Exist" },
        { status: 400 }
      );
    }
    console.log("User Exists");
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Check your Credentials" },
        { status: 400 }
      );
    }

    




  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
