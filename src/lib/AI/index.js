import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBtonuMX9xSCnzGf94vfbDVO4tFXP-VYws");
const modelAI = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default modelAI;
