import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
   {
      serialNo: {
         type: String,
         required: true,
         unique: true,
      },
   }
)
const Device = mongoose.model("Device", deviceSchema);
export default Device;