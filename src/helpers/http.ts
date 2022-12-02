import axios, { AxiosError } from 'axios'

const http = axios.create({
    baseURL: import.meta.env.VITE_HOST_API,
    headers: {
        'Content-type': 'application/json'
    },
})

const whitelisteUrls = ['api/web/user/login']

http.interceptors.request.use(
    config => {
        if (!whitelisteUrls.includes(config.url || '')) {
            // const userStore = useUserStore()
            // if (config && config.headers && userStore.token) {
            //     config.headers['Authorization'] = `Bearer ${userStore.token}`
            // }
        }

        return config
    }
)


export default http
