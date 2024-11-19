// Import required modules
import dotenv from "dotenv";
dotenv.config();
import Joi from "joi";

// Define TypeScript type for environment variables
interface EnvVars {
  DATABASE_URL: string;
  JWT_SECRET: string;
  PORT: number;
}

// Define a Joi schema for environment variables
const envVarSchema = Joi.object({
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  PORT: Joi.number().positive().required(),
}).unknown();

// Validate environment variables
const { value, error } = envVarSchema.validate(process.env);

if (error) {
  console.error("Environment variable validation error:", error.message);
  process.exit(1); 
}

// Cast validate value to EnvVars 
const envVars = value as EnvVars;

// Export the validated environment variables with type safety
const validatedEnvVars: EnvVars = {
  DATABASE_URL: envVars.DATABASE_URL,
  JWT_SECRET: envVars.JWT_SECRET,
  PORT: envVars.PORT,
};

export default validatedEnvVars;
