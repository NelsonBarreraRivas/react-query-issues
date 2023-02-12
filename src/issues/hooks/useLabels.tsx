import { useQuery } from '@tanstack/react-query'
import { githubAPI } from '../../api/githubAPI'
import { sleep } from '../../helpers/sleep'
import { Label } from '../interfaces/label'

const getLabels = async (): Promise<Label[]> => {
	// await sleep(3)
	const { data } = await githubAPI.get<Label[]>('/labels', {
		headers: {
			Authorization: null,
		},
	})
	return data
}

export const useLabels = () => {
	const labelsQuery = useQuery([ 'labels' ], getLabels, {
		refetchOnWindowFocus: false,
		staleTime: 100 * 60 * 60,
	})

	return {
		labelsQuery,
	}
}
