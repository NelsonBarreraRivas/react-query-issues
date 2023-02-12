import { useInfiniteQuery } from "@tanstack/react-query"
import { githubAPI } from "../../api/githubAPI"
import { sleep } from "../../helpers"
import { Issue, State } from "../interfaces"

interface Props{
	type?: State | string
	labels : string[]
	page? : number
}
interface QueryProps {
    pageParam?: number
    queryKey: (string | Props )[]
}

export const getIssues = async ( { pageParam = 1, queryKey } : QueryProps): Promise<Issue[]> => {

    const [,, arg] = queryKey
    const { type, labels } = arg as Props

    await sleep(2)

	const params = new URLSearchParams()
	if ( type ) params.append('state', type)
	if ( labels.length >  0 ) {
		const labelsString = labels.join(',')
		params.append('labels', labelsString)
	}
	params.append('page', pageParam.toString())
	params.append('per_page', '5')

	const { data } = await githubAPI<Issue[]>('/issues', { params })
	return data
}


export const useIssueInfinity = ({ type, labels } :  Props) => {

    const issuesQuery = useInfiniteQuery(
        ['issues', 'infinity', { type, labels, page : 1 }],
        data => getIssues( data ),
		{
			retry: 0
		}
    )

    return {
        issuesQuery
    }
}
