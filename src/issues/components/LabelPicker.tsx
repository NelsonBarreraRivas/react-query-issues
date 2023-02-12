import { FC } from 'react'
import LoadingIcon from '../../components/LoadingIcon'
import { useLabels } from '../hooks'

interface Props {
	selectedLabels: string[]
	onChangue: (labelName: string) => void
}

export const LabelPicker: FC<Props> = ({ selectedLabels, onChangue }) => {
	const { labelsQuery } = useLabels()

	if (labelsQuery.isLoading) {
		return <LoadingIcon />
	}

	return (
		<>
			{labelsQuery.data?.map(label => (
				<span
					key={label.id}
					className={`badge rounded-pill m-1 label-picker ${
						selectedLabels.includes(label.name)
							? 'label-active'
							: ''
					}`}
					style={{
						border: `1px solid #${label.color}`,
						color: `#${label.color}`,
					}}
					onClick={() => { onChangue(label.name); }}
				>
					{label.name}
				</span>
			))}
		</>
	)
}
