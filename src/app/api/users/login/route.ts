import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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

    //jwt Token

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email, //extra can be leaved if you want.
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    }); // "!" added at the end of Token Secret so that typescript will not make error that type is not defined. by "!" we make assure that token secret will come as a string.
    //also we add expiresIn parameter to expire token after 1 day.

    const response = NextResponse.json(
      { message: "User Logged In Successfully" },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    }); //cookie name, cookie value, parameters

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
