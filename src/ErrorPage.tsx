import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as { message?: string } | null

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>{error?.message || "Something went wrong"}</p>
    </div>
  )
}