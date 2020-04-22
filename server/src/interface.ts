export enum NodeType {
    Video = 'Video',
    Text = 'Text'
}

export interface Node {
    title: string
    topic: string
    url: string
    origin: string
    favIconUrl: string
    contentId: string
    annotation: string
    refs: string[]
    date: string
    'dgraph.type': NodeType
    embedUrl?: string
    text?: string
}
