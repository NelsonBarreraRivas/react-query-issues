import axios from 'axios'

export const githubAPI = axios.create({
	baseURL: import.meta.env.VITE_GIT_HUB_API_URL,
	headers: {
		Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
	},
})
