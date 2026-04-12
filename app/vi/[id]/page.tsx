import { Error } from "@components/error"
import { logger, toString } from "@lib/logger"
import { getResource } from "@resources"
import { getContentService } from "@service/content"
import { headers } from "next/headers"

export default async function DynamicContent({ params }: { params: Promise<{ id: string }> }) {
  const resource = getResource("vi")
  const { id } = await params

  const service = getContentService()
  try {
    const content = await service.load(id, "vi")
    if (!content) {
      const headerList = await headers()
      const pathname = headerList.get("x-current-path")
      logger.warn(`Content not found: ${pathname}`)
      return <Error title={resource.error_404_title} message={resource.error_404_message} />
    }
    return <div className="content-container" dangerouslySetInnerHTML={{ __html: content.body || "" }}></div>
  } catch (err) {
    logger.error(toString(err))
    return <Error title={resource.error_500_title} message={resource.error_500_message} />
  }
}
