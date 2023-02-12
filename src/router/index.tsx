import { createBrowserRouter, Navigate } from 'react-router-dom'
import { GitApp } from '../GitApp'

import { IssueView, ListViewInfinity} from '../issues/views'

export const router = createBrowserRouter([
	{
		path: '/issues',
		element: <GitApp />,
		children: [
			{ path: 'list/:type', element: <ListViewInfinity /> },
			{ path: 'issue/:id', element: <IssueView /> },
			{ path: '*', element: <Navigate to='list/all' /> },
		],
	},
	{
		path: '/',
		element: <Navigate to='issues/list' />,
	},
	{
		path: '*',
		element: <h1>Not found</h1>,
	},
])
