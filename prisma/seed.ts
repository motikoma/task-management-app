import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const task = await prisma.task.create({
        data: {
            id: '1',
            name: 'Alice',
            dueDate: new Date(),
            postPoneCount: 0,
            isDone: false
        }
    })
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })