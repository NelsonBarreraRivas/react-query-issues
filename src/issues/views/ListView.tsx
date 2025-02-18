import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import LoadingIcon from '../../components/LoadingIcon'
import { IssueList } from '../components/IssueList'
import { LabelPicker } from '../components/LabelPicker'
import { useLabels, useIssues } from '../hooks'
import { State } from '../interfaces'
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'


export const ListView = () => {



	const { type } = useParams()

	const [selectedLabels, setSelectedLabels] = useState<string[]>([])

	const { issuesQuery, page, nextPage, prevPage } = useIssues({ type, labels: selectedLabels })

	const onLabelChangue = (labelName: string): void => {
		selectedLabels.includes(labelName)
			? setSelectedLabels(
				selectedLabels.filter(label => label !== labelName)
			)
			: setSelectedLabels([...selectedLabels, labelName])
	}

	if (issuesQuery.status === 'error') {
		return (
			<div className="text-center">
				<div className="alert alert-danger" role="alert">
					<h1 className="display-1">404</h1>
					<h4 className="alert-heading">Página no encontrada</h4>
					<p>La página que estás buscando no se ha encontrado.</p>
					<Link to="/" className="btn btn-danger">
						Volver al inicio
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className='row mt-5'>
			<div className='col-8'>
				{issuesQuery.isLoading ? (
					<LoadingIcon />
				) : (
					<IssueList
						issues={issuesQuery.data || []}
					/>
				)}
				<div className='d-flex mt-2 justify-content-between align-items-center'>
					<button
						className='btn btn-outline-primary'
						onClick={prevPage}
						disabled={ issuesQuery.isFetching }
					>
						<FiChevronsLeft />
					</button>
					<span>{page}</span>
					<button
						className='btn btn-outline-primary'
						onClick={nextPage}
						disabled={ issuesQuery.isFetching }
					>
						<FiChevronsRight />
					</button>
				</div>
			</div>

			<div className='col-4'>
				<LabelPicker
					selectedLabels={selectedLabels}
					onChangue={labelName => { onLabelChangue(labelName); }}
				/>
			</div>
		</div>
	)
}
