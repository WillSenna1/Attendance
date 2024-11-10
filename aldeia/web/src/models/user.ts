import { AriaRole } from "react";
import { Teacher } from "./teacher";
import { Manager } from "./manager";
import { Onboarding } from "./onboarding";
import { Employment } from "./employment";

export enum Role {
  MANAGER= 'MANAGER',
  TEACHER= 'TEACHER',
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  imageUrl: string;
  street?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  role: AriaRole;
  teachers: Teacher[];
  managers: Manager[];
  onboardings: Onboarding[];
  employments: Employment[];
  createdAt: Date;
  updatedAt: Date;
}