import mongoose, { Schema } from "mongoose";
import { v4 } from "uuid";

const reportSchema = new Schema({
  _id: {
    type: String,
    default: v4,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  sourceIdentityId: {
    type: String,
    required: true,
  },
  reference: {
    referenceId: {
      type: String,
      required: true,
    },
    referenceType: {
      type: String,
      required: true,
    }
  },
  state: {
    type: String,
    enum: ["OPEN", "BLOCKED", "CLOSED"],
    required: true,
  },
  payload: {
    source: {
      type: String,
      required: true,
    },
    reportType: {
      type: String,
      enum: ["SPAM", "INFRINGES_PROPERTY", "VIOLATES_POLICIES"],
      required: true,
    },
    message: {
      type: String,
      required: false,
    },
    reportId: {
      type: String,
      required: true,
    },
    referenceResourceId: {
      type: String,
      required: true,
    },
    referenceResourceType: {
      type: String,
      required: true,
    },
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export const Report = mongoose.model("Report", reportSchema);

