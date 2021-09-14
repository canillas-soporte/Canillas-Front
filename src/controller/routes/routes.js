export const routes = [
    {
        path: '/',
        component: 'todo-view'
    },
    {
        path: '/newsletters',
        component: 'newsletters-view',
        action: () => {
            import(/* webpackChunkName: "newsletters-view" */'../views/newsletters/newsletters-view')
        }
    },
    {
        path: '(.*)',
        component: 'not-found-view',
        action: () => {
            import(/* webpackChunkName: "not-found-view" */'../views/not-found/not-found-view')
        }
    }
]