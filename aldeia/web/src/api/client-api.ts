import ky from "ky";

export const api = ky.create({
    prefixUrl: import.meta.env.VITE_API_URL,
    hooks: {
        beforeRequest: [
            async (request) => {
                const token = JSON.parse(localStorage.getItem("tokens") || "{}");
                if (token) {
                    request.headers.set("Authorization", `Bearer ${token.access_token}`);
                }
                return request;
            }
        ],

        afterResponse: [
            async (request, _, response) => {
                if (response.status === 401) {
                    const token = JSON.parse(localStorage.getItem("tokens") || "{}");
                    console.log(token);

                    if (!token && !token.refresh_token) {
                        localStorage.clear();
                        window.location.href = "/auth/login";
                    }

                    const refreshResponse = await ky.post(`${import.meta.env.VITE_API_URL}/auth/refresh-token`, { json: { token: token.refresh_token } }).json();
                    localStorage.setItem("tokens", JSON.stringify(refreshResponse));

                    return ky(request);
                }

                return response;
            }
        ]
    },
});
