export default defineEventHandler(async (event) => {
  const { apiKey, databaseId, content, title } = await readBody(event) as any

  const pages = await getNotionPages(apiKey, databaseId, {
    property: 'Date',
    date: {
      equals: new Date().toISOString().split('T')[0],
    },
  })

  if (pages.length === 0) {
    return {
      success: false,
      message: 'No page found for today',
    }
  }

  const page = pages[0]
  const pageId = page.id.replace(/-/g, '')

  const children = content.split('\n').map((text: string) => ({
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: text,
          },
        },
      ],
    }
  }))

  if (title) {
    children.unshift({
      object: 'block',
      type: 'heading_3',
      heading_3: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: title,
            },
          },
        ],
      },
    })
  }

  children.unshift({
    object: 'block',
    type: 'divider',
    divider: {},
  })

  await appendNotionBlockChildren(apiKey, pageId, children)

  return {
    success: true,
    message: 'Journal entry added',
  }
})