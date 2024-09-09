export default interface Contact {
    id: number,
    name: string,
    email: string,
    content?: string,
    created_at: string,
    is_reviewed: boolean,
}