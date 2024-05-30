export class Database {
    database = {}

    select(table) {
        const data = this.database[table] ?? []

        return data
    }

    selectById(table, id) {
        if (Array.isArray(this.database[table]) == false) {
            throw new Error('Table Not Found.')
        }

        const data = this.database[table].find((row) => row.id === id)

        return data
    }

    insert(table, data) {
        if (Array.isArray(this.database[table])) {
            this.database[table].push(data)
        } else {
            this.database[table] = [data]
        }

        return data
    }

    update(table, id, data) {
        if (Array.isArray(this.database[table]) == false) {
            throw new Error('Table Not Found.')
        }
        const indexRow = this.database[table].findIndex((row) => row.id === id)
        
        if (indexRow < 0) {
            throw new Error('Element Not Found.')
        }

        this.database[table][indexRow] = {
            ...this.database[table][indexRow],
            ...data,
        }

        return true
    }

    delete(table, id) {
        const indexRow = this.database[table].findIndex((row) => row.id === id)
        
        if (indexRow < 0) {
            throw new Error('Element Not Found.')
        }

        const removedRow = this.database[table].splice(indexRow, 1)

        return removedRow
    }

}
