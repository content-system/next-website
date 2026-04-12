import { Error } from "@components/error"
import { getResource } from "@resources"
import { ctx } from "@service"

export default async function DynamicContent() {
  const resource = getResource("vi")
  const content = await ctx.content.load("home", "vi")

  return !content ? (
    <Error title={resource.error_404_title} message={resource.error_404_message}/>
  ) : (
    <div className="content-container" dangerouslySetInnerHTML={{ __html: content.body || "" }}></div>
  )
}
