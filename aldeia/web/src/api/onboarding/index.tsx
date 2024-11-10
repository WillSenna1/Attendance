import { api } from "../client-api";
import { CompleteOnboardingDto } from "./dtos/complete-onboarding.dto";



const CompleteOnboarding = async (data: CompleteOnboardingDto) => {
    const response = await api.post(`onboarding/${data.id}`, { json: data }).json();

    return response;

}

export const OnboardingService = () => { return { CompleteOnboarding } };
