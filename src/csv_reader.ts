import fs from 'fs'

interface CsvReaderResult {
    error: boolean
    message: string
    data?: {
        headers: string[]
        rows: string[][]
    }
}

/**
 * Splits a CSV line into fields, respecting commas that appear
 * inside double-quoted values (e.g. "Marcador, Pilot Azul").
 */
function parseCsvLine(line: string): string[] {
    const fields: string[] = []
    let current = ''
    let insideQuotes = false

    for (let i = 0; i < line.length; i++) {
        const char = line[i]

        if (char === '"') {
            insideQuotes = !insideQuotes
            continue
        }

        if (char === ',' && !insideQuotes) {
            fields.push(current)
            current = ''
            continue
        }

        current += char
    }

    fields.push(current)
    return fields
}

function read(path: string): CsvReaderResult {
    // 1. Validate the path
    if (!path ||!fs.existsSync(path)) {
        return {
            error: true,
            message: `File ${path} not found`
        }
    }

    // 2. Validate the file type
    if (path.split('.').pop() !== 'csv') {
        return {
            error: true,
            message: `File ${path} is not a CSV file`
        }
    }

    // 3. Read the file
    const fileContent = fs.readFileSync(path, 'utf8')
    const lines = fileContent.split(/\r?\n/)

    const headers = parseCsvLine(lines[0]).filter(header => header.trim() !== '')
    const rows = lines
        .slice(1)
        .filter(line => line.trim() !== '')
        .map(line => parseCsvLine(line))

    return {
        error: false,
        message: `File ${path} read successfully`,
        data: { headers, rows }
    }
}

export default { read }
