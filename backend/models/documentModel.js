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
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: ["viewer", "editor"],
          default: "viewer",
        },
      },
    ],
  },
  {
    timestamps: true, 
  }
);

module.exports=new mongoose.model("Document", docSchema);

