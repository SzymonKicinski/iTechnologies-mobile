
interface Items {
    id?: number,
    serialNumberItem?: number,
    itemName?: string,
    numberItem?: number,
    statusItem?: number,
    newNumberItem?: number,
    brands?: {
        id?: number,
        name?: string
    },
    bookstands?: {
        id?: number,
        numberBookstand?: number,
        storehouses?: {
            id?: number,
            location?: string
        },
    },
    category?: {
        id?: number,
        namecategory?: string,
        name?: string
    }
    bookstand?: {
        name?: string,
        value?: number,
        label?: string
    }
}

