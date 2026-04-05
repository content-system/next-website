import { Error } from "@components/error"
import ctx from "@core/context"
import { getResource } from "@resources"

export default async function DynamicContent({ params }: { params: Promise<{ id: string }> }) {
  const resource = getResource("vi")
  const { id } = await params
  const content = await ctx.content.load(id, "vi")

  return !content ? (
    <Error title={resource.error_404_title} description={resource.error_404_message}/>
  ) : (
    <div className="content-container" dangerouslySetInnerHTML={{ __html: content.body || "" }}></div>
  )
}
