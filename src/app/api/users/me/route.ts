import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { getDataFromToken } from "@/utils/getDataFromToken";

connect();

export const POST = async (request: NextRequest) => {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password"); //select method is to data you want to show
    if (!user) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 400 }); //home work
    }
    return NextResponse.json({ message: "User Found", data: user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
