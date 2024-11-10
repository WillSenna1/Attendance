import { User } from "../../models/user"
import { api } from "../client-api"
import { UpdatedMeDto } from "./dtos/updated-me.dto";



const GetMe = async () => {
    const response = await api.get('users/me').json<User>()
    return response;
}


const UpdateMe = async (data: UpdatedMeDto) => {
    const response = await api.patch('users/me', { json: data }).json<User>()
    return response;

}
export const userService = () => { return { GetMe, UpdateMe } }