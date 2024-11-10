export interface Photo {
  id: string | null
  url: string
  status: "keep" | "deleted" | "new"
  file?: File
  position: number
}

export type User = {
  id: number
  name: string
}
