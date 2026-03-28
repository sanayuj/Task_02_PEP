const mongoose=require("mongoose")

const docSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Untitled Document"

    },
    content: {
      type: String,
      default: "",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    activeUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true, 
  }
);

module.exports=new mongoose.model("Document", docSchema);

