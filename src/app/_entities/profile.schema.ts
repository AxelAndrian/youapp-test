import { z } from "zod";

export const profileSchema = z.object({
  email: z.string().optional(),
  username: z.string().optional(),
  name: z.string().min(1, "Display Name is Required"),
  birthday: z.string().min(1, "Birthday is Required"),
  horoscope: z.string().min(1, "Horoscope is Required"),
  zodiac: z.string().min(1, "Zodiac is Required"),
  height: z.number().min(1, "Height is Required"),
  weight: z.number().min(1, "Weight is Required"),
  interest: z.array(z.string()).optional(),
});

export type TProfile = z.infer<typeof profileSchema>;
