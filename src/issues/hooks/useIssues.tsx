import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { githubAPI } from '../../api/githubAPI'
import { Issue, State } from '../interfaces'


interface Props{
	type?: State | string
	labels : string[]
	page? : number
}

export const getIssues = async ( { labels, type , page = 1 } : Props): Promise<Issue[]> => {
	const params = new URLSearchParams()
	if ( type ) params.append('state', type)
	if ( labels.length >  0 ) {
		const labelsString = labels.join(',')
		params.append('labels', labelsString)
	}
	params.append('page', page.toString())
	params.append('per_page', '5')

	const { data } = await githubAPI<Issue[]>('/issues', { params })
	return data
}

export const useIssues = ({ type, labels } :  Props) => {

	const [page, setPage] = useState<number>(1)

	useEffect(() => {
		setPage( 1 )
	}, [type, labels])
	

	const issuesQuery = useQuery(
		['issues', { type, labels, page }],
		() => getIssues({ labels, type, page }),
		{
			retry: 0
		}
	)

	const nextPage = () : void => {
		if( issuesQuery.data?.length === 0 ) return
		setPage( page + 1)
	}
	const prevPage = () : void => {
		if( page > 1 ) setPage( page - 1)
	}

	return {
		issuesQuery,
		page :  issuesQuery.isFetching ? 'Loading......' : page,
		nextPage,
		prevPage
	}
}
