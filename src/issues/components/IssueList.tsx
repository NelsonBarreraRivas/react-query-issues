import { FC } from 'react'
import { Issue, State } from '../interfaces'
import { IssueItem } from './IssueItem'

import { Link, useParams } from 'react-router-dom'

interface Props {
	issues: Issue[]
}

export const IssueList: FC<Props> = ({ issues }) => {

	const { type } = useParams()


	return (
		<div className='card border-white'>
			<div className='card-header bg-dark'>
				<ul className='nav nav-pills card-header-pills'>
					{
						Object.values(State).map((state, index) => {
							return (
								<li className='nav-item' key={index}>
									<Link to={`/issues/list/${state}`} className={`nav-link ${type === state ? 'active' : ''}`}>
										{state}
									</Link>
								</li>
							)
						})
					}
				</ul>
			</div>
			<div className='card-body text-dark'>
				{issues && issues.length > 0 ? (
					issues.map(issue => (
						<IssueItem key={issue.id} issue={issue} />
					))
				) : (
					<div className='text-center'>No hay resultados</div>
				)}
			</div>
		</div>
	)
}
