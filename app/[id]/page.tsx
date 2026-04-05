import { Error } from "@components/error"
import { getResource } from "@resources"
import { ctx } from "@service"

export default async function DynamicContent({ params }: { params: Promise<{ id: string }> }) {
  const resource = getResource("en")
  const { id } = await params
  const content = await ctx.content.load(id, "en")

  return !content ? (
    <Error title={resource.error_404_title} description={resource.error_404_message}/>
  ) : (
    <div className="content-container" dangerouslySetInnerHTML={{ __html: content.body || "" }}></div>
  )
}
