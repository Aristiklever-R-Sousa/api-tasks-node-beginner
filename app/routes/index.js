import { randomUUID } from 'node:crypto'
import { Database } from "../database.js"
import { buildRoutePath } from '../utils/build-route-path.js'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const tasks = database.select('tasks')

            return res.writeHead(200).end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body
            console.log({title, description})
            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            }

            database.insert('tasks', task)

            return res.writeHead(201).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const { title, description } = req.body

            const task = {
                updated_at: new Date().toUTCString(),
            }

            if(title != undefined)  task.title = title
            if(description != undefined)  task.description = description

            try {
                database.update('tasks', id, task)
            } catch (e) {
                return res.writeHead(404).end(JSON.stringify(e))
            }

            return res.writeHead(204).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params

            try {
                database.delete('tasks', id)
            } catch (e) {
                return res.writeHead(404).end(JSON.stringify(e))
            }

            return res.writeHead(204).end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const { id } = req.params
            
            let task
            try {
                task = database.selectById('tasks', id)
            } catch (e) {
                return res.writeHead(404).end(JSON.stringify(e))
            }

            const taskUpdateData = {
                completed_at: task.completed_at ? null : new Date().toISOString(),
                updated_at: new Date().toISOString(),
            }

            try {
                database.update('tasks', id, taskUpdateData)
            } catch (e) {
                return res.writeHead(404).end(JSON.stringify(e))
            }

            return res.writeHead(204).end()
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks/upload'),
        handler: (req, res) => {

        }
    },
]
