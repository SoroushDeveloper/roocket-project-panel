export interface ProfileFormValuesInterface {
    name: string,
    password?: string,
    confirmation?: string,
}

export interface ArticleFormValuesInterface {
    slug: string,
    title: string,
    category_id: number,
    is_published: boolean,
    keywords?: string,
    description?: string,
    summary?: string,
    content?: string,
    image_url?: string,
}