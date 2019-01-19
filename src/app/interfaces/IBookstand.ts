interface Bookstand {
    id?: number,
    numberBookstand?: number,
    storehouses_id?: {
        id?: number,
        location?: string
    },
    storehouses_location?: string,
    storehouses_id_id?: number,
    storehouses?: Storehouses
}
