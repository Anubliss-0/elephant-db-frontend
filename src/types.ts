export interface Photo {
  id: string | null
  url: string
  status: "keep" | "deleted" | "new"
  file?: File
  position: number
}